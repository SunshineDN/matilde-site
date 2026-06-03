import { Outfit, Great_Vibes, Press_Start_2P } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
})

const pressStart2p = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
})

export const metadata = {
  title: 'Valentine SaaS',
  description: 'Crie uma página inesquecível para o seu amor.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${greatVibes.variable} ${pressStart2p.variable}`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950 selection:bg-rose-500/30">
        {children}
      </body>
    </html>
  )
}
