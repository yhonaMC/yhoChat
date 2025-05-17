import { useEffect, useMemo, useRef } from 'react'
import { Conversation } from '@/lib/types/chat'
import { ChatMessage } from './ChatMessage'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { ChatLoadingIndicator } from '@/components/ui/LoadingIndicator'

interface ChatWindowProps {
  conversation: Conversation | undefined
  isLoading?: boolean
}

export const ChatWindow = ({
  conversation,
  isLoading = false
}: ChatWindowProps) => {
  const messages = useMemo(() => conversation?.messages || [], [conversation])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, isLoading])

  return (
    <div className="relative flex h-full flex-col bg-background">
      {messages.length > 0 ? (
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="flex flex-col divide-y">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <ChatLoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sidebar-primary text-lg font-bold">
            Y
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Welcome to Yhochat!
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Yhochat is your personal AI-powered assistant, ready to help you
            navigate your day and provide valuable insights. We&apos;re here to
            make your life easier. Let&apos;s get started on this exciting
            journey together!
          </p>
        </div>
      )}
    </div>
  )
}
