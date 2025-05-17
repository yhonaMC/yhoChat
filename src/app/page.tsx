'use client'

import { useChat } from '@/hooks/useChat'
import { ChatLayout } from '@/components/layout/ChatLayout'
import { ConversationList } from '@/components/chat/ConversationList'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { GeminiProvider } from '@/lib/context/GeminiContext'
import { GEMINI_CONFIG } from '@/lib/config/gemini'

export default function Home() {
  return (
    <GeminiProvider
      apiKey={GEMINI_CONFIG.API_KEY}
      modelName={GEMINI_CONFIG.MODEL_NAME}
    >
      <ChatApp />
    </GeminiProvider>
  )
}

function ChatApp() {
  const {
    inputValue,
    isLoading,
    conversations,
    currentConversation,
    handleInputChange,
    handleSendMessage,
    handleCreateNewChat,
    handleKeyDown,
    setCurrentConversation
  } = useChat()

  return (
    <main className="h-screen bg-background text-foreground">
      <ChatLayout
        sidebar={
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversation?.id || null}
            onCreateNewChat={handleCreateNewChat}
            onSelectConversation={setCurrentConversation}
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
      />
    </main>
  )
}
