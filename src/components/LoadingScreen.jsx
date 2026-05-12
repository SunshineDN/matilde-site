import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600)
    return () => clearTimeout(t)
  }, [onComplete])

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
        gap: '1.75rem',
      }}
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
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(20px, 5vw, 28px)',
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Preparando algo especial..
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            color: 'rgba(255,143,211,0.65)',
            margin: 0,
            letterSpacing: '0.04em',
            fontStyle: 'italic',
          }}
        >
          As coisas boas levam tempo.
        </p>
      </motion.div>
    </motion.div>
  )
}
