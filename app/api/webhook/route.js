import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const slug = session.client_reference_id

    if (slug) {
      await prisma.page.update({
        where: { slug },
        data: { payment_status: 'paid' },
      })
      console.log(`Pagamento confirmado para o slug: ${slug}`)
    }
  }

  return NextResponse.json({ received: true })
}
