import React, { useState, useEffect } from 'react'
import { Conversation } from '@/lib/types/chat'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import {
  ConversationGroup,
  groupConversationsByDate
} from './ConversationGroup'
import { FiPlus, FiMessageSquare, FiTrash2 } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'

interface ConversationListProps {
  conversations: Conversation[]
  currentConversationId: string | null
  onCreateNewChat: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation?: (id: string) => void
}

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onSelect: () => void
  onDelete?: () => void
}

const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onDelete
}: ConversationItemProps) => {
  const [showActions, setShowActions] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Asegurar que el componente se hidrate correctamente
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.()
  }

  const formatDate = (date: Date) => {
    // Solo formatear fechas en el cliente para evitar diferencias de hidratación
    if (!isClient) return ''

    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getLastMessage = () => {
    if (conversation.messages.length === 0) return 'No messages yet'
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    return lastMessage.content.length > 50
      ? lastMessage.content.substring(0, 50) + '...'
      : lastMessage.content
  }

  return (
    <div
      className={cn(
        'group relative p-3 rounded-lg cursor-pointer transition-all duration-200 border',
        isActive
          ? 'bg-sidebar-accent border-sidebar-primary/20 shadow-sm'
          : 'bg-transparent border-transparent hover:bg-sidebar-accent/50 hover:border-sidebar-border/10'
      )}
      onClick={onSelect}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      role="button"
      tabIndex={0}
      aria-label={`Select conversation: ${conversation.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 transition-colors',
            isActive
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'bg-sidebar-primary/10 text-sidebar-primary'
          )}
        >
          <FiMessageSquare className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3
              className={cn(
                'font-medium text-sm truncate transition-colors',
                isActive
                  ? 'text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground'
              )}
            >
              {conversation.title}
            </h3>

            {showActions && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-sidebar-foreground/60 hover:text-red-500"
                onClick={handleDelete}
                aria-label="Delete conversation"
              >
                <FiTrash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          <p className="text-xs text-sidebar-foreground/60 truncate mt-1">
            {getLastMessage()}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-sidebar-foreground/40">
              {formatDate(conversation.updatedAt)}
            </span>

            {conversation.messages.length > 0 && (
              <span className="text-xs text-sidebar-foreground/40">
                {conversation.messages.length} msg
                {conversation.messages.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ConversationList = ({
  conversations,
  currentConversationId,
  onCreateNewChat,
  onSelectConversation,
  onDeleteConversation
}: ConversationListProps) => {
  const [isClient, setIsClient] = useState(false)
  const {
    dialogState,
    isLoading: isDeleting,
    closeDialog,
    handleConfirm,
    confirmDeleteConversation
  } = useConfirmDialog()

  // Asegurar que el componente se hidrate correctamente
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDeleteConversation = (conversation: Conversation) => {
    if (!onDeleteConversation) return

    confirmDeleteConversation(conversation.title, () =>
      onDeleteConversation(conversation.id)
    )
  }

  // Solo agrupar conversaciones en el cliente para evitar diferencias de hidratación
  const conversationGroups = isClient
    ? groupConversationsByDate(conversations)
    : []

  const renderConversationItem = (
    conversation: Conversation,
    isActive: boolean
  ) => (
    <ConversationItem
      conversation={conversation}
      isActive={isActive}
      onSelect={() => onSelectConversation(conversation.id)}
      onDelete={
        onDeleteConversation
          ? () => handleDeleteConversation(conversation)
          : undefined
      }
    />
  )

  return (
    <div className="flex flex-col h-full">
      {/* New Chat Button */}
      <div className="p-4 border-b border-sidebar-border/10">
        <Button
          onClick={onCreateNewChat}
          className="w-full justify-start gap-3 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          aria-label="Create new chat"
        >
          <FiPlus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center">
            <div className="flex flex-col items-center gap-3 text-sidebar-foreground/60">
              <FiMessageSquare className="h-8 w-8" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs">Start a new chat to begin</p>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {isClient &&
              conversationGroups.map((group) => (
                <ConversationGroup
                  key={group.title}
                  title={group.title}
                  conversations={group.conversations}
                  currentConversationId={currentConversationId}
                  onSelectConversation={onSelectConversation}
                  renderConversationItem={renderConversationItem}
                />
              ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {conversations.length > 0 && (
        <div className="p-4 border-t border-sidebar-border/10">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            {conversations.length} conversation
            {conversations.length !== 1 ? 's' : ''} total
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {dialogState && (
        <ConfirmDialog
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          onConfirm={handleConfirm}
          title={dialogState.title}
          description={dialogState.description}
          confirmText={dialogState.confirmText}
          cancelText={dialogState.cancelText}
          variant={dialogState.variant}
          isLoading={isDeleting}
        />
      )}
    </div>
  )
}
