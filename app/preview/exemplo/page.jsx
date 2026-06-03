'use client'

import ValentinePage from '../../../components/ValentinePage'

const MOCK_DATA = {
  partnerName: 'Luiza',
  phrases: [
    'Eu fiz isso pensando em você.',
    'Cada detalhe dessa página foi feito com muito carinho.',
    'A gente ainda tem tanta coisa linda para viver.',
    'Obrigado por ser essa pessoa maravilhosa na minha vida.',
    'Você é o meu amor.'
  ],
  photos: [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd785311652?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501901609772-df0848060b33?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606907568152-3fb6283fcbc5?q=80&w=600&auto=format&fit=crop',
  ]
}

export default function ExemploPreview() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ValentinePage 
        partnerName={MOCK_DATA.partnerName}
        phrases={MOCK_DATA.phrases}
        photos={MOCK_DATA.photos}
      />
    </div>
  )
}
