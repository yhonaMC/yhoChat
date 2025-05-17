import { create } from 'zustand'
import { Conversation, Message } from '../types/chat'
import { v4 as uuidv4 } from 'uuid'

interface ChatState {
  conversations: Conversation[]
  currentConversationId: string | null
  addMessage: (content: string, role: 'user' | 'assistant') => void
  createNewConversation: () => void
  setCurrentConversation: (id: string) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversationId: null,

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
  },

  setCurrentConversation: (id: string) => {
    set({ currentConversationId: id })
  }
}))
