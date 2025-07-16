'use client'

import { useChat } from '@/hooks/useChat'
import { useConversationInit } from '@/hooks/useConversationInit'
import { ChatLayout } from '@/components/layout/ChatLayout'
import { ConversationList } from '@/components/chat/ConversationList'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'

export default function ChatApp() {
  // Inicializar conversaciones al cargar la aplicación
  const { isLoaded } = useConversationInit()

  const {
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
  } = useChat()

  // Mostrar un loader mientras se cargan las conversaciones
  if (!isLoaded) {
    return (
      <main className="h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading conversations...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen bg-background text-foreground">
      <ChatLayout
        sidebar={
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversation?.id || null}
            onCreateNewChat={handleCreateNewChat}
            onSelectConversation={setCurrentConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        }
        content={
          <ChatWindow
            conversation={currentConversation}
            isLoading={isLoading}
          />
        }
        input={
          <ChatInput
            value={inputValue}
            onChange={handleInputChange}
            onSend={handleSendMessage}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
        }
        onCreateNewChat={handleCreateNewChat}
      />
    </main>
  )
}
