import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function POST(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || searchParams.get('topic')
    const dataId = searchParams.get('data.id') || searchParams.get('id')

    // O Mercado Pago também pode enviar os dados no body
    const body = await request.json().catch(() => ({}))
    const eventType = body.type || type
    const eventDataId = body.data?.id || dataId

    if (eventType === 'payment' && eventDataId) {
      const paymentClient = new Payment(mpClient)
      const paymentInfo = await paymentClient.get({ id: eventDataId })

      if (paymentInfo.status === 'approved') {
        const slug = paymentInfo.external_reference

        if (slug) {
          await prisma.page.update({
            where: { slug },
            data: { payment_status: 'paid' },
          })
          console.log(`Página ${slug} aprovada via Mercado Pago.`)
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Mercado Pago Webhook Error:', error)
    // Retornamos 200 mesmo no erro para que o Mercado Pago não fique retentando infinitamente se for um evento não suportado
    return NextResponse.json({ received: true })
  }
}
