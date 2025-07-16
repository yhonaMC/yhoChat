import { create } from 'zustand'
import { Conversation, Message } from '../types/chat'
import { v4 as uuidv4 } from 'uuid'
import { conversationStorageService } from '../services/conversationStorage'

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  isLoaded: boolean
  addMessage: (content: string, role: 'user' | 'assistant') => void
  createNewConversation: () => void
  setCurrentConversation: (id: string) => void
  deleteConversation: (id: string) => void
  updateConversationTitle: (id: string, title: string) => void
  generateTitleFromFirstMessage: (id: string) => void
  loadConversations: () => void
  saveConversations: () => void
}

const generateTitleFromMessage = (message: string): string => {
  // Generar un título basado en las primeras palabras del mensaje
  const words = message.trim().split(' ').slice(0, 4)
  return words.length > 0
    ? words.join(' ') + (message.split(' ').length > 4 ? '...' : '')
    : 'New Chat'
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversationId: null,
  isLoaded: false,

  addMessage: (content: string, role: 'user' | 'assistant') => {
    const { currentConversationId, conversations } = get()

    if (!currentConversationId) return

    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    }

    set({
      conversations: conversations.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              updatedAt: new Date()
            }
          : conv
      )
    })

    // Auto-generar título si es el primer mensaje del usuario
    const currentConv = conversations.find(
      (c) => c.id === currentConversationId
    )
    if (currentConv && currentConv.messages.length === 0 && role === 'user') {
      get().generateTitleFromFirstMessage(currentConversationId)
    }

    // Guardar automáticamente después de agregar mensaje
    setTimeout(() => get().saveConversations(), 100)
  },

  createNewConversation: () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversationId: newConversation.id
    }))

    // Guardar automáticamente después de crear conversación
    setTimeout(() => get().saveConversations(), 100)
  },

  setCurrentConversation: (id: string) => {
    set({ currentConversationId: id })
  },

  deleteConversation: (id: string) => {
    const { conversations, currentConversationId } = get()

    const filteredConversations = conversations.filter((conv) => conv.id !== id)

    // Si eliminamos la conversación actual, seleccionar otra o limpiar
    const newCurrentId =
      currentConversationId === id
        ? filteredConversations.length > 0
          ? filteredConversations[0].id
          : null
        : currentConversationId

    set({
      conversations: filteredConversations,
      currentConversationId: newCurrentId
    })

    // Guardar automáticamente después de eliminar conversación
    setTimeout(() => get().saveConversations(), 100)
  },

  updateConversationTitle: (id: string, title: string) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, title } : conv
      )
    }))

    // Guardar automáticamente después de actualizar título
    setTimeout(() => get().saveConversations(), 100)
  },

  generateTitleFromFirstMessage: (id: string) => {
    const { conversations } = get()
    const conversation = conversations.find((conv) => conv.id === id)

    if (conversation && conversation.messages.length > 0) {
      const firstUserMessage = conversation.messages.find(
        (msg) => msg.role === 'user'
      )
      if (firstUserMessage) {
        const title = generateTitleFromMessage(firstUserMessage.content)
        get().updateConversationTitle(id, title)
      }
    }
  },

  loadConversations: () => {
    try {
      const loadedConversations = conversationStorageService.loadConversations()
      set({
        conversations: loadedConversations,
        isLoaded: true,
        currentConversationId:
          loadedConversations.length > 0 ? loadedConversations[0].id : null
      })
    } catch (error) {
      console.error('Error loading conversations:', error)
      set({ isLoaded: true })
    }
  },

  saveConversations: () => {
    const { conversations } = get()
    try {
      conversationStorageService.saveConversations(conversations)
    } catch (error) {
      console.error('Error saving conversations:', error)
    }
  }
}))
