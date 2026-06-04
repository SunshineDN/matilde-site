import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug não informado' }, { status: 400 })
  }

  try {
    const existing = await prisma.page.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json({ available: false })
    }

    return NextResponse.json({ available: true })
  } catch (error) {
    console.error('Erro ao verificar slug:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
