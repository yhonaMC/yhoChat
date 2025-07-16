'use client'

import { useState, useCallback } from 'react'

interface ConfirmDialogState {
  isOpen: boolean
  title: string
  description: string
  onConfirm: () => void | Promise<void>
  variant?: 'danger' | 'warning' | 'info'
  confirmText?: string
  cancelText?: string
}

export const useConfirmDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const showConfirmDialog = useCallback(
    (config: Omit<ConfirmDialogState, 'isOpen'>) => {
      setDialogState({
        ...config,
        isOpen: true
      })
    },
    []
  )

  const closeDialog = useCallback(() => {
    setDialogState(null)
    setIsLoading(false)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!dialogState) return

    setIsLoading(true)

    try {
      await dialogState.onConfirm()
      closeDialog()
    } catch (error) {
      console.error('Error during confirmation action:', error)
      setIsLoading(false)
    }
  }, [dialogState, closeDialog])

  const confirmDeleteConversation = useCallback(
    (conversationTitle: string, onDelete: () => void | Promise<void>) => {
      showConfirmDialog({
        title: 'Delete Conversation',
        description: `Are you sure you want to delete "${conversationTitle}"? This action cannot be undone.`,
        onConfirm: onDelete,
        variant: 'danger',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      })
    },
    [showConfirmDialog]
  )

  return {
    dialogState,
    isLoading,
    showConfirmDialog,
    closeDialog,
    handleConfirm,
    confirmDeleteConversation
  }
}
