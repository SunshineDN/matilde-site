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

const PHOTO_URLS = [
  'https://i.imgur.com/MCVtMq4.jpeg',
  'https://i.imgur.com/QFblkof.jpeg',
  'https://i.imgur.com/4ejgQb2.jpeg',
  'https://i.imgur.com/wuYFCBH.jpeg',
  'https://i.imgur.com/jEYAUNo.jpeg',
  'https://i.imgur.com/ZgtZlAX.jpeg',
]

export default function App() {
  const [stageIdx, setStageIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const audioRef = useRef(null)

  const stage = STAGES[stageIdx]
  const matrixActive = stage === 'countdown' || stage === 'messages'
  const floatingWordsActive = !['loading', 'intro', 'countdown', 'messages'].includes(stage)

  // Preload images and audio on mount
  useEffect(() => {
    PHOTO_URLS.forEach((url) => {
      const img = new Image()
      img.src = url
    })
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [])

  // Start music precisely at countdown
  useEffect(() => {
    if (stage === 'countdown' && audioRef.current && !paused) {
      audioRef.current.play().catch(() => { })
    }
  }, [stage, paused])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.2
    if (paused) {
      audioRef.current.pause()
    } else {
      // General play to catch interaction if any
      audioRef.current.play().catch(() => { })
    }
  }, [paused, stage]) // Added stage to re-check on transitions

  const advance = useCallback(() => {
    // Interaction-triggered play to unlock audio policy
    if (audioRef.current && !paused) {
      audioRef.current.play().then(() => {
        // If we haven't reached the countdown yet, we can pause/mute 
        // to keep the music for the specific moment requested
        if (STAGES[stageIdx] === 'loading' || STAGES[stageIdx] === 'intro') {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }).catch(() => { })
    }
    setStageIdx((i) => Math.min(i + 1, STAGES.length - 1))
  }, [paused, stageIdx])

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
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />

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
