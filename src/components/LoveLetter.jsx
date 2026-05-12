import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function HandsHeartSVG() {
  return (
    <div style={{ position: 'relative', width: 120, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 🫶 High quality stylized hands heart */}
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff4db8" opacity="0.15" />
        <path d="M7.5 4C5.01 4 3 6.01 3 8.5c0 3.12 2.91 5.91 8.15 10.65L12 20l.85-.78c5.24-4.74 8.15-7.53 8.15-10.65 0-2.49-2.01-4.5-4.5-4.5-1.54 0-3.04.99-3.56 2.36h-1.87c-.53-1.37-2.03-2.36-3.57-2.36z" stroke="#ff4db8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 14c-1.5-1-2.5-3.5-2.5-3.5M8 14c1.5-1 2.5-3.5 2.5-3.5" stroke="#ff4db8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Overlay small pulsing heart */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        animation: 'heartPulse 1.5s ease-in-out infinite',
        filter: 'drop-shadow(0 0 8px rgba(255,77,184,0.6))'
      }}>❤️</div>
    </div>
  )
}

const LETTER_PARAGRAPHS = [
  'Eu fiz isso pensando em você.',
  'Em cada detalhe, em cada cor, em cada frase, tentei colocar um pouco do carinho que sinto.',
  'A gente ainda tem tanta coisa para viver, tantos momentos para criar, tantos abraços para transformar em memória.',
  'Mas, mesmo antes de tudo isso acontecer, você já se tornou alguém muito especial para mim.',
  'Você é meu carinho preferido.',
]

export default function LoveLetter({ onComplete }) {
  const [phase, setPhase] = useState('closed') // 'closed' | 'opening' | 'open'
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  function triggerOpen() {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => setPhase('open'), 550)
  }



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
        perspective: '1400px',
        padding: '1rem',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: '420px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,77,184,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <AnimatePresence mode="wait">
        {/* CLOSED LETTER */}
        {phase !== 'open' && (
          <motion.div
            key="closed"
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={
              phase === 'opening'
                ? { rotateY: -90, opacity: 0, transition: { duration: 0.48, ease: 'easeIn' } }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={triggerOpen}
            style={{
              width: 'min(290px, 80vw)',
              height: 'min(440px, 65vh)',
              background: 'linear-gradient(160deg, #ffffff 0%, #fff6fb 100%)',
              borderRadius: '16px',
              cursor: phase === 'closed' ? 'pointer' : 'default',
              transformOrigin: 'left center',
              animation: phase === 'closed' ? 'glowPulseBox 3s ease-in-out infinite' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2rem 1.5rem',
            }}
          >
            {/* Seal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff4db8, #ff2fa8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: '0 0 14px rgba(255,77,184,0.5)',
              }}>♥</div>
              <p style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(20px, 4.5vw, 26px)',
                color: '#444',
                margin: 0,
              }}>
                Para minha Matilde
              </p>
              <p style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(14px, 3vw, 18px)',
                color: '#aaa',
                margin: 0,
              }}>
                Com amor
              </p>
            </div>

            <HandsHeartSVG />

            {phase === 'closed' && (
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{
                  fontFamily: '"Dancing Script", cursive',
                  fontSize: 'clamp(13px, 3vw, 16px)',
                  color: '#ff8fd3',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                Clique na cartinha, meu amor.
              </motion.p>
            )}
          </motion.div>
        )}

        {/* OPEN LETTER */}
        {phase === 'open' && (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(460px, 92vw)',
              maxHeight: '82dvh',
              background: 'linear-gradient(170deg, #ffffff 0%, #fffafd 100%)',
              borderRadius: '20px',
              boxShadow: '0 0 40px rgba(255,77,184,0.25), 0 0 100px rgba(255,77,184,0.1)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
              gap: '1rem',
              overflowY: 'auto',
            }}
          >
            {/* Pink top line */}
            <div style={{
              height: 3, borderRadius: 2,
              background: 'linear-gradient(90deg, #ff4db8, #ff8fd3, #ff4db8)',
              backgroundSize: '200% auto',
              animation: 'shimmerBg 3s linear infinite',
              marginBottom: '0.25rem',
            }} />

            <p style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: 'clamp(22px, 5.5vw, 30px)',
              color: '#ff4db8',
              margin: 0,
              textShadow: '0 0 8px rgba(255,77,184,0.2)',
            }}>
              Minha Matilde,
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {LETTER_PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
                  style={{
                    fontFamily: '"Dancing Script", cursive',
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    color: i === LETTER_PARAGRAPHS.length - 1 ? '#ff4db8' : '#444',
                    margin: 0,
                    lineHeight: 1.65,
                    fontWeight: i === LETTER_PARAGRAPHS.length - 1 ? 600 : 400,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}
            >
              <span style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(18px, 4vw, 24px)',
                color: '#aaa',
                fontStyle: 'italic',
              }}>
                Com carinho ♥
              </span>
            </motion.div>

            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              onClick={() => onCompleteRef.current()}
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                border: '1.5px solid rgba(255,77,184,0.4)',
                background: 'transparent',
                color: '#ff4db8',
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(16px, 3.5vw, 20px)',
                cursor: 'pointer',
                alignSelf: 'center',
                transition: 'all 0.2s',
              }}
              whileHover={{ scale: 1.05, background: 'rgba(255,77,184,0.06)' }}
              whileTap={{ scale: 0.97 }}
              aria-label="Continuar"
            >
              Continuar →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
