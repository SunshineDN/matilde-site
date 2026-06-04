'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Heart, Sparkles, Music, Share2, QrCode, Clock,
  ChevronDown, Mail, Instagram, Star,
  Play, Check, Menu, X, ArrowRight,
  Cloud, Smartphone, Video, Gift, Image,
} from 'lucide-react'

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── 1. PROMO BANNER ─────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <div className="w-full bg-[#FF3148] text-white text-center py-2.5 px-4 z-50 relative">
      <p className="text-[11px] md:text-sm font-medium tracking-wide leading-snug">
        +100.000 pessoas já fizeram alguém chorar de emoção.&nbsp;
        <span className="font-semibold">Garanta a sua surpresa em 5 minutos.</span>
      </p>
    </div>
  )
}

// ─── 2. HEADER ───────────────────────────────────────────────────────────────
function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F8]/95 backdrop-blur-md border-b border-[#F3C7D0]/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-[#FF3148] rounded-full flex items-center justify-center shadow-sm">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#342126]" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Lovii<span className="text-[#FF3148]"> Story</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: 'Criar', href: '#como-funciona' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Sobre Nós', href: '#sobre' },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              className="text-[#7A5A63] hover:text-[#FF3148] text-sm font-medium transition-colors duration-200 cursor-pointer">
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link href="/criar">
            <button className="hidden sm:flex items-center px-4 py-2 rounded-full border border-[#F3C7D0] bg-white text-[#342126] text-sm font-medium hover:bg-[#FFF1F3] transition-colors duration-200 cursor-pointer">
              Fazer Login
            </button>
          </Link>
          <Link href="/criar">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF3148] text-white text-sm font-semibold hover:bg-[#D91F36] transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(255,49,72,0.28)]">
              Criar presente
              <Heart className="w-3.5 h-3.5" fill="white" />
            </button>
          </Link>
          <button
            className="md:hidden p-2 cursor-pointer text-[#342126] rounded-xl hover:bg-[#FFF1F3] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden border-t border-[#F3C7D0]/50 bg-white px-6 py-4 flex flex-col gap-1 overflow-hidden"
          >
            {[
              { label: 'Criar', href: '#como-funciona' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Sobre Nós', href: '#sobre' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className="py-3 text-[#342126] font-medium text-base border-b border-[#F3C7D0]/30 last:border-0 hover:text-[#FF3148] transition-colors cursor-pointer"
                onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <Link href="/criar" className="mt-3" onClick={() => setOpen(false)}>
              <button className="w-full py-3.5 rounded-full bg-[#FF3148] text-white font-semibold cursor-pointer shadow-[0_6px_20px_rgba(255,49,72,0.3)]">
                Criar presente agora
              </button>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── PHONE MOCKUP (internal screen) ──────────────────────────────────────────
function PhoneScreen() {
  const timelineItems = [
    { date: '14 Fev 2022', label: 'O dia em que tudo começou' },
    { date: '23 Abr 2022', label: 'Nosso primeiro encontro' },
    { date: '25 Dez 2022', label: 'O momento inesquecível' },
  ]

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#FFF0F3] to-[#FFECEF] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="px-3.5 pt-3 pb-2.5 flex items-center justify-between bg-white/70 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 bg-[#FF3148] rounded-full flex items-center justify-center">
            <Heart className="w-3 h-3 text-white" fill="white" />
          </div>
          <span className="text-[9px] font-bold text-[#342126]">Lovii Story</span>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF3148]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF8FA3]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFD9E0]" />
        </div>
      </div>

      {/* Hero photo */}
      <div className="mx-3 mt-2 rounded-2xl overflow-hidden h-28 flex-shrink-0 relative"
        style={{ background: 'linear-gradient(135deg, #FF3148 0%, #FF6F8A 55%, #FFB3C1 100%)' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <Heart className="w-9 h-9 text-white/85" fill="white"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
          <span className="text-white/90 text-[9px] font-semibold tracking-wide">Eu &amp; Você</span>
        </div>
        {[
          { x: '10%', y: '18%', size: 10, delay: '0s' },
          { x: '78%', y: '60%', size: 7,  delay: '0.6s' },
          { x: '52%', y: '78%', size: 9,  delay: '1.2s' },
        ].map((h, i) => (
          <div key={i} className="absolute text-white/40 pointer-events-none"
            style={{ left: h.x, top: h.y, animation: `floatSoft 3s ${h.delay} ease-in-out infinite` }}>
            <Heart style={{ width: h.size, height: h.size }} fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Name + quote */}
      <div className="px-3.5 mt-2.5 text-center flex-shrink-0">
        <p className="text-[10px] font-bold text-[#342126]">Para: Ana Clara ❤️</p>
        <p className="text-[8.5px] text-[#7A5A63] mt-0.5 leading-relaxed">
          "Cada momento ao seu lado é um presente que guardo no coração..."
        </p>
      </div>

      {/* Timeline mini */}
      <div className="px-3 mt-2.5 flex-1 min-h-0">
        <div className="text-[8px] font-bold text-[#FF3148] mb-2 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          Nossa história
        </div>
        <div className="relative ml-1">
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-[#FF3148] to-[#FFD9E0]" />
          <div className="space-y-1.5">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative pl-7 flex items-center">
                <div className="absolute left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#FF3148] bg-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#FF3148]" />
                </div>
                <div className="bg-white rounded-xl p-1.5 border border-[#F3C7D0]/60 shadow-sm w-full">
                  <p className="text-[6.5px] font-bold text-[#FF3148]">{item.date}</p>
                  <p className="text-[7.5px] text-[#342126] font-medium leading-tight mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music player */}
      <div className="mx-3 mb-3 mt-2 bg-white rounded-2xl p-2.5 border border-[#F3C7D0]/50 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF3148, #FF8FA3)' }}>
            <Music className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-semibold text-[#342126] truncate">Perfect — Ed Sheeran</p>
            <div className="mt-1 h-0.5 bg-[#F3C7D0] rounded-full overflow-hidden">
              <div className="h-full w-[62%] bg-[#FF3148] rounded-full" />
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#FF3148] flex items-center justify-center flex-shrink-0">
            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

function IPhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 260, height: 534 }}>
      {/* Frame */}
      <div className="absolute inset-0 rounded-[3.2rem]"
        style={{
          background: 'linear-gradient(160deg, #3A3A3A 0%, #1C1C1E 100%)',
          boxShadow: '0 40px 90px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1.5px rgba(255,255,255,0.04)',
        }}>
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[96px]  w-[3px] h-7  bg-[#3A3A3A] rounded-l" />
        <div className="absolute -left-[3px] top-[140px] w-[3px] h-14 bg-[#3A3A3A] rounded-l" />
        <div className="absolute -left-[3px] top-[208px] w-[3px] h-14 bg-[#3A3A3A] rounded-l" />
        <div className="absolute -right-[3px] top-[128px] w-[3px] h-20 bg-[#3A3A3A] rounded-r" />

        {/* Screen */}
        <div className="absolute inset-[8px] rounded-[2.6rem] overflow-hidden bg-[#FFF8F8]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-[#1C1C1E] rounded-b-2xl z-10 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2C2C2E] border border-[#383838]" />
            <div className="w-10 h-1.5 rounded-full bg-[#2C2C2E]" />
          </div>
          {/* Content */}
          <div className="absolute inset-0 pt-7">
            <PhoneScreen />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 3. HERO SECTION ─────────────────────────────────────────────────────────
const heroTestimonials = [
  { name: 'Lucas',     avatar: 'L', text: 'Minha namorada chorou quando recebeu. Simplesmente perfeito!',       color: '#FF3148' },
  { name: 'Fernanda',  avatar: 'F', text: 'Fiz pra minha mãe e ela assistiu umas 5 vezes seguidas!',            color: '#D91F36' },
  { name: 'Carla',     avatar: 'C', text: 'Minha amiga disse que foi o presente mais criativo que já ganhou!',  color: '#FF6F8A' },
  { name: 'João',      avatar: 'J', text: 'Fiz para minha irmã e toda a família chorou junto.',                 color: '#C41830' },
]

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg, #FFF8F8 0%, #FFECEF 100%)' }}>

      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[#FF3148]/7 rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#FF8FA3]/8 rounded-full blur-[80px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

      {/* Floating hearts (bg decor) */}
      {[
        { x: '4%',  y: '14%', s: 16, delay: '0s',    dur: '3.8s' },
        { x: '92%', y: '22%', s: 12, delay: '1.4s',  dur: '4.2s' },
        { x: '8%',  y: '72%', s: 10, delay: '0.7s',  dur: '3.5s' },
        { x: '88%', y: '68%', s: 18, delay: '2.1s',  dur: '5.0s' },
        { x: '50%', y: '6%',  s: 8,  delay: '0.3s',  dur: '4.0s' },
      ].map((h, i) => (
        <div key={i} className="absolute text-[#FFD9E0] pointer-events-none select-none"
          style={{ left: h.x, top: h.y, animation: `floatSoft ${h.dur} ${h.delay} ease-in-out infinite` }}>
          <Heart style={{ width: h.s, height: h.s }} fill="currentColor" />
        </div>
      ))}

      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column ── */}
          <motion.div className="flex flex-col items-center lg:items-start text-center lg:text-left"
            initial="hidden" animate="visible" variants={stagger}>

            {/* Badge */}
            <motion.div variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-xs font-semibold mb-6">
              <Heart className="w-3.5 h-3.5" fill="currentColor" />
              O presente que emociona, pronto em 5 minutos.
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#342126] leading-[1.08] tracking-tight"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Declare seu amor
              </h1>
              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.25] tracking-tight mt-1"
                style={{ fontFamily: 'var(--font-great-vibes), cursive', color: '#FF3148' }}>
                de um jeito inesquecível.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={fadeInUp}
              className="mt-6 text-base sm:text-lg text-[#7A5A63] max-w-lg leading-relaxed">
              Crie um presente digital com fotos, música e uma retrospectiva animada dos melhores momentos.
              Pronto em 5 minutos para emocionar quem você ama.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-8 w-full sm:w-auto">
              <Link href="/criar">
                <button className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FF3148] text-white font-bold text-base w-full sm:w-auto cursor-pointer transition-all duration-300 hover:bg-[#D91F36]"
                  style={{
                    boxShadow: '0 12px 30px rgba(255, 49, 72, 0.28)',
                    borderBottom: '3px solid #B01428',
                  }}>
                  Criar presente agora
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" fill="white" />
                </button>
              </Link>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p variants={fadeInUp} className="mt-3 text-xs text-[#7A5A63]">
              Pagamento único&nbsp;·&nbsp;Acesso imediato&nbsp;·&nbsp;Sem mensalidade
            </motion.p>

            {/* Social proof */}
            <motion.div variants={fadeInUp} className="mt-9 w-full">
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[
                    { l: 'L', c: '#FF3148' }, { l: 'F', c: '#D91F36' }, { l: 'C', c: '#FF6F8A' },
                    { l: 'J', c: '#C41830' }, { l: 'M', c: '#FF8FA3' },
                  ].map(({ l, c }, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FFF8F8] flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ backgroundColor: c }}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#7A5A63] font-medium">+100.000 presentes criados</p>
                </div>
              </div>

              {/* Mini testimonial cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {heroTestimonials.map((t, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#F3C7D0] p-3 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ backgroundColor: t.color }}>
                        {t.avatar}
                      </div>
                      <span className="text-[10px] font-semibold text-[#342126] truncate">{t.name}</span>
                    </div>
                    <p className="text-[9px] text-[#7A5A63] leading-relaxed line-clamp-2">"{t.text}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column — Phone mockup ── */}
          <motion.div className="relative flex justify-center items-center py-8"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}>

            {/* Glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full blur-[70px]"
                style={{ background: 'rgba(255,49,72,0.13)' }} />
            </div>

            {/* Floating phone */}
            <div className="float-phone">
              <IPhoneMockup />
            </div>

            {/* Floating badge — social proof */}
            <motion.div
              className="absolute -top-2 left-0 sm:-left-6 bg-white rounded-2xl shadow-lg border border-[#F3C7D0] px-3 py-2.5 flex items-center gap-2.5"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="w-9 h-9 bg-[#FFE1E6] rounded-full flex items-center justify-center">
                <Heart className="w-4.5 h-4.5 text-[#FF3148]" fill="currentColor" style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#342126] leading-none">+100.543</p>
                <p className="text-[9px] text-[#7A5A63] mt-0.5">pessoas emocionadas</p>
              </div>
            </motion.div>

            {/* Floating badge — QR */}
            <motion.div
              className="absolute bottom-6 right-0 sm:-right-6 bg-white rounded-2xl shadow-lg border border-[#F3C7D0] px-3 py-2.5 flex items-center gap-2.5"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
              <div className="w-9 h-9 bg-[#FFE1E6] rounded-xl flex items-center justify-center">
                <QrCode className="w-4 h-4 text-[#FF3148]" style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#342126] leading-none">QR Code</p>
                <p className="text-[9px] text-[#7A5A63] mt-0.5">Incluso no plano</p>
              </div>
            </motion.div>

            {/* Floating badge — speed */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-10 bg-[#FF3148] rounded-2xl shadow-lg px-3.5 py-2 text-white"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
              <p className="text-[9px] font-medium opacity-90">Pronto em</p>
              <p className="text-base font-black leading-tight">5 min</p>
            </motion.div>

            {/* Decorative heart */}
            <motion.div className="absolute top-10 right-0 sm:-right-4 text-[#FFD9E0]"
              animate={{ rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity }}>
              <Heart className="w-10 h-10" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── 4. HOW IT WORKS ─────────────────────────────────────────────────────────
const steps = [
  {
    num: '01', icon: Gift,
    title: 'Conte a sua história',
    text:  'Preencha os dados e escolha os detalhes que tornam essa pessoa tão especial.',
  },
  {
    num: '02', icon: Image,
    title: 'Personalize cada detalhe',
    text:  'Escolha suas melhores fotos, a trilha sonora perfeita e mensagens que tocam o coração.',
  },
  {
    num: '03', icon: QrCode,
    title: 'Receba seu Link e QR Code',
    text:  'Após o pagamento, você recebe instantaneamente o link da sua página e um QR Code exclusivo.',
  },
  {
    num: '04', icon: Heart,
    title: 'Emocione quem você ama',
    text:  'Envie o presente e prepare-se para uma reação cheia de emoção, sorriso e lágrimas de felicidade.',
  },
]

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFF8F8]">
      <div className="max-w-[1280px] mx-auto">

        <motion.div className="text-center mb-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-5">
            COMO FUNCIONA
          </motion.div>
          <motion.h2 variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126] leading-tight"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Crie um presente inesquecível em{' '}
            <span className="text-[#FF3148]">4 passos simples</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-[#7A5A63] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nossa plataforma torna fácil criar uma experiência digital e personalizada que vai emocionar quem você ama.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div key={i}
              className="relative p-6 rounded-[1.5rem] bg-white border border-[#F3C7D0] cursor-default group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 12px 36px rgba(255,49,72,0.13)' }}>

              {/* Step number watermark */}
              <div className="text-6xl font-black mb-4 leading-none select-none"
                style={{ color: '#FF3148', opacity: 0.09, fontFamily: 'var(--font-poppins), sans-serif' }}>
                {step.num}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F3] flex items-center justify-center mb-4 group-hover:bg-[#FFE1E6] transition-colors">
                <step.icon className="w-6 h-6 text-[#FF3148]"
                  fill={step.icon === Heart ? '#FF3148' : 'none'} />
              </div>

              <h3 className="text-sm font-bold text-[#342126] mb-2"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#7A5A63] leading-relaxed">{step.text}</p>

              {/* Connector arrow (desktop) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] items-center justify-center z-10">
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF3148]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 5. TIMELINE SECTION ─────────────────────────────────────────────────────
const timelineItems = [
  { date: '14 Fev 2022', label: 'O dia em que tudo começou' },
  { date: '23 Abr 2022', label: 'Nosso primeiro encontro' },
  { date: '15 Jul 2022', label: 'A primeira viagem juntos' },
  { date: '25 Dez 2022', label: 'O momento que eu nunca vou esquecer' },
  { date: 'Hoje',        label: 'Eu só queria te lembrar o quanto você é especial' },
]

function TimelineSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left text */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-6">
              MEMÓRIAS ESPECIAIS
            </motion.div>
            <motion.h2 variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126] leading-tight mb-5"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Linha do Tempo
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#7A5A63] text-base sm:text-lg leading-relaxed mb-3">
              Reviva sua história com uma linha do tempo animada e elegante, destacando os momentos mais importantes de vocês.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-[#7A5A63] text-sm leading-relaxed mb-9">
              Do primeiro encontro até os momentos mais marcantes, transforme cada lembrança em uma experiência visual emocionante.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/criar">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF3148] text-white font-semibold hover:bg-[#D91F36] transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(255,49,72,0.25)]">
                  Criar minha linha do tempo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — timeline card */}
          <motion.div className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}>

            {/* Card glow */}
            <div className="absolute -inset-6 bg-[#FF3148]/5 rounded-3xl blur-3xl pointer-events-none" />

            <div className="relative rounded-3xl border border-[#F3C7D0] p-6 sm:p-8"
              style={{
                background: 'linear-gradient(160deg, #FFF8F8 0%, #FFECEF 100%)',
                boxShadow: '0 16px 50px rgba(255,49,72,0.09)',
              }}>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-[#FF3148]" />
                <span className="text-sm font-bold text-[#342126]"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Nossa História
                </span>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-3 bottom-3 w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #FF3148, #FFD9E0)' }} />

                <div className="space-y-4">
                  {timelineItems.map((item, i) => (
                    <motion.div key={i} className="relative pl-12 flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.1 }}>

                      {/* Dot */}
                      <div className="absolute left-[10px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-[#FF3148] bg-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF3148]" />
                      </div>

                      {/* Avatar circle */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, #FF3148, #FF8FA3)` }}>
                        <Heart className="w-4 h-4 text-white" fill="white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white rounded-2xl p-3 border border-[#F3C7D0]/70 shadow-sm">
                        <p className="text-[10px] font-bold text-[#FF3148] mb-0.5">{item.date}</p>
                        <p className="text-xs font-medium text-[#342126] leading-snug">{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── 6. FEATURES SECTION ─────────────────────────────────────────────────────
const features = [
  {
    icon: Cloud, badge: 'Nuvem',
    title: 'Para sempre no ar',
    text:  'Seu presente vai para a nuvem imediatamente. Fica online e acessível de qualquer lugar do mundo.',
  },
  {
    icon: Sparkles, badge: 'Personalizado',
    title: '100% personalizável',
    text:  'Escolha fotos, músicas, mensagens e detalhes especiais. Cada parte pode ter a personalidade de vocês.',
  },
  {
    icon: Smartphone, badge: 'Memórias',
    title: 'Relembre seus melhores momentos',
    text:  'O presente digital que faz quem você ama sentir o quanto cada lembrança foi importante.',
  },
  {
    icon: Video, badge: 'Animação',
    title: 'Com uma retrospectiva única',
    text:  'Uma retrospectiva animada para relembrar os melhores momentos dessa história especial.',
  },
]

function FeaturesSection() {
  return (
    <section id="recursos" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFF8F8]">
      <div className="max-w-[1280px] mx-auto">

        <motion.div className="text-center mb-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-5">
            RECURSOS
          </motion.div>
          <motion.h2 variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Crie um presente{' '}
            <span className="text-[#FF3148]">memorável</span> e único
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-[#7A5A63] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nossa plataforma oferece tudo para criar uma experiência digital personalizada que vai emocionar quem você ama.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={i}
              className="p-6 rounded-[1.5rem] bg-white border border-[#F3C7D0] cursor-default group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 12px 36px rgba(255,49,72,0.13)' }}>

              <div className="w-14 h-14 rounded-2xl bg-[#FFF1F3] flex items-center justify-center mb-5 group-hover:bg-[#FFE1E6] transition-colors">
                <f.icon className="w-7 h-7 text-[#FF3148]" />
              </div>

              <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#FFE1E6] text-[#D91F36] text-[10px] font-bold mb-3">
                {f.badge}
              </span>

              <h3 className="text-sm font-bold text-[#342126] mb-2"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {f.title}
              </h3>
              <p className="text-sm text-[#7A5A63] leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. DEMO SECTION ─────────────────────────────────────────────────────────
function DemoSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFECEF]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden px-8 sm:px-16 py-14 sm:py-20 text-center cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #FF3148 0%, #FF6F8A 50%, #FF9BAD 100%)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.01 }}>

          {/* Background hearts */}
          {[
            { x: '6%',  y: '15%', s: 44 }, { x: '82%', y: '12%', s: 28 },
            { x: '3%',  y: '68%', s: 20 }, { x: '88%', y: '62%', s: 54 },
            { x: '44%', y: '4%',  s: 24 }, { x: '70%', y: '80%', s: 18 },
          ].map((h, i) => (
            <div key={i} className="absolute text-white/10 pointer-events-none select-none"
              style={{ left: h.x, top: h.y }}>
              <Heart style={{ width: h.s, height: h.s }} fill="currentColor" />
            </div>
          ))}

          {/* Sparkles corners */}
          <div className="absolute top-6 left-10 text-white/30"><Sparkles className="w-6 h-6" /></div>
          <div className="absolute bottom-6 right-10 text-white/30"><Sparkles className="w-5 h-5" /></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/25 text-white text-[11px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              DEMO GRATUITA
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Teste Nossa{' '}
              <span style={{ fontFamily: 'var(--font-great-vibes), cursive', fontWeight: 400 }}>
                Demo Interativa
              </span>
            </h2>

            <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Veja como sua surpresa pode ficar antes de criar a sua.
            </p>

            <Link href="/preview/exemplo">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#FF3148] font-bold text-base hover:bg-[#FFF1F3] transition-all duration-300 cursor-pointer shadow-xl">
                Explorar a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <p className="mt-4 text-white/65 text-sm">Não é necessário cadastro.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 8. TESTIMONIALS ─────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Lucas',    time: '2 semanas atrás',  avatar: 'L', color: '#FF3148', text: 'Minha namorada chorou muito quando recebeu. Foi o presente mais especial que já fiz.' },
  { name: 'Mariana',  time: '1 mês atrás',      avatar: 'M', color: '#D91F36', text: 'Fiz para o meu marido no nosso aniversário de casamento. Ele ficou emocionado demais.' },
  { name: 'Camila',   time: '3 semanas atrás',  avatar: 'C', color: '#FF6F8A', text: 'Muito fácil de criar e ficou lindo. Parecia algo super profissional.' },
  { name: 'Fernanda', time: '2 meses atrás',    avatar: 'F', color: '#C41830', text: 'Minha mãe assistiu várias vezes. Foi uma surpresa absolutamente inesquecível.' },
  { name: 'Rafael',   time: '1 semana atrás',   avatar: 'R', color: '#FF3148', text: 'Criei em poucos minutos e enviei pelo WhatsApp. Ela amou demais, ficou em choque!' },
  { name: 'Juliana',  time: '3 meses atrás',    avatar: 'J', color: '#D91F36', text: 'Achei muito mais criativo do que comprar algo comum. Superou todas as expectativas.' },
  { name: 'Amanda',   time: '5 dias atrás',     avatar: 'A', color: '#FF6F8A', text: 'O QR Code deixou tudo ainda mais especial. Coloquei numa caixinha surpresa!' },
  { name: 'Pedro',    time: '2 semanas atrás',  avatar: 'P', color: '#C41830', text: 'As fotos com a música deixaram tudo muito emocionante. Recomendo demais!' },
]

function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 sm:py-28 bg-[#FFECEF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-12">
        <motion.div className="text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-5">
            DEPOIMENTOS DE CLIENTES
          </motion.div>
          <motion.h2 variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            O que nossos <span className="text-[#FF3148]">clientes</span> dizem
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-[#7A5A63] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Histórias reais de pessoas que criaram presentes digitais para surpreender alguém especial.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
        <div className="marquee-track flex gap-4 py-2">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i}
              className="w-72 sm:w-80 flex-shrink-0 bg-white rounded-3xl border border-[#F3C7D0] p-5 shadow-sm hover:shadow-[0_6px_24px_rgba(255,49,72,0.1)] transition-shadow cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#342126]">{t.name}</p>
                  <p className="text-[10px] text-[#7A5A63]">{t.time}</p>
                </div>
                <div className="ml-auto">
                  <Heart className="w-4 h-4 text-[#FF3148]" fill="currentColor" />
                </div>
              </div>
              <div className="flex gap-0.5 mb-2.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#7A5A63] leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 9. PRICING SECTION ──────────────────────────────────────────────────────
const basicBenefits = [
  'Acesso por 1 dia',
  'Edições ilimitadas',
  'Fotos e seções ilimitadas',
  'Link compartilhável',
  'QR Code personalizado',
]

const proBenefits = [
  'Acesso para sempre',
  'Edições ilimitadas',
  'Fotos e seções ilimitadas',
  'Link compartilhável',
  'QR Code personalizado',
  'Ideal para datas especiais',
  'Sem mensalidade',
]

function PricingSection() {
  return (
    <section id="precos" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFF8F8]">
      <div className="max-w-[1280px] mx-auto">

        <motion.div className="text-center mb-14"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-5">
            PLANOS E PREÇOS
          </motion.div>
          <motion.h2 variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Escolha o plano <span className="text-[#FF3148]">ideal</span> para você
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-[#7A5A63] text-base max-w-lg mx-auto leading-relaxed">
            Pagamento único, sem mensalidade. Crie seu presente digital agora e surpreenda quem você ama.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Basic plan */}
          <motion.div
            className="bg-white rounded-3xl border border-[#F3C7D0] p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>

            <div className="inline-flex px-3 py-1 rounded-full bg-[#F3C7D0] text-[#7A5A63] text-xs font-bold mb-5">
              ECONÔMICO
            </div>
            <h3 className="text-xl font-bold text-[#342126] mb-1"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Só Hoje (24h)
            </h3>
            <p className="text-[#7A5A63] text-sm mb-6">Uma surpresa rápida e emocionante.</p>

            <div className="mb-7">
              <span className="text-sm text-[#7A5A63] line-through">R$ 39,90</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-[#FF3148]"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  R$ 24,90
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {basicBenefits.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-[#342126]">
                  <div className="w-5 h-5 rounded-full bg-[#FFE1E6] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#FF3148]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/criar">
              <button className="w-full py-3.5 rounded-full border-2 border-[#FF3148] text-[#FF3148] font-semibold hover:bg-[#FFF1F3] transition-all duration-200 cursor-pointer">
                Escolher este plano
              </button>
            </Link>
          </motion.div>

          {/* Featured plan */}
          <motion.div
            className="relative bg-white rounded-3xl border-2 border-[#FF3148] p-8"
            style={{ boxShadow: '0 0 0 4px rgba(255,49,72,0.07), 0 20px 60px rgba(255,49,72,0.14)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}>

            {/* Best value badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#FF3148] text-white text-[11px] font-bold whitespace-nowrap shadow-lg">
              ✨ MELHOR CUSTO-BENEFÍCIO
            </div>

            <div className="inline-flex px-3 py-1 rounded-full bg-[#FF3148] text-white text-xs font-bold mb-5 mt-2">
              VITALÍCIO
            </div>
            <h3 className="text-xl font-bold text-[#342126] mb-1"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Para Sempre (Vitalício)
            </h3>
            <p className="text-[#7A5A63] text-sm mb-6">Guarde esse momento para sempre. Sem expiração.</p>

            <div className="mb-7">
              <span className="text-sm text-[#7A5A63] line-through">R$ 69,90</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-black text-[#FF3148]"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  R$ 34,90
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {proBenefits.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-[#342126]">
                  <div className="w-5 h-5 rounded-full bg-[#FF3148] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[10px] text-[#7A5A63] text-center mb-4">
              Pagamento único · Sem assinatura · Acesso imediato
            </p>

            <Link href="/criar">
              <button className="w-full py-3.5 rounded-full bg-[#FF3148] text-white font-bold hover:bg-[#D91F36] transition-all duration-200 cursor-pointer shadow-[0_8px_24px_rgba(255,49,72,0.3)]">
                Criar meu presente
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── 10. FAQ SECTION ─────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'O que é a Lovii Story?',
    a: 'A Lovii Story é uma plataforma para criar presentes digitais personalizados com fotos, música, mensagens, linha do tempo, QR Code e uma experiência emocionante para quem você ama.',
  },
  {
    q: 'Para quem posso criar um presente?',
    a: 'Você pode criar para namorado, namorada, marido, esposa, mãe, pai, amiga, avó ou qualquer pessoa especial.',
  },
  {
    q: 'Como funciona? Preciso saber editar?',
    a: 'Não precisa saber editar. Você apenas preenche as informações, envia as fotos, escolhe os detalhes e a plataforma cria a página personalizada.',
  },
  {
    q: 'O site fica no ar para sempre?',
    a: 'No plano vitalício, sim. A página fica disponível sem expiração.',
  },
  {
    q: 'Como entrego a surpresa?',
    a: 'Você pode enviar o link pelo WhatsApp, Instagram, e-mail ou imprimir o QR Code e colocar em uma carta, caixa de presente ou cartão.',
  },
  {
    q: 'O que tem na Retrospectiva Animada?',
    a: 'A retrospectiva reúne fotos, mensagens e momentos especiais em uma experiência visual emocionante, com música e animações suaves.',
  },
  {
    q: 'O acesso é imediato após o pagamento?',
    a: 'Sim. Após a confirmação do pagamento, você recebe o acesso para criar e compartilhar seu presente.',
  },
  {
    q: 'Se eu errar algo, posso editar depois?',
    a: 'Sim. Você pode editar fotos, textos e detalhes conforme o plano escolhido.',
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FFECEF]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-[11px] font-bold uppercase tracking-widest mb-6">
              PERGUNTAS FREQUENTES
            </motion.div>
            <motion.h2 variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#342126] mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Tire suas dúvidas
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#7A5A63] text-base mb-9 leading-relaxed">
              Separamos as perguntas mais comuns. Se a sua não estiver aqui, entre em contato!
            </motion.p>

            {/* Contact box */}
            <motion.div variants={fadeInUp}
              className="bg-white rounded-2xl border border-[#F3C7D0] p-6 mb-8 shadow-sm">
              <p className="text-sm font-semibold text-[#342126] mb-4">Não encontrou sua pergunta?</p>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com/loviistory" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE1E6] flex items-center justify-center group-hover:bg-[#FF3148] transition-colors">
                    <Instagram className="w-4 h-4 text-[#FF3148] group-hover:text-white transition-colors" />
                  </div>
                  @loviistory
                </a>
                <a href="mailto:suporte@loviistory.com.br"
                  className="flex items-center gap-2.5 text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE1E6] flex items-center justify-center group-hover:bg-[#FF3148] transition-colors">
                    <Mail className="w-4 h-4 text-[#FF3148] group-hover:text-white transition-colors" />
                  </div>
                  suporte@loviistory.com.br
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/criar">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF3148] text-white font-semibold hover:bg-[#D91F36] transition-all cursor-pointer shadow-[0_8px_24px_rgba(255,49,72,0.25)]">
                  Criar meu presente
                  <Heart className="w-4 h-4" fill="white" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Accordion */}
          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                className="bg-white rounded-2xl border border-[#F3C7D0] overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}>

                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#FFF8F8] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF3148]"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}>
                  <span className="text-sm font-semibold text-[#342126] leading-snug">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex-shrink-0">
                    <ChevronDown className="w-4 h-4 text-[#FF3148]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}>
                      <div className="px-5 pb-4 pt-1 text-sm text-[#7A5A63] leading-relaxed bg-[#FFF8F8] border-t border-[#F3C7D0]/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 11. EXPLORE SECTION ─────────────────────────────────────────────────────
const exploreTags = [
  'Presente para Namorada',
  'Presente para Namorado',
  'Presente para Esposa',
  'Presente para Marido',
  'Presente para Amiga',
  'Presente para Mãe',
  'Presente para Avó',
  'Presente de Dia dos Namorados',
  'Presente de Aniversário de Namoro',
  'Pedido de Desculpas',
]

function ExploreSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeInUp}
            className="text-2xl sm:text-3xl font-extrabold text-[#342126] mb-3"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Explore mais presentes
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#7A5A63] mb-8 leading-relaxed">
            Descubra outras formas de surpreender quem você ama.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center">
            {exploreTags.map((tag, i) => (
              <button key={i}
                className="px-4 py-2 rounded-full bg-white border border-[#F3C7D0] text-[#342126] text-sm font-medium hover:bg-[#FF3148] hover:text-white hover:border-[#FF3148] transition-all duration-200 cursor-pointer shadow-sm">
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 12. FOOTER ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="sobre" className="bg-[#FFF8F8] border-t border-[#F3C7D0]/60 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FF3148] rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-xl text-[#342126]"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                Lovii<span className="text-[#FF3148]"> Story</span>
              </span>
            </div>
            <p className="text-sm text-[#7A5A63] leading-relaxed max-w-xs mb-5">
              Criamos experiências únicas para eternizar momentos especiais com presentes virtuais e personalizados.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE1E6] border border-[#F3C7D0] text-[#D91F36] text-xs font-medium">
              <Heart className="w-3 h-3" fill="currentColor" />
              Feito com amor no Brasil
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="text-sm font-bold text-[#342126] mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Produto
            </h4>
            <ul className="space-y-2.5">
              {['Como Funciona', 'Recursos', 'Preços', 'Exemplo', 'Criar Presente'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Presentes */}
          <div>
            <h4 className="text-sm font-bold text-[#342126] mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Presentes
            </h4>
            <ul className="space-y-2.5">
              {['Para Namorada(o)', 'Para Amiga', 'Para Mãe', 'Para Pai', 'Para Avó', 'Ver Todos'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa + Legal */}
          <div>
            <h4 className="text-sm font-bold text-[#342126] mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Empresa
            </h4>
            <ul className="space-y-2.5 mb-6">
              {['Sobre Nós', 'Blog', 'Contato', 'FAQ'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-bold text-[#342126] mb-4"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Legal
            </h4>
            <ul className="space-y-2.5">
              {['Termos de Uso', 'Política de Privacidade', 'Política de Cookies'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-[#7A5A63] hover:text-[#FF3148] transition-colors cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F3C7D0]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#7A5A63]">
            © {new Date().getFullYear()} Lovii Story. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-[#7A5A63]">
            <Heart className="w-3.5 h-3.5 text-[#FF3148]" fill="currentColor" />
            Feito com amor no Brasil
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F8] overflow-x-hidden"
      style={{ fontFamily: 'var(--font-poppins), var(--font-outfit), sans-serif', color: '#342126' }}>
      <PromoBanner />
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TimelineSection />
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <ExploreSection />
      </main>
      <Footer />
    </div>
  )
}
