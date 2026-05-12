import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  { text: 'MATILDE', big: false },
  { text: 'EU', big: false },
  { text: 'TE', big: false },
  { text: 'AMO', big: false },
  { text: 'MUITO', big: true },
  { text: '❤', big: false, isHeart: true },
]

const DURATIONS = [1100, 900, 900, 1000, 1400, 2000]

export default function MessageSequence({ onComplete, paused }) {
  const [index, setIndex] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (paused) return
    if (index >= MESSAGES.length) {
      const t = setTimeout(() => onCompleteRef.current(), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), DURATIONS[index] ?? 1100)
    return () => clearTimeout(t)
  }, [index, paused])

  const current = MESSAGES[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={index}
            initial={{ scale: 0.6, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.3, opacity: 0, y: -22, filter: 'blur(8px)' }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
          >
            <span
              className={current.isHeart ? undefined : 'glow-pink-lg'}
              style={{
                fontFamily: current.isHeart ? 'inherit' : '"Press Start 2P", monospace',
                fontSize: current.isHeart
                  ? 'clamp(80px, 20vw, 160px)'
                  : current.big
                  ? 'clamp(50px, 13vw, 128px)'
                  : 'clamp(42px, 11vw, 108px)',
                color: '#ff4db8',
                letterSpacing: current.isHeart ? 0 : '0.04em',
                lineHeight: 1,
                userSelect: 'none',
                animation: current.isHeart
                  ? 'heartPulse 0.7s ease-in-out infinite'
                  : undefined,
                filter: current.isHeart
                  ? 'drop-shadow(0 0 24px rgba(255,77,184,0.95)) drop-shadow(0 0 60px rgba(255,47,168,0.5))'
                  : undefined,
              }}
            >
              {current.text}
            </span>

            {!current.isHeart && (
              <div style={{ display: 'flex', gap: '4px', marginTop: '0.2rem' }}>
                {Array.from({ length: current.big ? 7 : 5 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#ff4db8',
                      opacity: 0.55,
                      boxShadow: '0 0 5px #ff4db8',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
