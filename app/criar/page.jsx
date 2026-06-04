'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Heart, Mail, Link2, Sparkles, Music, ArrowRight, ArrowLeft,
  Check, X, Upload, User, Camera, MessageSquareHeart,
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'O presente', icon: Heart },
  { id: 2, label: 'A cartinha', icon: MessageSquareHeart },
  { id: 3, label: 'As memórias', icon: Camera },
]

const PHRASE_PROMPTS = [
  'O que você mais admira nessa pessoa especial?',
  'Como você se sente quando está ao lado dela/dele?',
  'Um momento inesquecível que vocês viveram juntos...',
  'O que você nunca disse, mas sempre quis falar?',
  'Uma frase que define tudo que vocês têm juntos...',
]

// ─── Animation ────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? -56 : 56, opacity: 0, transition: { duration: 0.22 } }),
}

// ─── Shared presentational components (top-level, no closures) ───────────────

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#342126]">
        {label}
        {required && <span className="text-[#FF3148] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#7A5A63] mt-0.5">{hint}</p>}
    </div>
  )
}

const inputCls = [
  'w-full bg-white border border-[#F3C7D0] rounded-2xl px-4 py-3',
  'text-[#342126] placeholder:text-[#C4A0AC] text-sm',
  'focus:outline-none focus:ring-2 focus:ring-[#FF3148]/20 focus:border-[#FF8FA3]',
  'transition-all duration-200',
].join(' ')

function ProgressBar({ step }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              animate={{ scale: step === s.id ? 1.12 : 1 }}
              transition={{ duration: 0.25 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step > s.id
                ? 'bg-[#FF3148] text-white shadow-[0_4px_14px_rgba(255,49,72,0.35)]'
                : step === s.id
                  ? 'bg-[#FF3148] text-white shadow-[0_4px_14px_rgba(255,49,72,0.35)]'
                  : 'bg-[#F3C7D0]/60 text-[#C4A0AC]'
                }`}>
              {step > s.id
                ? <Check style={{ width: 17, height: 17 }} />
                : <s.icon style={{ width: 16, height: 16 }} fill={step >= s.id ? 'white' : 'none'} />
              }
            </motion.div>
            <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors duration-300 ${step >= s.id ? 'text-[#FF3148]' : 'text-[#C4A0AC]'
              }`}>
              {s.label}
            </span>
          </div>

          {i < STEPS.length - 1 && (
            <div className="w-14 sm:w-20 h-0.5 mx-1.5 mb-5 rounded-full bg-[#F3C7D0]/40 overflow-hidden">
              <motion.div
                className="h-full bg-[#FF3148] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: step > s.id ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CriarPage() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [stepError, setStepError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [lastStepChange, setLastStepChange] = useState(0)
  const URL_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

  const [formData, setFormData] = useState({
    user_email: '',
    slug: '',
    partner_name: '',
    phrases: ['', '', '', '', ''],
  })
  const [files, setFiles] = useState({ photos: [], music: null })

  const photoInputRef = useRef(null)
  const musicInputRef = useRef(null)

  // Draft persistence
  useEffect(() => {
    const saved = localStorage.getItem('valentineDraft')
    if (saved) {
      try { setFormData(JSON.parse(saved)) } catch { }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('valentineDraft', JSON.stringify(formData))
  }, [formData])

  // Photo preview URLs — revoked when photos change
  const photoUrls = useMemo(
    () => files.photos.map(f => URL.createObjectURL(f)),
    [files.photos]
  )
  useEffect(() => {
    return () => photoUrls.forEach(url => URL.revokeObjectURL(url))
  }, [photoUrls])

  // Helpers
  const set = useCallback((key, val) => setFormData(f => ({ ...f, [key]: val })), [])

  const handleSlugChange = useCallback((raw) => {
    let v = raw.toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (v.length > 20) v = v.slice(0, 20)
    set('slug', v)
  }, [set])

  const handlePhrase = useCallback((i, val) => {
    setFormData(f => {
      const next = [...f.phrases]
      next[i] = val
      return { ...f, phrases: next }
    })
  }, [])

  const addPhotos = useCallback((fileList) => {
    const incoming = Array.from(fileList).filter(f => f.type.startsWith('image/'))
    setFiles(prev => ({ ...prev, photos: [...prev.photos, ...incoming].slice(0, 6) }))
  }, [])

  const removePhoto = useCallback((i) => {
    setFiles(prev => ({ ...prev, photos: prev.photos.filter((_, idx) => idx !== i) }))
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    addPhotos(e.dataTransfer.files)
  }, [addPhotos])

  // Step validation
  const validateStep1 = () => {
    if (!formData.partner_name.trim())
      return 'Digite o nome de quem vai receber o presente.'
    if (!formData.user_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email))
      return 'Digite um e-mail válido.'
    if (!formData.slug.trim() || formData.slug.length < 3)
      return 'Escolha um link com pelo menos 3 caracteres.'
    return ''
  }

  const goNext = async () => {
    if (step === 1) {
      const err = validateStep1()
      if (err) { setStepError(err); return }

      try {
        const res = await fetch(`/api/pages/check-slug?slug=${formData.slug}`)
        const data = await res.json()
        if (!data.available) {
          setStepError('Esse link já está em uso, escolha outro.')
          return
        }
      } catch (err) {
        setStepError('Erro ao verificar o link. Tente novamente.')
        return
      }
    }
    setStepError('')
    setDir(1)
    setStep(s => s + 1)
    setLastStepChange(Date.now())
  }

  const goBack = () => {
    setStepError('')
    setDir(-1)
    setStep(s => s - 1)
  }

  // Submit
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (step !== 3) {
      goNext()
      return
    }
    if (Date.now() - lastStepChange < 500) {
      return // Previne duplo clique acidental
    }

    setError('')
    setLoading(true)
    try {
      const fd = new FormData()
      files.photos.forEach(f => fd.append('photos', f))
      if (files.music) fd.append('music', files.music)
      fd.append('user_email', formData.user_email)
      fd.append('slug', formData.slug)
      fd.append('partner_name', formData.partner_name)
      fd.append('phrases', JSON.stringify(formData.phrases))

      const res = await fetch('/api/pages', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao criar a página')
      router.push(`/preview/${formData.slug}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF8F8 0%, #FFECEF 60%, #FFF8F8 100%)' }}>

      {/* Background floating hearts */}
      {[
        { x: '2%', y: '8%', s: 22, dur: '4s', d: '0s' },
        { x: '93%', y: '15%', s: 15, dur: '3.8s', d: '1.5s' },
        { x: '4%', y: '78%', s: 12, dur: '4.5s', d: '0.8s' },
        { x: '91%', y: '70%', s: 20, dur: '3.5s', d: '2.2s' },
        { x: '50%', y: '4%', s: 10, dur: '5s', d: '3s' },
      ].map((h, i) => (
        <div key={i} className="fixed text-[#FFD9E0] pointer-events-none select-none"
          style={{
            left: h.x, top: h.y, zIndex: 0,
            animation: `floatSoft ${h.dur} ${h.d} ease-in-out infinite`
          }}>
          <Heart style={{ width: h.s, height: h.s }} fill="currentColor" />
        </div>
      ))}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FFF8F8]/95 backdrop-blur-md border-b border-[#F3C7D0]/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 bg-[#FF3148] rounded-full flex items-center justify-center shadow-sm">
              <Heart className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-[#342126]"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Lovii<span className="text-[#FF3148]"> Story</span>
            </span>
          </Link>
          <Link href="/preview/exemplo">
            <button className="text-xs text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer font-medium flex items-center gap-1">
              Ver exemplo
              <ArrowRight style={{ width: 12, height: 12 }} />
            </button>
          </Link>
        </div>
      </header>

      {/* Form wrapper */}
      <div className="relative z-10 max-w-[520px] mx-auto px-4 py-10 sm:py-14">

        {/* Headline above card */}
        <motion.div className="text-center mb-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#342126]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Crie um presente{' '}
            <span style={{ fontFamily: 'var(--font-great-vibes), cursive', color: '#FF3148', fontWeight: 400, fontSize: '1.4em', lineHeight: 1 }}>
              inesquecível
            </span>
          </h1>
          <p className="text-[#7A5A63] text-sm mt-2">
            Leva menos de 5 minutos. Seu amor vai adorar.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-3xl border border-[#F3C7D0] p-6 sm:p-8"
          style={{ boxShadow: '0 20px 60px rgba(255,49,72,0.07), 0 4px 20px rgba(255,49,72,0.05)' }}>

          {/* Top badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold">
              <Sparkles style={{ width: 12, height: 12 }} />
              Presente digital em 3 passos
            </div>
          </div>

          <ProgressBar step={step} />

          {/* Steps */}
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit">

                  {/* ─── STEP 1: O presente ─────────────────────────────── */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="text-center mb-7">
                        <div className="w-14 h-14 bg-[#FFE1E6] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-7 h-7 text-[#FF3148]" fill="#FF3148" />
                        </div>
                        <h2 className="text-xl font-extrabold text-[#342126]"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Para quem é este presente?
                        </h2>
                        <p className="text-[#7A5A63] text-sm mt-1.5">
                          Vamos começar pela pessoa mais especial.
                        </p>
                      </div>

                      <Field label="Nome de quem vai receber" required
                        hint="Aparecerá personalizado na página do presente.">
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF8FA3] pointer-events-none" />
                          <input
                            type="text"
                            autoFocus
                            value={formData.partner_name}
                            onChange={e => set('partner_name', e.target.value)}
                            className={`${inputCls} pl-10`}
                            placeholder="Ex: Ana Clara"
                          />
                        </div>
                      </Field>

                      <Field label="Seu e-mail" required
                        hint="Enviaremos o link do presente para este e-mail.">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF8FA3] pointer-events-none" />
                          <input
                            type="email"
                            value={formData.user_email}
                            onChange={e => set('user_email', e.target.value)}
                            className={`${inputCls} pl-10`}
                            placeholder="seu@email.com"
                          />
                        </div>
                      </Field>

                      <Field label="Escolha seu link exclusivo" required
                        hint="Apenas letras minúsculas, números e hífens. Máx 20 caracteres.">
                        <div className="flex items-stretch">
                          <span className="inline-flex items-center px-3.5 bg-[#FFF1F3] border border-[#F3C7D0] border-r-0 rounded-l-2xl text-xs text-[#7A5A63] font-medium whitespace-nowrap">
                            /p/
                          </span>
                          <input
                            type="text"
                            value={formData.slug}
                            onChange={e => handleSlugChange(e.target.value)}
                            className={`${inputCls} rounded-l-none border-l-0`}
                            placeholder="nome-do-casal"
                            maxLength={20}
                          />
                        </div>
                        <AnimatePresence>
                          {formData.slug && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-1.5 mt-2 overflow-hidden">
                              <Link2 className="w-3 h-3 text-[#FF3148] flex-shrink-0" />
                              <span className="text-xs text-[#FF3148] font-medium">
                                {URL_BASE}/p/
                                <strong>{formData.slug}</strong>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Field>
                    </div>
                  )}

                  {/* ─── STEP 2: A cartinha ─────────────────────────────── */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="text-center mb-7">
                        <div className="w-14 h-14 bg-[#FFE1E6] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Heart className="w-7 h-7 text-[#FF3148]" />
                        </div>
                        <h2 className="text-xl font-extrabold text-[#342126]"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Escreva com o coração
                        </h2>
                        <p className="text-[#7A5A63] text-sm mt-1.5">
                          {formData.partner_name
                            ? <>O que você quer dizer para{' '}
                              <span className="font-semibold text-[#FF3148]">{formData.partner_name}</span>?
                            </>
                            : 'Até 5 frases que vão tocar o coração.'}
                        </p>
                      </div>

                      {formData.phrases.map((phrase, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-start gap-3">

                          {/* Number badge */}
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm transition-all duration-300"
                            style={{
                              background: phrase.trim() ? '#FF3148' : '#FFE1E6',
                              color: phrase.trim() ? 'white' : '#C4A0AC',
                            }}>
                            {phrase.trim()
                              ? <Check style={{ width: 14, height: 14 }} />
                              : i + 1}
                          </div>

                          {/* Textarea */}
                          <div className="flex-1 relative">
                            <textarea
                              rows={2}
                              value={phrase}
                              onChange={e => handlePhrase(i, e.target.value)}
                              maxLength={200}
                              className={`${inputCls} resize-none pr-12`}
                              placeholder={PHRASE_PROMPTS[i]}
                            />
                            <span className="absolute bottom-2.5 right-3 text-[10px] text-[#C4A0AC] pointer-events-none">
                              {phrase.length}/200
                            </span>
                          </div>
                        </motion.div>
                      ))}

                      {/* Hint */}
                      <div className="flex items-center gap-2.5 p-3.5 bg-[#FFF1F3] rounded-2xl border border-[#F3C7D0]/60 mt-1">
                        <Sparkles className="w-4 h-4 text-[#FF3148] flex-shrink-0" />
                        <p className="text-xs text-[#7A5A63]">
                          Não precisa preencher tudo. Escreva o que sair do coração.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ─── STEP 3: As memórias ────────────────────────────── */}
                  {step === 3 && (
                    <div className="space-y-7">
                      <div className="text-center mb-7">
                        <div className="w-14 h-14 bg-[#FFE1E6] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Camera className="w-7 h-7 text-[#FF3148]" />
                        </div>
                        <h2 className="text-xl font-extrabold text-[#342126]"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          Adicione as memórias
                        </h2>
                        <p className="text-[#7A5A63] text-sm mt-1.5">
                          Fotos e música tornam tudo ainda mais emocionante.
                        </p>
                      </div>

                      {/* Photos */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold text-[#342126]">
                            Fotos do casal
                            <span className="ml-1.5 text-xs font-normal text-[#7A5A63]">(máx. 6)</span>
                          </label>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-all ${files.photos.length === 6
                            ? 'bg-[#FF3148] text-white'
                            : 'bg-[#FFE1E6] text-[#D91F36]'
                            }`}>
                            {files.photos.length}/6
                          </span>
                        </div>

                        {/* Hidden input */}
                        <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden"
                          onChange={e => addPhotos(e.target.files)} />

                        {/* Drop zone */}
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label="Clique ou arraste fotos aqui"
                          onClick={() => files.photos.length < 6 && photoInputRef.current?.click()}
                          onKeyDown={e => e.key === 'Enter' && files.photos.length < 6 && photoInputRef.current?.click()}
                          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleDrop}
                          className={`relative rounded-3xl border-2 border-dashed p-6 text-center transition-all duration-300 min-h-[112px] flex flex-col items-center justify-center gap-2 ${dragOver
                            ? 'border-[#FF3148] bg-[#FFF1F3] scale-[1.01]'
                            : files.photos.length >= 6
                              ? 'border-[#F3C7D0]/40 bg-[#FAFAFA] cursor-not-allowed opacity-60'
                              : 'border-[#F3C7D0] bg-[#FFF8F8] hover:border-[#FF8FA3] hover:bg-[#FFF1F3] cursor-pointer'
                            }`}>
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${dragOver ? 'bg-[#FF3148]' : 'bg-[#FFE1E6]'
                            }`}>
                            <Upload className={`w-5 h-5 transition-colors ${dragOver ? 'text-white' : 'text-[#FF3148]'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#342126]">
                              {files.photos.length >= 6
                                ? 'Limite atingido'
                                : dragOver
                                  ? 'Solte aqui!'
                                  : 'Arraste ou clique para adicionar'}
                            </p>
                            <p className="text-xs text-[#7A5A63]">PNG, JPG, WEBP</p>
                          </div>
                        </div>

                        {/* Thumbnails */}
                        <AnimatePresence>
                          {files.photos.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="grid grid-cols-3 gap-2.5 mt-3">
                              {photoUrls.map((url, i) => (
                                <motion.div key={i}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.85 }}
                                  className="relative aspect-square rounded-2xl overflow-hidden border border-[#F3C7D0] group">
                                  <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[#FF3148]">
                                    <X style={{ width: 12, height: 12 }} />
                                  </button>
                                  <div className="absolute bottom-1.5 left-1.5 w-5 h-5 rounded-full bg-[#FF3148] flex items-center justify-center text-white text-[9px] font-bold">
                                    {i + 1}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Music */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-[#342126] mb-3">
                          <Music className="w-4 h-4 text-[#FF3148]" />
                          Música de fundo
                          <span className="text-xs font-normal text-[#7A5A63]">(opcional)</span>
                        </label>

                        <input ref={musicInputRef} type="file" accept="audio/*" className="hidden"
                          onChange={e => setFiles(f => ({ ...f, music: e.target.files[0] || null }))} />

                        {!files.music ? (
                          <button
                            type="button"
                            onClick={() => musicInputRef.current?.click()}
                            className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-[#F3C7D0] bg-[#FFF8F8] hover:border-[#FF8FA3] hover:bg-[#FFF1F3] transition-all duration-300 cursor-pointer group">
                            <div className="w-10 h-10 rounded-2xl bg-[#FFE1E6] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF3148] transition-colors">
                              <Music className="w-5 h-5 text-[#FF3148] group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-[#342126]">Adicionar música</p>
                              <p className="text-xs text-[#7A5A63]">MP3, AAC, OGG</p>
                            </div>
                            <Upload className="w-4 h-4 text-[#FF8FA3] ml-auto" />
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF1F3] border border-[#F3C7D0]">
                            <div className="w-10 h-10 rounded-2xl bg-[#FF3148] flex items-center justify-center flex-shrink-0"
                              style={{ animation: 'pulseSoft 2s ease-in-out infinite' }}>
                              <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#342126] truncate">{files.music.name}</p>
                              <p className="text-xs text-[#7A5A63]">
                                {(files.music.size / (1024 * 1024)).toFixed(1)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setFiles(f => ({ ...f, music: null }))}
                              className="w-7 h-7 rounded-full bg-[#F3C7D0] flex items-center justify-center hover:bg-[#FF3148] hover:text-white text-[#7A5A63] transition-all cursor-pointer flex-shrink-0">
                              <X style={{ width: 14, height: 14 }} />
                            </button>
                          </motion.div>
                        )}
                      </div>

                      {/* Résumé */}
                      <div className="rounded-2xl bg-[#FFF1F3] border border-[#F3C7D0] p-4">
                        <p className="text-[10px] font-bold text-[#D91F36] uppercase tracking-wider mb-3">
                          Resumo do presente
                        </p>
                        <div className="space-y-2">
                          {[
                            { label: 'Para', value: formData.partner_name || '—' },
                            { label: 'Link', value: formData.slug ? `/p/${formData.slug}` : '—' },
                            { label: 'Frases', value: `${formData.phrases.filter(p => p.trim()).length} de 5 preenchidas` },
                            { label: 'Fotos', value: `${files.photos.length} selecionadas` },
                            { label: 'Música', value: files.music ? files.music.name : 'Nenhuma' },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between">
                              <span className="text-xs text-[#7A5A63] font-medium">{label}</span>
                              <span className="text-xs text-[#342126] font-semibold truncate max-w-[60%] text-right">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Submit error */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm">
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step error */}
            <AnimatePresence>
              {stepError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 mt-5 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-2xl text-sm">
                  <X className="w-4 h-4 flex-shrink-0" />
                  {stepError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className={`flex gap-3 mt-7 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#F3C7D0] bg-white text-[#342126] text-sm font-medium hover:bg-[#FFF1F3] transition-all cursor-pointer">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF3148] text-white font-semibold text-sm hover:bg-[#D91F36] transition-all cursor-pointer shadow-[0_8px_24px_rgba(255,49,72,0.28)]">
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-[#FF3148] text-white font-bold text-base hover:bg-[#D91F36] disabled:opacity-55 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_8px_24px_rgba(255,49,72,0.28)]"
                  style={{ borderBottom: loading ? undefined : '3px solid #B01428' }}>
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                        style={{ animation: 'spin 0.8s linear infinite' }} />
                      Criando seu presente...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" fill="white" />
                      Ver preview e finalizar
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-center text-xs text-[#7A5A63] mt-5">
          Pagamento único · Acesso imediato · Sem mensalidade
        </motion.p>
      </div>
    </div>
  )
}
