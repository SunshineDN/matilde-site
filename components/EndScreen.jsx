import { motion } from 'framer-motion'

export default function EndScreen({ onRestart, partnerName = 'Amor' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      {/* Central heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{
          fontSize: 'clamp(52px, 14vw, 90px)',
          animation: 'heartPulse 2s ease-in-out infinite',
          filter: 'drop-shadow(0 0 18px rgba(255,77,184,0.7))',
          lineHeight: 1,
        }}
      >
        ♥
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(22px, 6vw, 38px)',
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {partnerName}, quando você sentir saudade,
          <br />
          volta aqui.
        </p>

        <p
          style={{
            fontFamily: 'var(--font-romantic)',
            fontSize: 'clamp(17px, 4.5vw, 26px)',
            color: '#ff8fd3',
            margin: 0,
            textShadow: '0 0 12px rgba(255,143,211,0.4)',
          }}
        >
          Esse cantinho é seu.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        onClick={onRestart}
        style={{
          padding: '0.9rem 2.5rem',
          borderRadius: '9999px',
          border: '1.5px solid rgba(255,77,184,0.5)',
          background: 'rgba(255,77,184,0.08)',
          color: '#ff8fd3',
          fontFamily: 'var(--font-romantic)',
          fontSize: 'clamp(17px, 4vw, 22px)',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'all 0.25s ease',
          animation: 'glowPulseBox 3s ease-in-out infinite',
          outline: 'none',
        }}
        whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,77,184,0.14)' }}
        whileTap={{ scale: 0.96 }}
        aria-label="Ver de novo"
      >
        ↻ Ver de novo
      </motion.button>

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -90 - i * 20],
            x: [(i % 2 === 0 ? 1 : -1) * (24 + i * 16)],
          }}
          transition={{ duration: 4, delay: i * 0.8, repeat: Infinity, repeatDelay: 0.4 }}
          style={{
            position: 'absolute',
            fontSize: `${10 + i * 4}px`,
            color: '#ff4db8',
            userSelect: 'none',
            filter: 'drop-shadow(0 0 4px rgba(255,77,184,0.6))',
            bottom: '10%',
          }}
        >
          ♥
        </motion.span>
      ))}
    </motion.div>
  )
}
