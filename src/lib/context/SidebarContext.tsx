'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useSidebar, UseSidebarConfig } from '@/hooks/useSidebar'

interface SidebarContextType {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  open: () => void
  close: () => void
  setIsOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode
  config?: UseSidebarConfig
}

export const SidebarProvider = ({ children, config }: SidebarProviderProps) => {
  const sidebarState = useSidebar(config)

  return (
    <SidebarContext.Provider value={sidebarState}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

// Hook alternativo que no requiere Provider (usa hook directo)
export { useSidebar as useSidebarDirect }
