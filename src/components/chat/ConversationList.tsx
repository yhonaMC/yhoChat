import { Conversation } from '@/lib/types/chat'

interface ConversationListProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onCreateNewChat: () => void
  onSelectConversation: (id: string) => void
}

export const ConversationList = (props: ConversationListProps) => {
  return null
}
