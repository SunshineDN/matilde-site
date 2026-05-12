import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '20px',
      }}
    >
      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              <div className="spinner" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
            >
              <p style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(20px, 5vw, 28px)',
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
              }}>
                Preparando algo especial..
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                color: 'rgba(255,143,211,0.65)',
                margin: 0,
                fontStyle: 'italic',
              }}>
                As coisas boas levam tempo.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(22px, 6vw, 32px)',
                color: 'white',
                margin: 0,
                textAlign: 'center',
                textShadow: '0 0 15px rgba(255,77,184,0.5)',
              }}
            >
              Está pronto.
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '50px',
                fontFamily: '"Dancing Script", cursive',
                fontSize: '22px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(255,77,184,0.15)',
                transition: 'all 0.3s',
              }}
            >
              Abrir Presente →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
