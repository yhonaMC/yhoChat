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
    setCurrentConversation,
    deleteConversation
  } = useChatStore()
  const { geminiService, isInitialized } = useGemini()

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

    if (!currentConversationId) {
      createNewConversation()
    }

    addMessage(inputValue, 'user')
    setInputValue('')
    setIsLoading(true)

    try {
      const history = getChatHistory()

      history.push({
        role: 'user',
        content: inputValue
      })

      const response = await geminiService.generateChatResponse(history)

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
    // Only clear current conversation, don't create new one until user types something
    setCurrentConversation('')
  }, [setCurrentConversation])

  const handleDeleteConversation = useCallback(
    (id: string) => {
      deleteConversation(id)
    },
    [deleteConversation]
  )

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
    handleDeleteConversation,
    handleKeyDown,
    setCurrentConversation
  }
}
