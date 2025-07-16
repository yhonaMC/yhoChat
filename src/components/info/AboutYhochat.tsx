import React from 'react'
import {
  FiStar,
  FiHeart,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiMessageCircle,
  FiDatabase,
  FiLayers
} from 'react-icons/fi'

export const AboutYhochat: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            Y
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Welcome to YHOCHAT!
        </h3>
        <p className="text-muted-foreground">
          Your personal AI assistant designed to revolutionize the way you
          interact with technology.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <FiStar className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Our Mission</h4>
            <p className="text-sm text-muted-foreground">
              To make AI communication as natural as talking to a friend. We
              eliminate technical barriers so you can focus on getting accurate
              answers, valuable insights, and creative solutions to your daily
              challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Main features */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">
          Why choose YHOCHAT?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiZap className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Advanced Intelligence
              </h5>
              <p className="text-sm text-muted-foreground">
                Powered by Google Gemini AI, one of the most advanced AIs
                available
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiMessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Contextual Conversations
              </h5>
              <p className="text-sm text-muted-foreground">
                Maintains complete context for more accurate responses
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiDatabase className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Persistent Memory
              </h5>
              <p className="text-sm text-muted-foreground">
                Your conversations are automatically saved for future access
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiLayers className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Premium Experience
              </h5>
              <p className="text-sm text-muted-foreground">
                Elegant and modern interface designed for maximum usability
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiTrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Optimized Performance
              </h5>
              <p className="text-sm text-muted-foreground">
                Fast and smooth responses without interruptions
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <FiShield className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-1">
                Guaranteed Privacy
              </h5>
              <p className="text-sm text-muted-foreground">
                Your data remains secure and private in your browser
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="border-t border-border pt-6">
        <h4 className="font-semibold text-foreground mb-4">
          Technologies Used
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Next.js 15
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            TypeScript
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Google Gemini AI
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            TailwindCSS
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Zustand
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Radix UI
          </div>
        </div>
      </div>

      {/* Final message */}
      <div className="text-center bg-primary/5 p-6 rounded-lg">
        <FiHeart className="h-8 w-8 text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-2">
          YHOCHAT is here to make your life easier and more productive.
        </p>
        <p className="text-sm font-medium text-foreground">
          Let&apos;s start this exciting journey together!
        </p>
      </div>
    </div>
  )
}
