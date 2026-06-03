import { useMemo } from 'react'

export default function FloatingWords({ active, partnerName = 'Amor' }) {
  const WORDS = [
    `minha ${partnerName}`,
    'meu amor',
    'minha saudade boa',
    'meu carinho',
    'meu lugar bonito',
    'eu escolho você',
    'você é especial',
    'um dia mais perto',
    'meu universo',
    'meu pensamento bonito',
  ]

  const items = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      word: WORDS[i % WORDS.length],
      left: 3 + Math.random() * 90,
      bottom: 5 + Math.random() * 80,
      fontSize: 11 + Math.random() * 8,
      duration: 18 + Math.random() * 16,
      delay: Math.random() * 12,
      opacity: 0.08 + Math.random() * 0.1,
    })), [])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {items.map((item) => (
        <span
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.left}%`,
            bottom: `${item.bottom}%`,
            fontFamily: 'var(--font-romantic)',
            fontSize: `${item.fontSize}px`,
            color: '#ff8fd3',
            opacity: item.opacity,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            animation: `floatSoft ${item.duration}s ${item.delay}s ease-in-out infinite`,
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  )
}
