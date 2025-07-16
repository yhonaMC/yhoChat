'use client'

import { useState, useCallback, useEffect } from 'react'

export interface UseSidebarConfig {
  defaultOpen?: boolean
  breakpoint?: number
  persistState?: boolean
  storageKey?: string
  autoCloseOnMobile?: boolean
}

interface UseSidebarReturn {
  isOpen: boolean
  isMobile: boolean
  toggle: () => void
  open: () => void
  close: () => void
  setIsOpen: (open: boolean) => void
}

export const useSidebar = (config: UseSidebarConfig = {}): UseSidebarReturn => {
  const {
    defaultOpen = true,
    breakpoint = 768,
    persistState = true,
    storageKey = 'sidebar-state',
    autoCloseOnMobile = false
  } = config

  const [isOpen, setIsOpenState] = useState(defaultOpen)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < breakpoint
      const wasMobile = isMobile
      setIsMobile(mobile)

      // Solo cerrar automáticamente si está configurado y cambiamos a móvil
      if (autoCloseOnMobile && mobile && !wasMobile && isOpen) {
        setIsOpenState(false)
      }
    }

    // Verificar al montar
    checkScreenSize()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint, isOpen, isMobile, autoCloseOnMobile])

  // Cargar estado desde localStorage
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const savedState = localStorage.getItem(storageKey)
      if (savedState !== null) {
        const parsedState = JSON.parse(savedState)
        // En móvil, empezar cerrado por defecto para mejor UX
        if (window.innerWidth < breakpoint) {
          setIsOpenState(false)
        } else {
          setIsOpenState(parsedState)
        }
      }
    }
  }, [persistState, storageKey, breakpoint])

  // Guardar estado en localStorage
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(isOpen))
    }
  }, [isOpen, persistState, storageKey])

  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open)
  }, [])

  const toggle = useCallback(() => {
    setIsOpenState((prev) => !prev)
  }, [])

  const open = useCallback(() => {
    setIsOpenState(true)
  }, [])

  const close = useCallback(() => {
    setIsOpenState(false)
  }, [])

  // Cerrar sidebar con Escape en móvil
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobile && isOpen) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobile, isOpen, close])

  return {
    isOpen,
    isMobile,
    toggle,
    open,
    close,
    setIsOpen
  }
}
