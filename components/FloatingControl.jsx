import { motion } from 'framer-motion'

export default function FloatingControl({ paused, onToggle }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      onClick={onToggle}
      aria-label={paused ? 'Continuar animação' : 'Pausar animação'}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${paused ? 'rgba(255,77,184,0.7)' : 'rgba(255,255,255,0.2)'}`,
        color: paused ? '#ff4db8' : 'rgba(255,255,255,0.7)',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: paused ? '0 0 12px rgba(255,77,184,0.4)' : 'none',
        transition: 'all 0.2s ease',
        outline: 'none',
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      {paused ? '▶' : '⏸'}
    </motion.button>
  )
}
