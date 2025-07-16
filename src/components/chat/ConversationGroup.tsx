import React from 'react'
import { Conversation } from '@/lib/types/chat'

interface ConversationGroupProps {
  title: string
  conversations: Conversation[]
  currentConversationId: string | null
  onSelectConversation: (id: string) => void
  onDeleteConversation?: (conversation: Conversation) => void
  renderConversationItem: (
    conversation: Conversation,
    isActive: boolean
  ) => React.ReactNode
}

export const ConversationGroup = ({
  title,
  conversations,
  currentConversationId,
  renderConversationItem
}: ConversationGroupProps) => {
  if (conversations.length === 0) return null

  return (
    <div className="mb-4">
      <h3 className="px-2 mb-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-1">
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            {renderConversationItem(
              conversation,
              conversation.id === currentConversationId
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const groupConversationsByDate = (conversations: Conversation[]) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const groups = {
    today: [] as Conversation[],
    yesterday: [] as Conversation[],
    lastWeek: [] as Conversation[],
    lastMonth: [] as Conversation[],
    older: [] as Conversation[]
  }

  conversations.forEach((conversation) => {
    const conversationDate = new Date(
      conversation.updatedAt.getFullYear(),
      conversation.updatedAt.getMonth(),
      conversation.updatedAt.getDate()
    )

    if (conversationDate.getTime() === today.getTime()) {
      groups.today.push(conversation)
    } else if (conversationDate.getTime() === yesterday.getTime()) {
      groups.yesterday.push(conversation)
    } else if (conversationDate >= lastWeek) {
      groups.lastWeek.push(conversation)
    } else if (conversationDate >= lastMonth) {
      groups.lastMonth.push(conversation)
    } else {
      groups.older.push(conversation)
    }
  })

  return [
    { title: 'Today', conversations: groups.today },
    { title: 'Yesterday', conversations: groups.yesterday },
    { title: 'Last 7 days', conversations: groups.lastWeek },
    { title: 'Last 30 days', conversations: groups.lastMonth },
    { title: 'Older', conversations: groups.older }
  ].filter((group) => group.conversations.length > 0)
}
