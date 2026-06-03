'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import BackgroundScene from './BackgroundScene'
import MatrixRain from './MatrixRain'
import FloatingWords from './FloatingWords'
import LoadingScreen from './LoadingScreen'
import IntroText from './IntroText'
import Countdown from './Countdown'
import MessageSequence from './MessageSequence'
import CuteCat from './CuteCat'
import LoveLetter from './LoveLetter'
import MemoriesSection from './MemoriesSection'
import PhotoHeart from './PhotoHeart'
import EndScreen from './EndScreen'
import FloatingControl from './FloatingControl'

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

export default function ValentinePage({ 
  partnerName = 'Amor', 
  phrases = [], 
  photos = [], 
  musicUrl 
}) {
  const [stageIdx, setStageIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const audioRef = useRef(null)

  const stage = STAGES[stageIdx]
  const matrixActive = stage === 'countdown' || stage === 'messages'
  const floatingWordsActive = !['loading', 'intro', 'countdown', 'messages'].includes(stage)

  // Preload images and audio on mount
  useEffect(() => {
    if (photos && photos.length > 0) {
      photos.forEach((url) => {
        const img = new Image()
        img.src = url
      })
    }
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
      <MatrixRain active={matrixActive} partnerName={partnerName} />
      <FloatingWords active={floatingWordsActive} partnerName={partnerName} />
      {musicUrl && <audio ref={audioRef} src={musicUrl} loop preload="auto" />}

      {/* Stage content */}
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <LoadingScreen key="loading" onComplete={advance} />
        )}
        {stage === 'intro' && (
          <IntroText key="intro" onComplete={advance} partnerName={partnerName} />
        )}
        {stage === 'countdown' && (
          <Countdown key="countdown" onComplete={advance} paused={paused} />
        )}
        {stage === 'messages' && (
          <MessageSequence key="messages" onComplete={advance} paused={paused} partnerName={partnerName} />
        )}
        {stage === 'cat' && (
          <CuteCat key="cat" onComplete={advance} />
        )}
        {stage === 'letter' && (
          <LoveLetter 
            key="letter" 
            onComplete={advance} 
            partnerName={partnerName}
            letterParagraphs={phrases.length > 0 ? phrases : undefined}
          />
        )}
        {stage === 'memories' && (
          <MemoriesSection key="memories" onComplete={advance} photos={photos} />
        )}
        {stage === 'photoHeart' && (
          <PhotoHeart key="photoHeart" onComplete={advance} photos={photos} />
        )}
        {stage === 'end' && (
          <EndScreen key="end" onRestart={restart} partnerName={partnerName} />
        )}
      </AnimatePresence>

      {/* Pause/play control — hidden during loading */}
      {stage !== 'loading' && (
        <FloatingControl paused={paused} onToggle={() => setPaused((p) => !p)} />
      )}
    </div>
  )
}
