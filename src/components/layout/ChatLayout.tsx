import { ReactNode } from 'react'
import {
  FiSettings,
  FiMenu,
  FiHelpCircle,
  FiInfo,
  FiFileText,
  FiX,
  FiPlus
} from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { Backdrop } from '@/components/ui/Backdrop'
import { FloatingActionButton } from '@/components/ui/FloatingActionButton'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/lib/utils'

interface ChatLayoutProps {
  sidebar: ReactNode
  content: ReactNode
  input: ReactNode
  onCreateNewChat?: () => void
}

export const ChatLayout = ({
  sidebar,
  content,
  input,
  onCreateNewChat
}: ChatLayoutProps) => {
  const { isOpen, isMobile, toggle, close } = useSidebar({
    defaultOpen: false, // En móvil empezar cerrado para mejor UX
    breakpoint: 768,
    persistState: true,
    storageKey: 'yhochat-sidebar',
    autoCloseOnMobile: false // No cerrar automáticamente
  })

  const handleNewChatClick = () => {
    onCreateNewChat?.()
    // En móvil, cerrar sidebar después de crear nueva conversación
    if (isMobile) {
      close()
    }
  }

  return (
    <div className="flex h-screen flex-col md:flex-row relative">
      {/* Backdrop para móvil */}
      <Backdrop isVisible={isMobile && isOpen} onClick={close} />

      {/* Sidebar */}
      <div
        className={cn(
          'flex flex-col bg-sidebar transition-all duration-300 ease-in-out',
          // Desktop: ancho fijo o colapsado
          'md:relative md:h-full',
          isOpen ? 'md:w-80' : 'md:w-0 md:overflow-hidden',
          // Mobile: overlay con animación de slide
          'fixed inset-y-0 left-0 z-50 w-80',
          'md:z-auto md:static md:inset-auto',
          isMobile
            ? isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'translate-x-0'
        )}
      >
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
              <span className="text-lg font-bold text-sidebar-primary-foreground">
                Y
              </span>
            </div>
            <div className="font-semibold text-sidebar-foreground">YHOCHAT</div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón cerrar en móvil */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground h-8 w-8 md:hidden"
                onClick={close}
                aria-label="Close sidebar"
              >
                <FiX className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Navegación fija */}
        <div className="mt-4 px-4">
          <h2 className="mb-2 text-xs font-semibold text-sidebar-foreground/70">
            TODAY
          </h2>
          <div className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-md bg-sidebar-accent p-3 text-left text-sm font-medium text-sidebar-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                <FiHelpCircle className="h-4 w-4" />
              </div>
              <span>Get Started</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                <FiInfo className="h-4 w-4" />
              </div>
              <span>How it works?</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                <FiFileText className="h-4 w-4" />
              </div>
              <span>About Yhochat</span>
            </button>
          </div>
        </div>

        {/* Contenido del sidebar (conversaciones) */}
        <div className="flex-1 overflow-auto">{sidebar}</div>

        {/* Footer del sidebar */}
        <div className="mt-auto border-t border-sidebar-border/10 p-2">
          <button className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
              <FiFileText className="h-4 w-4" />
            </div>
            <span>FAQ</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
              <FiSettings className="h-4 w-4" />
            </div>
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex flex-1 flex-col bg-background min-w-0">
        {/* Header del chat con botón de menú */}
        <div className="flex items-center justify-between p-4 border-b border-border/10 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground h-10 w-10"
              onClick={toggle}
              aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <FiMenu className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-lg font-semibold text-foreground">YHOCHAT</h1>
              <p className="text-sm text-muted-foreground">AI Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Botón New Chat en el header para móvil */}
            {isMobile && onCreateNewChat && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewChatClick}
                className="md:hidden"
                aria-label="Create new chat"
              >
                <FiPlus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            )}

            {/* Indicador de estado del sidebar en desktop */}
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <div
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  isOpen ? 'bg-green-500' : 'bg-gray-400'
                )}
              />
              {isOpen ? 'Sidebar Open' : 'Sidebar Closed'}
            </div>
          </div>
        </div>

        {/* Contenido del chat */}
        <div className="flex-1 overflow-auto">{content}</div>

        {/* Input del chat */}
        <div className="mt-auto">{input}</div>
      </div>

      {/* Botón flotante para nueva conversación (solo móvil) */}
      {onCreateNewChat && (
        <FloatingActionButton
          onClick={handleNewChatClick}
          isVisible={isMobile && !isOpen}
          label="Create new chat"
          size="md"
        />
      )}
    </div>
  )
}
