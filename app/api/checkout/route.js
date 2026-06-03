import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function POST(request) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Slug é obrigatório' }, { status: 400 })
    }

    const page = await prisma.page.findUnique({
      where: { slug }
    })

    if (!page) {
      return NextResponse.json({ error: 'Página não encontrada' }, { status: 404 })
    }

    if (page.payment_status === 'paid') {
      return NextResponse.json({ error: 'Página já está paga' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1.nip.io:3000'

    const preference = new Preference(mpClient)

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'VALENTINE_PAGE',
            title: `LOVII STORY - Carta de amor digital (${slug})`,
            description: 'Liberação vitalícia do link da sua página especial.',
            quantity: 1,
            unit_price: 19.90,
            currency_id: 'BRL',
          }
        ],
        payer: {
          email: page.user_email,
        },
        back_urls: {
          success: `${baseUrl}/p/${slug}?success=true`,
          failure: `${baseUrl}/preview/${slug}`,
          pending: `${baseUrl}/preview/${slug}`,
        },
        auto_return: 'approved',
        external_reference: slug,
      }
    })

    await prisma.page.update({
      where: { slug },
      data: { payment_id: result.id },
    })

    // Retorna a URL de redirecionamento do Mercado Pago (init_point)
    return NextResponse.json({ url: result.init_point })
  } catch (error) {
    console.error('Mercado Pago Checkout Error:', error)
    return NextResponse.json({ error: 'Erro ao criar sessão de checkout no Mercado Pago' }, { status: 500 })
  }
}
