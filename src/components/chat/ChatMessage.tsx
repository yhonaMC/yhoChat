import { Message } from '@/lib/types/chat'
import { cn } from '@/lib/utils'
import { FormattedMessage } from './FormattedMessage'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-4',
        isUser ? 'bg-muted/50' : 'bg-background'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-primary' : 'bg-sidebar-primary'
        )}
      >
        {isUser ? (
          <span className="text-xs font-semibold text-primary-foreground">
            U
          </span>
        ) : (
          <span className="text-xs font-semibold text-sidebar-primary-foreground">
            A
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isUser ? 'You' : 'Assistant'}
        </div>
        {isUser ? (
          <div className="text-sm text-foreground whitespace-pre-wrap">
            {message.content}
          </div>
        ) : (
          <FormattedMessage content={message.content} />
        )}
      </div>
    </div>
  )
}
