'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CriarPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    user_email: '',
    slug: '',
    partner_name: '',
    phrases: ['', '', '', '', ''],
  })
  
  const [files, setFiles] = useState({
    photos: [],
    music: null
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('valentineDraft')
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch(e) {}
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('valentineDraft', JSON.stringify(formData))
  }, [formData])

  const handlePhraseChange = (index, value) => {
    const newPhrases = [...formData.phrases]
    newPhrases[index] = value
    setFormData(f => ({ ...f, phrases: newPhrases }))
  }

  const handleSlugChange = (e) => {
    // Regex: only lowercase, hyphens, numbers
    let val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (val.length > 20) val = val.substring(0, 20)
    setFormData(f => ({ ...f, slug: val }))
  }

  const handleFileChange = (e, type) => {
    if (type === 'photos') {
      // Limite de 6 fotos (exemplo)
      const selected = Array.from(e.target.files).slice(0, 6)
      setFiles(f => ({ ...f, photos: selected }))
    } else {
      setFiles(f => ({ ...f, music: e.target.files[0] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.user_email || !formData.slug || !formData.partner_name) {
      setError('Preencha os campos obrigatórios (Email, Link e Nome)')
      return
    }

    setLoading(true)

    try {
      // 1. Fazer upload dos arquivos para o S3 (simulado aqui, real via API)
      const formDataUpload = new FormData()
      files.photos.forEach(file => formDataUpload.append('photos', file))
      if (files.music) formDataUpload.append('music', files.music)
      
      formDataUpload.append('user_email', formData.user_email)
      formDataUpload.append('slug', formData.slug)
      formDataUpload.append('partner_name', formData.partner_name)
      formDataUpload.append('phrases', JSON.stringify(formData.phrases))

      const res = await fetch('/api/pages', {
        method: 'POST',
        body: formDataUpload
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao criar a página')
      }

      // Sucesso! Vai para o preview
      router.push(`/preview/${formData.slug}`)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-6 md:p-10 shadow-xl border border-slate-800">
        <h1 className="text-3xl font-bold mb-2 text-rose-500">Crie sua Surpresa</h1>
        <p className="text-slate-400 mb-8">Preencha os dados abaixo para gerar a página.</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-slate-800 pb-2">Informações Básicas</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Seu E-mail *</label>
              <input 
                type="email" 
                required
                value={formData.user_email}
                onChange={e => setFormData(f => ({ ...f, user_email: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="seu@email.com (para enviarmos o link final)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Escolha o seu link (Slug) *</label>
              <div className="flex items-center">
                <span className="bg-slate-800 border border-slate-700 border-r-0 rounded-l-lg px-4 py-2 text-slate-400">
                  /p/
                </span>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={handleSlugChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-r-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
                  placeholder="nome-do-casal"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Apenas letras minúsculas, números e hífens. Máx 20 caracteres.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nome do(a) Parceiro(a) *</label>
              <input 
                type="text" 
                required
                value={formData.partner_name}
                onChange={e => setFormData(f => ({ ...f, partner_name: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Ex: Matilde"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold border-b border-slate-800 pb-2">Mensagens da Cartinha</h2>
            <p className="text-sm text-slate-400">Escreva até 5 frases para a carta de amor.</p>
            
            {formData.phrases.map((phrase, i) => (
              <input 
                key={i}
                type="text" 
                value={phrase}
                onChange={e => handlePhraseChange(i, e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder={`Frase ${i + 1}`}
              />
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold border-b border-slate-800 pb-2">Mídias (Opcional)</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fotos (Máx 6 imagens)</label>
              <input 
                type="file" 
                accept="image/*"
                multiple
                onChange={e => handleFileChange(e, 'photos')}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-rose-500 file:text-white hover:file:bg-rose-600"
              />
              <p className="text-xs text-slate-500 mt-1">{files.photos.length} foto(s) selecionada(s)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Música de Fundo (MP3)</label>
              <input 
                type="file" 
                accept="audio/*"
                onChange={e => handleFileChange(e, 'music')}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-rose-500 file:text-white hover:file:bg-rose-600"
              />
              <p className="text-xs text-slate-500 mt-1">{files.music ? files.music.name : 'Nenhuma música selecionada'}</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 transition-colors py-4 rounded-xl font-bold text-lg shadow-lg shadow-rose-500/30"
          >
            {loading ? 'Processando e Salvando...' : 'Ver Preview e Finalizar'}
          </button>
        </form>
      </div>
    </div>
  )
}
