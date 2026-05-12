import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MEMORY_CARDS = [
  {
    title: 'O começo',
    text: 'Tudo começou de um jeito inesperado... e, de repente, você virou parte dos meus dias.',
  },
  {
    title: 'Nossa data',
    text: 'O dia 23 de março de 2024 ficou guardado em mim. Não como uma data qualquer, mas como o começo de algo que eu quero cuidar.',
  },
  {
    title: 'Mesmo longe',
    text: 'A gente ainda não viveu todos os abraços que merece. Mas mesmo de longe, você conseguiu se tornar perto.',
  },
  {
    title: 'A gente continuou',
    text: 'Nem tudo foi fácil. Mas se tem uma coisa bonita na nossa história, é que a gente continuou tentando.',
  },
  {
    title: 'Você',
    text: 'Você tem um jeito seu. Um jeito que acalma, prende, encanta e faz falta quando não está por perto.',
  },
  {
    title: 'O que ainda vem',
    text: 'Eu não sei todos os detalhes do futuro. Mas sei que quero viver muitos momentos com você nele.',
  },
]

const PHOTOS = [
  { url: 'https://i.imgur.com/MCVtMq4.jpeg', caption: 'Um pedacinho nosso.' },
  { url: 'https://i.imgur.com/QFblkof.jpeg', caption: 'Mesmo longe, tão presente.' },
  { url: 'https://i.imgur.com/4ejgQb2.jpeg', caption: 'A saudade também sabe amar.' },
  { url: 'https://i.imgur.com/wuYFCBH.jpeg', caption: 'Um dia, essa distância vira abraço.' },
  { url: 'https://i.imgur.com/jEYAUNo.jpeg', caption: 'E quando esse dia chegar, eu vou lembrar que valeu a pena esperar.' },
  { url: 'https://i.imgur.com/ZgtZlAX.jpeg', caption: 'Cada foto, um momento real.' },
]

// ─────── Memory Card ───────
function MemoryCard({ card, onNext, isLast }) {
  const [visible, setVisible] = useState(false)
  const onNextRef = useRef(onNext)
  onNextRef.current = onNext

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const reading = card.text.length * 28 + 2200
    const t = setTimeout(() => onNextRef.current(), reading)
    return () => clearTimeout(t)
  }, [visible, card.text.length])

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: 'clamp(1.4rem, 5vw, 2rem)',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        boxShadow: '0 0 30px rgba(255,77,184,0.25), 0 4px 24px rgba(0,0,0,0.15)',
        cursor: 'pointer',
      }}
      onClick={() => onNextRef.current()}
    >
      {/* Heart corner */}
      <span style={{
        position: 'absolute', top: '1rem', right: '1rem',
        fontSize: '18px', animation: 'heartPulse 2s ease-in-out infinite',
        filter: 'drop-shadow(0 0 5px rgba(255,77,184,0.5))',
      }}>♥</span>

      <p style={{
        fontFamily: '"Dancing Script", cursive',
        fontSize: 'clamp(13px, 3vw, 16px)',
        color: '#ff8fd3',
        margin: '0 0 0.4rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
      }}>
        {card.title}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: 'clamp(17px, 4.5vw, 22px)',
          color: '#333',
          margin: 0,
          lineHeight: 1.65,
          paddingRight: '1.5rem',
        }}
      >
        {card.text}
      </motion.p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '1.2rem', justifyContent: 'center' }}>
        {MEMORY_CARDS.map((_, i) => {
          const idx = MEMORY_CARDS.indexOf(card)
          return (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i <= idx ? '#ff4db8' : 'rgba(255,77,184,0.2)',
              transition: 'all 0.3s',
              boxShadow: i === idx ? '0 0 6px rgba(255,77,184,0.7)' : 'none',
            }} />
          )
        })}
      </div>
    </div>
  )
}

// ─────── Photo Slide ───────
function PhotoSlide({ photo, onNext }) {
  const onNextRef = useRef(onNext)
  onNextRef.current = onNext

  useEffect(() => {
    const t = setTimeout(() => onNextRef.current(), 4200)
    return () => clearTimeout(t)
  }, [photo.url])

  return (
    <motion.div
      key={photo.url}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: '380px',
        cursor: 'pointer',
      }}
      onClick={() => onNextRef.current()}
    >
      <div style={{
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '3px solid rgba(255,255,255,0.9)',
        boxShadow: '0 0 24px rgba(255,77,184,0.3), 0 8px 30px rgba(0,0,0,0.3)',
      }}>
        <img
          src={photo.url}
          alt={photo.caption}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="eager"
          crossOrigin="anonymous"
        />
      </div>

      <p style={{
        fontFamily: '"Dancing Script", cursive',
        fontSize: 'clamp(17px, 4vw, 22px)',
        color: 'rgba(255,255,255,0.82)',
        margin: 0,
        textAlign: 'center',
        textShadow: '0 0 10px rgba(255,143,211,0.3)',
      }}>
        {photo.caption}
      </p>

      {/* Photo progress dots */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {PHOTOS.map((p, i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: p.url === photo.url ? '#ff4db8' : 'rgba(255,77,184,0.2)',
            transition: 'all 0.3s',
            boxShadow: p.url === photo.url ? '0 0 5px rgba(255,77,184,0.7)' : 'none',
          }} />
        ))}
      </div>
    </motion.div>
  )
}

// ─────── Main component ───────
export default function MemoriesSection({ onComplete }) {
  const [phase, setPhase] = useState('cards') // 'cards' | 'photos'
  const [cardIdx, setCardIdx] = useState(0)
  const [photoIdx, setPhotoIdx] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  function nextCard() {
    if (cardIdx < MEMORY_CARDS.length - 1) {
      setCardIdx((i) => i + 1)
    } else {
      setPhase('photos')
    }
  }

  function nextPhoto() {
    if (photoIdx < PHOTOS.length - 1) {
      setPhotoIdx((i) => i + 1)
    } else {
      onCompleteRef.current()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        gap: '1rem',
        overflowY: 'auto',
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'cards' && (
          <motion.div
            key={`card-${cardIdx}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <MemoryCard
              card={MEMORY_CARDS[cardIdx]}
              onNext={nextCard}
              isLast={cardIdx === MEMORY_CARDS.length - 1}
            />
          </motion.div>
        )}

        {phase === 'photos' && (
          <PhotoSlide
            key={`photo-${photoIdx}`}
            photo={PHOTOS[photoIdx]}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>

      {/* Floating hearts */}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -90 - i * 22],
            opacity: [0, 0.7, 0],
            x: [(i % 2 === 0 ? 1 : -1) * (25 + i * 16)],
          }}
          transition={{ duration: 3.2, delay: i * 1.4, repeat: Infinity, repeatDelay: 0.6 }}
          style={{
            position: 'absolute',
            fontSize: `${13 + i * 4}px`,
            color: '#ff4db8',
            userSelect: 'none',
            filter: 'drop-shadow(0 0 4px rgba(255,77,184,0.6))',
            bottom: '12%',
          }}
        >
          ♥
        </motion.span>
      ))}
    </motion.div>
  )
}
