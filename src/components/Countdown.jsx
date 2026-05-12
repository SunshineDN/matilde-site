import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Countdown({ onComplete, paused }) {
  const [phase, setPhase] = useState('counting') // 'counting' | 'ready'
  const [count, setCount] = useState(3)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Counting phase: decrement every second
  useEffect(() => {
    if (paused || phase !== 'counting') return
    if (count <= 0) {
      setPhase('ready')
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count, paused, phase])

  // Ready phase: advance after showing "Pronta?"
  useEffect(() => {
    if (phase !== 'ready') return
    const t = setTimeout(() => onCompleteRef.current(), 1400)
    return () => clearTimeout(t)
  }, [phase])

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
        gap: '2rem',
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'counting' && count > 0 && (
          <motion.div
            key={count}
            initial={{ scale: 1.8, opacity: 0, filter: 'blur(12px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.4, opacity: 0, filter: 'blur(16px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glow-pink-lg"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(80px, 22vw, 180px)',
              color: '#ff4db8',
              lineHeight: 1,
              userSelect: 'none',
              animation: 'heartPulse 0.9s ease-in-out infinite',
            }}
          >
            {count}
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.p
            key="ready"
            initial={{ scale: 0.7, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: 'clamp(36px, 10vw, 72px)',
              color: '#ff8fd3',
              margin: 0,
              textShadow: '0 0 20px rgba(255,143,211,0.6)',
            }}
          >
            Pronta?
          </motion.p>
        )}
      </AnimatePresence>

      {phase === 'counting' && (
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {[3, 2, 1].map((n) => (
            <div
              key={n}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: count >= n ? '#ff4db8' : 'rgba(255,77,184,0.2)',
                boxShadow: count >= n ? '0 0 8px #ff4db8' : 'none',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
