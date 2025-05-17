'use client'

import { useState, useCallback } from 'react'
import { useChatStore } from '@/lib/store/useChatStore'
import { useGemini } from '@/lib/context/GeminiContext'
import { ChatHistoryEntry } from '@/lib/types/gemini'

export const useChat = () => {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    conversations,
    currentConversationId,
    addMessage,
    createNewConversation,
    setCurrentConversation
  } = useChatStore()
  const { geminiService, isInitialized } = useGemini()

  // Convertir las conversaciones al formato que espera la API de Gemini
  const getChatHistory = useCallback(() => {
    if (!currentConversationId) return []

    const currentConversation = conversations.find(
      (conv) => conv.id === currentConversationId
    )
    if (!currentConversation) return []

    return currentConversation.messages.map((message) => ({
      role: message.role === 'user' ? 'user' : 'assistant',
      content: message.content
    })) as ChatHistoryEntry[]
  }, [conversations, currentConversationId])

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || !isInitialized || !geminiService) return

    // Si no hay una conversación activa, crear una nueva
    if (!currentConversationId) {
      createNewConversation()
    }

    // Añadir el mensaje del usuario al estado
    addMessage(inputValue, 'user')
    setInputValue('')
    setIsLoading(true)

    try {
      // Obtener el historial de chat actual
      const history = getChatHistory()

      // Añadir el mensaje del usuario actual
      history.push({
        role: 'user',
        content: inputValue
      })

      // Solicitar respuesta a Gemini
      const response = await geminiService.generateChatResponse(history)
      // Añadir la respuesta al estado
      addMessage(response.text, 'assistant')
    } catch (error) {
      console.error('Error al generar respuesta:', error)
      addMessage(
        'Lo siento, ha ocurrido un error al procesar tu solicitud.',
        'assistant'
      )
    } finally {
      setIsLoading(false)
    }
  }, [
    inputValue,
    isInitialized,
    geminiService,
    currentConversationId,
    createNewConversation,
    addMessage,
    getChatHistory
  ])

  const handleCreateNewChat = useCallback(() => {
    createNewConversation()
  }, [createNewConversation])

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  )

  return {
    inputValue,
    isLoading,
    conversations,
    currentConversation,
    handleInputChange,
    handleSendMessage,
    handleCreateNewChat,
    handleKeyDown,
    setCurrentConversation
  }
}
