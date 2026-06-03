import { useMemo } from 'react'

export default function BackgroundScene() {
  const stars = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.2 + 0.8,
      duration: 1.8 + Math.random() * 3.5,
      delay: Math.random() * 5,
    })), [])

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: 5 + Math.random() * 9,
      delay: Math.random() * 7,
    })), [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000',
      }}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: 'white',
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      {particles.map((p) => (
        <div
          key={`p${p.id}`}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: '#ff4db8',
            opacity: 0.35,
            filter: 'blur(1.5px)',
            animation: `floatSoft ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
