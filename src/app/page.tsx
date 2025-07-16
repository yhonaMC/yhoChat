'use client'

import dynamic from 'next/dynamic'
import { GeminiProvider } from '@/lib/context/GeminiContext'
import { GEMINI_CONFIG } from '@/lib/config/gemini'

// Importar dinámicamente el componente principal sin SSR
const ChatApp = dynamic(() => import('../app/ChatApp'), {
  ssr: false,
  loading: () => (
    <main className="h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground/60">Loading YHOCHAT...</p>
      </div>
    </main>
  )
})

export default function Home() {
  return (
    <GeminiProvider
      apiKey={GEMINI_CONFIG.API_KEY || ''}
      modelName={GEMINI_CONFIG.MODEL_NAME}
    >
      <ChatApp />
    </GeminiProvider>
  )
}
