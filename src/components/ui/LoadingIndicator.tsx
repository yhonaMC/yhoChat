import { cn } from '@/lib/utils'

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'primary' | 'secondary' | 'sidebar'
}

export const LoadingIndicator = ({
  size = 'md',
  className,
  variant = 'primary'
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    sidebar: 'text-sidebar-primary'
  }

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      aria-label="Cargando"
      role="status"
    >
      <svg
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

export const ChatLoadingIndicator = () => {
  return (
    <div className="flex w-full items-start gap-4 p-4 bg-sidebar/5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary">
        <span className="text-xs font-semibold text-sidebar-primary-foreground">
          A
        </span>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">Assistant</div>
        <div className="flex items-center space-x-1 text-sm text-foreground/80">
          <div className="inline-flex items-center space-x-2">
            <span className="font-medium">One moment...</span>
            <span className="relative flex h-2 w-16">
              <span className="absolute inline-flex h-2 w-2 animate-bounce rounded-full bg-sidebar-primary"></span>
              <span className="absolute inline-flex h-2 w-2 animate-bounce rounded-full bg-sidebar-primary animation-delay-150 left-2"></span>
              <span className="absolute inline-flex h-2 w-2 animate-bounce rounded-full bg-sidebar-primary animation-delay-300 left-4"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
