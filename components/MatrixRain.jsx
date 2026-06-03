import { useEffect, useRef } from 'react'

const CHARS = ['M', 'A', 'T', 'I', 'L', 'D', 'E', 'U', 'S', 'O', '♥', 'V', 'C', '★', '✦', '❤']

function getChar(words) {
  if (Math.random() < 0.12) return words[Math.floor(Math.random() * words.length)]
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function MatrixRain({ active, partnerName = 'AMOR' }) {
  const words = [partnerName.toUpperCase(), 'AMOR', 'SAUDADE', 'EU', 'VOCÊ', 'SEMPRE', 'CARINHO']
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    const fontSize = 13
    let columns = Math.floor(canvas.width / (fontSize + 2))
    const drops = Array.from({ length: columns }, () => Math.random() * -60)

    const handleResize = () => {
      setSize()
      columns = Math.floor(canvas.width / (fontSize + 2))
      drops.length = columns
      for (let i = 0; i < columns; i++) {
        if (drops[i] === undefined) drops[i] = Math.random() * -60
      }
    }
    window.addEventListener('resize', handleResize)

    function draw() {
      if (!activeRef.current) {
        frameRef.current = null
        return
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const ch = getChar(words)
        const isWord = ch.length > 1
        const alpha = isWord ? 0.9 : (0.35 + Math.random() * 0.65)

        ctx.fillStyle = `rgba(255, ${isWord ? 77 : Math.floor(20 + Math.random() * 60)}, 184, ${alpha})`
        ctx.font = `${isWord ? fontSize - 2 : fontSize}px 'Courier New', monospace`
        ctx.fillText(ch, i * (fontSize + 2), drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.972) {
          drops[i] = 0
        }
        drops[i] += isWord ? 0.5 : 1
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    if (active) {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      draw()
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: active ? 0.9 : 0,
        transition: 'opacity 1.8s ease',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  )
}
