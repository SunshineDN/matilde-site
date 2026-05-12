import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import BackgroundScene from './components/BackgroundScene'
import MatrixRain from './components/MatrixRain'
import FloatingWords from './components/FloatingWords'
import LoadingScreen from './components/LoadingScreen'
import IntroText from './components/IntroText'
import Countdown from './components/Countdown'
import MessageSequence from './components/MessageSequence'
import CuteCat from './components/CuteCat'
import LoveLetter from './components/LoveLetter'
import MemoriesSection from './components/MemoriesSection'
import PhotoHeart from './components/PhotoHeart'
import EndScreen from './components/EndScreen'
import FloatingControl from './components/FloatingControl'

import backgroundMusic from './assets/Bryant Barnes My Everything legendado.mp3'

const STAGES = [
  'loading',
  'intro',
  'countdown',
  'messages',
  'cat',
  'letter',
  'memories',
  'photoHeart',
  'end',
]

export default function App() {
  const [stageIdx, setStageIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const audioRef = useRef(null)

  const stage = STAGES[stageIdx]
  const matrixActive = stage === 'countdown' || stage === 'messages'
  const floatingWordsActive = !['loading', 'intro', 'countdown', 'messages'].includes(stage)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.2
    if (paused) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => { })
    }
  }, [paused])

  const advance = useCallback(() => {
    if (audioRef.current && !paused) {
      audioRef.current.play().catch(() => { })
    }
    setStageIdx((i) => Math.min(i + 1, STAGES.length - 1))
  }, [paused])

  const restart = useCallback(() => {
    setStageIdx(0)
    setPaused(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => { })
    }
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Persistent background layers */}
      <BackgroundScene />
      <MatrixRain active={matrixActive} />
      <FloatingWords active={floatingWordsActive} />
      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Stage content */}
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <LoadingScreen key="loading" onComplete={advance} />
        )}
        {stage === 'intro' && (
          <IntroText key="intro" onComplete={advance} />
        )}
        {stage === 'countdown' && (
          <Countdown key="countdown" onComplete={advance} paused={paused} />
        )}
        {stage === 'messages' && (
          <MessageSequence key="messages" onComplete={advance} paused={paused} />
        )}
        {stage === 'cat' && (
          <CuteCat key="cat" onComplete={advance} />
        )}
        {stage === 'letter' && (
          <LoveLetter key="letter" onComplete={advance} />
        )}
        {stage === 'memories' && (
          <MemoriesSection key="memories" onComplete={advance} />
        )}
        {stage === 'photoHeart' && (
          <PhotoHeart key="photoHeart" onComplete={advance} />
        )}
        {stage === 'end' && (
          <EndScreen key="end" onRestart={restart} />
        )}
      </AnimatePresence>

      {/* Pause/play control — hidden during loading */}
      {stage !== 'loading' && (
        <FloatingControl paused={paused} onToggle={() => setPaused((p) => !p)} />
      )}
    </div>
  )
}
