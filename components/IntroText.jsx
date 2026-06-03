import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function IntroText({ onComplete, partnerName = 'Amor' }) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => onCompleteRef.current(), 3200)
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-romantic)',
          fontSize: 'clamp(22px, 6vw, 40px)',
          color: 'rgba(255,255,255,0.88)',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.5,
          textShadow: '0 0 20px rgba(255,143,211,0.3)',
        }}
      >
        {partnerName}...{' '}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{ color: '#ff8fd3' }}
        >
          tem uma coisa que eu queria te mostrar.
        </motion.span>
      </motion.p>
    </motion.div>
  )
}
