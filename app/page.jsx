'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Sparkles, Gift, Share2, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05000a] text-slate-100 overflow-x-hidden selection:bg-pink-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            <span className="font-serif text-2xl tracking-wide font-bold text-white">
              Valentine<span className="text-pink-500">SaaS</span>
            </span>
          </div>
          <Link href="/criar">
            <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium transition-all">
              Acessar
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Surpreenda quem você ama neste dia especial</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Eternize a sua história de amor em uma <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 font-serif italic pr-2">
              experiência única.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 font-light">
            Crie uma página interativa personalizada com fotos, músicas e mensagens exclusivas. Envie o link e faça o coração do seu parceiro(a) bater mais forte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/criar">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2">
                Criar Surpresa Agora
                <Heart className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-24 px-6 relative z-10 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Como Funciona?</h2>
            <p className="text-slate-400 text-lg">Em menos de 3 minutos você cria uma memória eterna.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: "1. Personalize",
                desc: "Faça upload de fotos marcantes, escolha uma música que define vocês e escreva frases especiais.",
                color: "text-pink-400",
                bg: "bg-pink-500/10"
              },
              {
                icon: Star,
                title: "2. Visualize grátis",
                desc: "Veja como a página ficou na mesma hora. Se gostar do resultado, faça o pagamento único para liberar.",
                color: "text-purple-400",
                bg: "bg-purple-500/10"
              },
              {
                icon: Share2,
                title: "3. Surpreenda",
                desc: "Envie o link exclusivo para o seu amor e prepare-se para a reação emocionante.",
                color: "text-rose-400",
                bg: "bg-rose-500/10"
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-6`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#030005]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ValentineSaaS. Feito com muito ❤️.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
