import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHOTOS = [
  { url: 'https://i.imgur.com/MCVtMq4.jpeg', caption: 'Um pedacinho nosso.' },
  { url: 'https://i.imgur.com/QFblkof.jpeg', caption: 'A vida sem você, não existe.' },
  { url: 'https://i.imgur.com/4ejgQb2.jpeg', caption: 'O brilho que você tem é incomparavel.' },
  { url: 'https://i.imgur.com/wuYFCBH.jpeg', caption: 'Amar você é a parte mais linda dos meus dias.' },
  { url: 'https://i.imgur.com/jEYAUNo.jpeg', caption: 'Você virou meu pensamento favorito em qualquer hora do dia.' },
  { url: 'https://i.imgur.com/ZgtZlAX.jpeg', caption: 'Meu coração fica muito feliz por encontrar você.' },
]

// ─────── Photo Slide ───────
function PhotoSlide({ photo, onNext }) {
  const onNextRef = useRef(onNext)
  onNextRef.current = onNext



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
        maxWidth: '460px',
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
  const [photoIdx, setPhotoIdx] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

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
        <PhotoSlide
          key={`photo-${photoIdx}`}
          photo={PHOTOS[photoIdx]}
          onNext={nextPhoto}
        />
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
