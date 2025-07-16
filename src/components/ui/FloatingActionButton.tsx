import React from 'react'
import { Button } from './Button'
import { FiPlus } from 'react-icons/fi'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  onClick: () => void
  isVisible?: boolean
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const FloatingActionButton = ({
  onClick,
  isVisible = true,
  label = 'New Chat',
  className,
  size = 'md'
}: FloatingActionButtonProps) => {
  if (!isVisible) return null

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16'
  }

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7'
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        // Posicionamiento fijo
        'fixed bottom-6 right-6 z-40',
        // Estilo
        'rounded-full shadow-lg shadow-primary/25',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30',
        'active:scale-95',
        // Transiciones
        'transition-all duration-200 ease-in-out',
        // Solo visible en móvil
        'md:hidden',
        // Tamaño
        sizeClasses[size],
        className
      )}
      aria-label={label}
      size="icon"
    >
      <FiPlus
        className={cn(
          iconSizes[size],
          'transition-transform group-hover:rotate-90'
        )}
      />
    </Button>
  )
}
