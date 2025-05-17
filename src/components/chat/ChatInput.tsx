import { FiSend, FiLoader } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  isLoading?: boolean
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  isLoading = false
}: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-sidebar-border/10 bg-sidebar">
      <div className="relative flex w-full items-center rounded-full border border-sidebar-border/20 bg-sidebar-accent/30 px-4 py-2">
        <input
          type="text"
          className="flex-1 bg-transparent text-sm text-sidebar-foreground outline-none placeholder:text-sidebar-foreground/50"
          placeholder="Tell me what do you want..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Chat input"
          disabled={isLoading}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onSend}
          aria-label="Send message"
          className="ml-2 text-sidebar-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <FiLoader className="h-4 w-4 animate-spin" />
          ) : (
            <FiSend className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
