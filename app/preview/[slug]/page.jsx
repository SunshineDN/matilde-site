import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import ValentinePage from '../../../components/ValentinePage'
import CheckoutButton from '../../../components/CheckoutButton'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function PreviewPage({ params }) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const page = await prisma.page.findUnique({
    where: { slug }
  })

  if (!page) {
    notFound()
  }

  const now = new Date()
  const createdAt = new Date(page.created_at)
  const diffInMinutes = (now - createdAt) / (1000 * 60)
  const isExpired = page.payment_status === 'pending' && diffInMinutes > 30

  if (isExpired) {
    return (
      <div style={{
        width: '100%', height: '100vh', 
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center',
        background: '#05000a', color: 'white', padding: '2rem', textAlign: 'center'
      }}>
        <h1 style={{ color: '#ff4db8', fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Tempo de Preview Esgotado</h1>
        <p style={{ maxWidth: '500px', marginBottom: '2rem', color: '#cbd5e1', lineHeight: 1.6, fontFamily: 'var(--font-sans)' }}>
          Sua página de preview gratuita expirou (limite de 30 minutos). Para liberar o acesso definitivo ao link oficial e enviá-lo ao seu amor, conclua o pagamento.
        </p>
        <CheckoutButton slug={slug} />
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      {/* Banner de Preview / Checkout */}
      {page.payment_status === 'pending' && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          background: 'rgba(15, 23, 42, 0.95)',
          color: 'white',
          zIndex: 50,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ff4db8',
          backdropFilter: 'blur(10px)',
          fontFamily: 'var(--font-sans)'
        }}>
          <div>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#ff4db8' }}>Modo Preview</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>Esta página está visível apenas para você. Conclua o pagamento para liberar o link oficial.</p>
          </div>
          <CheckoutButton slug={slug} />
        </div>
      )}

      {page.payment_status === 'paid' && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          background: 'rgba(16, 185, 129, 0.95)',
          color: 'white',
          zIndex: 50,
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Sua página está ativa! Compartilhe o link: /p/{slug}</p>
        </div>
      )}

      <ValentinePage 
        partnerName={page.partner_name}
        phrases={page.phrases || []}
        photos={page.images || []}
        musicUrl={page.music_url || null}
      />
    </div>
  )
}
