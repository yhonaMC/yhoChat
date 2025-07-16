import { ReactNode, useState } from 'react'
import {
  FiMenu,
  FiHelpCircle,
  FiInfo,
  FiFileText,
  FiX,
  FiPlus
} from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import { Backdrop } from '@/components/ui/Backdrop'
import { Modal } from '@/components/ui/Modal'
import { HowItWorks } from '@/components/info/HowItWorks'
import { AboutYhochat } from '@/components/info/AboutYhochat'
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
    defaultOpen: false, // Start closed on mobile for better UX
    breakpoint: 768,
    persistState: true,
    storageKey: 'yhochat-sidebar',
    autoCloseOnMobile: false // No cerrar automáticamente
  })

  // States for modals
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [isAboutYhochatOpen, setIsAboutYhochatOpen] = useState(false)

  const handleNewChatClick = () => {
    onCreateNewChat?.()
    // On mobile, close sidebar after creating new conversation
    if (isMobile) {
      close()
    }
  }

  const handleHowItWorksClick = () => {
    setIsHowItWorksOpen(true)
    // On mobile, close sidebar after opening modal
    if (isMobile) {
      close()
    }
  }

  const handleAboutYhochatClick = () => {
    setIsAboutYhochatOpen(true)
    // On mobile, close sidebar after opening modal
    if (isMobile) {
      close()
    }
  }

  return (
    <div className="flex h-screen flex-col md:flex-row relative">
      {/* Backdrop for mobile */}
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
        {/* Sidebar Header */}
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
            {/* Close button on mobile */}
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

        {/* Fixed navigation */}
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
            <button
              className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={handleHowItWorksClick}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                <FiInfo className="h-4 w-4" />
              </div>
              <span>How it works?</span>
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={handleAboutYhochatClick}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
                <FiFileText className="h-4 w-4" />
              </div>
              <span>About Yhochat</span>
            </button>
          </div>
        </div>

        {/* Sidebar content (conversations) */}
        <div className="flex-1 overflow-auto">{sidebar}</div>

        {/* Sidebar footer */}
        <div className="mt-auto border-t border-sidebar-border/10 p-2">
          <button className="flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary">
              <FiFileText className="h-4 w-4" />
            </div>
            <span>FAQ</span>
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col bg-background min-w-0">
        {/* Chat header with menu button */}
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
            {/* New Chat button in header for mobile */}
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

            {/* Sidebar state indicator on desktop */}
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

        {/* Chat content */}
        <div className="flex-1 overflow-auto">{content}</div>

        {/* Chat input */}
        <div className="mt-auto">{input}</div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        title="How it Works?"
        maxWidth="2xl"
      >
        <HowItWorks />
      </Modal>

      <Modal
        isOpen={isAboutYhochatOpen}
        onClose={() => setIsAboutYhochatOpen(false)}
        title="About Yhochat"
        maxWidth="2xl"
      >
        <AboutYhochat />
      </Modal>
    </div>
  )
}
