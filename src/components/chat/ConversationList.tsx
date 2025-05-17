import { Conversation } from '@/lib/types/chat'

interface ConversationListProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onCreateNewChat: () => void
  onSelectConversation: (id: string) => void
}

// Ocultamos este componente ya que no aparece en la imagen mostrada
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ConversationList = (props: ConversationListProps) => null
