import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function CatSVG() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Gatinho fofo"
    >
      <polygon points="18,40 28,8 38,40" fill="#f0f0f0" />
      <polygon points="22,38 28,13 34,38" fill="#ffb6d9" />
      <polygon points="62,40 72,8 82,40" fill="#f0f0f0" />
      <polygon points="66,38 72,13 78,38" fill="#ffb6d9" />
      <ellipse cx="50" cy="60" rx="32" ry="30" fill="#f5f5f5" />
      <ellipse cx="37" cy="54" rx="5" ry="6.5" fill="#2d2d2d" />
      <circle cx="39" cy="52" r="2" fill="white" />
      <circle cx="38.5" cy="51.5" r="0.8" fill="#2d2d2d" />
      <ellipse cx="63" cy="54" rx="5" ry="6.5" fill="#2d2d2d" />
      <circle cx="65" cy="52" r="2" fill="white" />
      <circle cx="64.5" cy="51.5" r="0.8" fill="#2d2d2d" />
      <circle cx="36" cy="57" r="1" fill="white" opacity="0.7" />
      <circle cx="62" cy="57" r="1" fill="white" opacity="0.7" />
      <polygon points="47.5,64 52.5,64 50,67.5" fill="#ff8fd3" />
      <path d="M44,69 Q50,74 56,69" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="12" y1="60" x2="34" y2="63" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="66" x2="34" y2="65" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="71" x2="34" y2="68" stroke="#ccc" strokeWidth="1" strokeLinecap="round" />
      <line x1="66" y1="63" x2="88" y2="60" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="66" y1="65" x2="88" y2="66" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="66" y1="68" x2="86" y2="71" stroke="#ccc" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="27" cy="68" rx="7" ry="4" fill="#ffb6d9" opacity="0.4" />
      <ellipse cx="73" cy="68" rx="7" ry="4" fill="#ffb6d9" opacity="0.4" />
      <text x="85" y="28" fontSize="10" fill="#ff4db8" opacity="0.7">♥</text>
      <text x="3" y="32" fontSize="8" fill="#ff8fd3" opacity="0.6">♥</text>
    </svg>
  )
}

export default function CuteCat({ onComplete }) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => onCompleteRef.current(), 4000)
    return () => clearTimeout(t)
  }, [])

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
        gap: '1.75rem',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
        style={{
          animation: 'floatSoftSlow 4s ease-in-out infinite',
          filter: 'drop-shadow(0 0 20px rgba(255,183,217,0.45))',
        }}
      >
        <CatSVG />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: 'clamp(18px, 4.5vw, 28px)',
          color: 'rgba(255,255,255,0.82)',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.6,
          maxWidth: '360px',
        }}
      >
        Eu sei que é só uma tela...{' '}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          style={{ color: '#ff8fd3' }}
        >
          mas tem muito sentimento aqui dentro.
        </motion.span>
      </motion.p>

      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.8],
            y: [0, -55 - i * 14],
            x: [(i % 2 === 0 ? 1 : -1) * (18 + i * 14)],
          }}
          transition={{ delay: 1.2 + i * 0.5, duration: 2.5, repeat: Infinity, repeatDelay: 1.2 }}
          style={{
            position: 'absolute',
            fontSize: `${11 + i * 3}px`,
            color: '#ff4db8',
            filter: 'drop-shadow(0 0 4px rgba(255,77,184,0.6))',
            userSelect: 'none',
          }}
        >
          ♥
        </motion.span>
      ))}
    </motion.div>
  )
}
