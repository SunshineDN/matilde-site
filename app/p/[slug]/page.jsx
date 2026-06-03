import { notFound, redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import ValentinePage from '../../../components/ValentinePage'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function SlugPage({ params }) {
  // Await the params object in Next.js 15
  const resolvedParams = await params
  const { slug } = resolvedParams

  const page = await prisma.page.findUnique({
    where: { slug }
  })

  if (!page) {
    notFound()
  }

  if (page.payment_status === 'pending') {
    redirect(`/preview/${slug}`)
  }

  // Verifica se o pagamento foi efetuado. Se for 'pending', pode redirecionar pro checkout,
  // mas por enquanto vamos mostrar a página mesmo pendente ou redirecionar.
  // Vamos permitir ver apenas para preview, mas a regra do SaaS é bloquear se 'pending' a menos que seja o próprio usuário.
  // Como não temos login ainda, vou mostrar a página normalmente e na Fase 4 adicionaremos a trava.

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ValentinePage 
        partnerName={page.partner_name}
        phrases={page.phrases || []}
        photos={page.images || []}
        musicUrl={page.music_url || null}
      />
    </div>
  )
}
