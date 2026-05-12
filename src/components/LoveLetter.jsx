import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function HandsHeartSVG() {
  return (
    <svg width="120" height="82" viewBox="0 0 130 90" fill="none" aria-hidden="true">
      <path d="M32 80 Q22 62 25 46 L28 41 L32 46 L35 38 L39 43 L42 36 L46 41 L49 52 L47 80 Z"
        fill="#ffe0cc" stroke="#e8c0a8" strokeWidth="0.8" />
      <path d="M98 80 Q108 62 105 46 L102 41 L98 46 L95 38 L91 43 L88 36 L84 41 L81 52 L83 80 Z"
        fill="#ffe0cc" stroke="#e8c0a8" strokeWidth="0.8" />
      <path d="M65 62 C65 62 50 50 50 41 C50 35 56 30 60 34 C61.5 35.5 63 38 65 38 C67 38 68.5 35.5 70 34 C74 30 80 35 80 41 C80 50 65 62 65 62Z"
        fill="#ff4db8" />
      <circle cx="57" cy="36" r="3" fill="rgba(255,255,255,0.3)" />
    </svg>
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

  useEffect(() => {
    const t = setTimeout(triggerOpen, 4800)
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
