'use client'

import { useState } from 'react'

export default function CheckoutButton({ slug }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })
      
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Erro ao iniciar checkout')
      }
    } catch (err) {
      alert('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      style={{
        padding: '0.6rem 1.2rem',
        backgroundColor: '#ff4db8',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Redirecionando...' : 'Liberar Página (R$ 19,90)'}
    </button>
  )
}
