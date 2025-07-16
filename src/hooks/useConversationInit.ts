'use client'

import { useEffect, useState } from 'react'
import { useChatStore } from '@/lib/store/useChatStore'

export const useConversationInit = () => {
  const { loadConversations, isLoaded } = useChatStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Solo cargar conversaciones cuando estemos en el cliente
    if (typeof window !== 'undefined' && !isLoaded && !isInitialized) {
      setIsInitialized(true)
      loadConversations()
    }
  }, [loadConversations, isLoaded, isInitialized])

  // Devolver true solo cuando estemos en el cliente y hayamos cargado
  return {
    isLoaded: typeof window !== 'undefined' ? isLoaded : false
  }
}
