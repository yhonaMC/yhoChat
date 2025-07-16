import { Conversation } from '../types/chat'

interface ConversationStorage {
  saveConversations: (conversations: Conversation[]) => void
  loadConversations: () => Conversation[]
  clearConversations: () => void
}

interface SerializedMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface SerializedConversation {
  id: string
  title: string
  messages: SerializedMessage[]
  createdAt: string
  updatedAt: string
}

class LocalStorageConversationService implements ConversationStorage {
  private readonly STORAGE_KEY = 'yhochat_conversations'

  saveConversations(conversations: Conversation[]): void {
    try {
      // Serializar las fechas correctamente
      const serializedConversations: SerializedConversation[] =
        conversations.map((conv) => ({
          ...conv,
          createdAt: conv.createdAt.toISOString(),
          updatedAt: conv.updatedAt.toISOString(),
          messages: conv.messages.map((msg) => ({
            ...msg,
            timestamp: msg.timestamp.toISOString()
          }))
        }))

      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(serializedConversations)
      )
    } catch (error) {
      console.error('Error saving conversations to localStorage:', error)
    }
  }

  loadConversations(): Conversation[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed: SerializedConversation[] = JSON.parse(stored)

      // Deserializar las fechas correctamente
      return parsed.map((conv: SerializedConversation) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: SerializedMessage) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
    } catch (error) {
      console.error('Error loading conversations from localStorage:', error)
      return []
    }
  }

  clearConversations(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing conversations from localStorage:', error)
    }
  }
}

// Singleton instance
export const conversationStorageService = new LocalStorageConversationService()

// Exportar la interfaz para testing y dependency injection
export type { ConversationStorage }
