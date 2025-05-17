import { Part } from '@google/generative-ai'

export interface GeminiResponse {
  text: string
  response?: unknown
}

export interface GeminiStreamResponse {
  text: string
  isComplete: boolean
}

export interface GeminiConfig {
  apiKey: string
  modelName: string
}

export type MessageRole = 'user' | 'model' | 'assistant'

export interface GeminiMessage {
  role: MessageRole
  parts: string | Part | (string | Part)[]
}

export interface ChatHistoryEntry {
  role: MessageRole
  content: string | Part | (string | Part)[]
}

export interface GeminiServiceInterface {
  initialize: (config: GeminiConfig) => void
  generateContent: (prompt: string) => Promise<GeminiResponse>
  generateContentStream: (
    prompt: string
  ) => AsyncGenerator<GeminiStreamResponse, void, unknown>
  generateChatResponse: (history: ChatHistoryEntry[]) => Promise<GeminiResponse>
  generateChatResponseStream: (
    history: ChatHistoryEntry[]
  ) => AsyncGenerator<GeminiStreamResponse, void, unknown>
}

export interface GeminiConfigProviderProps {
  apiKey: string
  modelName?: string
  children: React.ReactNode
}

export interface GeminiContextType {
  geminiService: GeminiServiceInterface | null
  isInitialized: boolean
  apiKey: string
  modelName: string
}
