import React from 'react'
import { cn } from '@/lib/utils'

interface BackdropProps {
  isVisible: boolean
  onClick: () => void
  className?: string
  zIndex?: number
}

export const Backdrop = ({
  isVisible,
  onClick,
  className,
  zIndex = 40
}: BackdropProps) => {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
        'md:hidden', // Solo visible en móvil
        className
      )}
      style={{ zIndex }}
      onClick={onClick}
      aria-hidden="true"
    />
  )
}
