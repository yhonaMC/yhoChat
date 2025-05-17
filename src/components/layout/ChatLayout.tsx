import { ReactNode } from 'react'
import {
  FiSettings,
  FiMenu,
  FiHelpCircle,
  FiInfo,
  FiFileText
} from 'react-icons/fi'
import { Button } from '@/components/ui/Button'

interface ChatLayoutProps {
  sidebar: ReactNode
  content: ReactNode
  input: ReactNode
}

export const ChatLayout = ({ sidebar, content, input }: ChatLayoutProps) => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="flex w-full flex-col bg-sidebar md:w-80">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary">
              <span className="text-lg font-bold text-sidebar-primary-foreground">
                Y
              </span>
            </div>
            <div className="font-semibold text-sidebar-foreground">YHOCHAT</div>
          </div>
          <div className="text-xs text-sidebar-foreground/70">
            App Version 1.0.0
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground ml-2"
            aria-label="Menu"
          >
            <FiMenu className="h-5 w-5" />
          </Button>
        </div>

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

        <div className="flex-1 overflow-auto">{sidebar}</div>

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

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-background">
        <div className="flex-1 overflow-auto">{content}</div>
        <div className="mt-auto">{input}</div>
      </div>
    </div>
  )
}
