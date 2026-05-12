import { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

const CARD_SIZE = 58
const SCALE = 13
const NUM_CARDS = 24
const CONTAINER_W = 520
const CONTAINER_H = 430
const X_CENTER = CONTAINER_W / 2
const Y_CENTER = 148

const PHOTO_URLS = [
  'https://i.imgur.com/MCVtMq4.jpeg',
  'https://i.imgur.com/QFblkof.jpeg',
  'https://i.imgur.com/4ejgQb2.jpeg',
  'https://i.imgur.com/wuYFCBH.jpeg',
  'https://i.imgur.com/jEYAUNo.jpeg',
  'https://i.imgur.com/ZgtZlAX.jpeg',
]

function heartPoint(t) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
  return { x: x * SCALE, y: y * SCALE }
}

export default function PhotoHeart({ onComplete }) {
  const [assembled, setAssembled] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), NUM_CARDS * 90 + 1000)
    return () => clearTimeout(t)
  }, [])

  // Advance to end screen after assembly + reading time
  useEffect(() => {
    if (!assembled) return
    const t = setTimeout(() => onCompleteRef.current?.(), 9000)
    return () => clearTimeout(t)
  }, [assembled])

  const positions = useMemo(() =>
    Array.from({ length: NUM_CARDS }, (_, k) => {
      const t = (k / NUM_CARDS) * 2 * Math.PI
      const { x, y } = heartPoint(t)
      return {
        left: X_CENTER + x - CARD_SIZE / 2,
        top: Y_CENTER + y - CARD_SIZE / 2,
        x,
        y,
      }
    }), [])

  const rotations = useMemo(() =>
    Array.from({ length: NUM_CARDS }, () => (Math.random() - 0.5) * 16), [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '0.5rem',
      }}
    >
      {/* Ambient pink glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: assembled ? 1 : 0 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          width: `${CONTAINER_W}px`,
          height: `${CONTAINER_H}px`,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse 60% 50% at 50% 38%, rgba(255,77,184,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(24px)',
          animation: assembled ? 'heartGlow 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Heart container */}
      <div style={{
        position: 'relative',
        width: `${CONTAINER_W}px`,
        height: `${CONTAINER_H}px`,
        flexShrink: 0,
      }}>
        {positions.map((pos, i) => {
          const isHeart = i % 7 === 0
          const photoUrl = PHOTO_URLS[i % PHOTO_URLS.length]

          return (
            <motion.div
              key={i}
              initial={{ x: -pos.x, y: -pos.y, scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: assembled ? rotations[i] : 0,
              }}
              transition={{
                x: { delay: i * 0.08, duration: 0.65, ease: [0.175, 0.885, 0.32, 1.275] },
                y: { delay: i * 0.08, duration: 0.65, ease: [0.175, 0.885, 0.32, 1.275] },
                scale: { delay: i * 0.08, duration: 0.65, ease: [0.175, 0.885, 0.32, 1.275] },
                opacity: { delay: i * 0.08, duration: 0.4 },
                rotate: { delay: NUM_CARDS * 0.08 + 0.4, duration: 0.6 },
              }}
              className={assembled ? `float-card-${i % 8}` : undefined}
              style={{
                position: 'absolute',
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
                borderRadius: '12px',
                border: '2.5px solid rgba(255,255,255,0.85)',
                boxShadow: '0 0 12px rgba(255,77,184,0.35), 0 4px 14px rgba(0,0,0,0.35)',
                overflow: 'hidden',
                background: isHeart ? 'white' : '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
              }}
            >
              {isHeart ? (
                <span style={{
                  fontSize: '26px',
                  animation: 'heartPulse 1.8s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 6px rgba(255,77,184,0.7))',
                }}>
                  ♥
                </span>
              ) : (
                <img
                  src={photoUrl}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="eager"
                  crossOrigin="anonymous"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Final text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: assembled ? 1 : 0, y: assembled ? 0 : 20 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <p style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: 'clamp(20px, 5vw, 30px)',
          color: 'rgba(255,255,255,0.88)',
          margin: 0,
          textShadow: '0 0 12px rgba(255,143,211,0.3)',
          animation: assembled ? 'heartPulse 2.5s ease-in-out infinite' : 'none',
        }}>
          Mesmo longe, meu coração encontrou você.
        </p>
        <p style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: 'clamp(16px, 4vw, 22px)',
          color: '#ff8fd3',
          margin: 0,
          textShadow: '0 0 8px rgba(255,143,211,0.4)',
        }}>
          E desde então, ele te reconhece como casa.
        </p>
      </motion.div>

      {/* Floating hearts after assembly */}
      {assembled &&
        [...Array(7)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.85, 0],
              y: [-10, -110 - i * 22],
              x: [(i % 2 === 0 ? 1 : -1) * (22 + i * 18)],
            }}
            transition={{ duration: 3.8, delay: i * 0.7, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              position: 'absolute',
              fontSize: `${10 + i * 3}px`,
              color: '#ff4db8',
              filter: 'drop-shadow(0 0 5px rgba(255,77,184,0.7))',
              userSelect: 'none',
              bottom: '20%',
            }}
          >
            ♥
          </motion.span>
        ))}
    </motion.div>
  )
}
