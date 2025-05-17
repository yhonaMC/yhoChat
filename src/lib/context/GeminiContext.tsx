'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { GeminiConfigProviderProps, GeminiContextType } from '../types/gemini'
import { GeminiService } from '../services/GeminiService'

const defaultContextValue: GeminiContextType = {
  geminiService: null,
  isInitialized: false,
  apiKey: '',
  modelName: 'gemini-2.0-flash-001'
}

const GeminiContext = createContext<GeminiContextType>(defaultContextValue)

export const useGemini = () => useContext(GeminiContext)

export const GeminiProvider: React.FC<GeminiConfigProviderProps> = ({
  apiKey,
  modelName = 'gemini-2.0-flash-001',
  children
}) => {
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!apiKey) {
      console.error('API key is required for Gemini')
      return
    }

    try {
      const service = new GeminiService()
      service.initialize({ apiKey, modelName })
      setGeminiService(service)
      setIsInitialized(true)
    } catch (error) {
      console.error('Failed to initialize Gemini service:', error)
    }
  }, [apiKey, modelName])

  return (
    <GeminiContext.Provider
      value={{
        geminiService,
        isInitialized,
        apiKey,
        modelName
      }}
    >
      {children}
    </GeminiContext.Provider>
  )
}
