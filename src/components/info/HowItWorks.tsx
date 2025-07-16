import React from 'react'
import {
  FiMessageSquare,
  FiZap,
  FiDatabase,
  FiRefreshCw,
  FiShield,
  FiSmartphone
} from 'react-icons/fi'

export const HowItWorks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Discover how YHOCHAT transforms your AI conversations into a smooth
          and natural experience
        </p>
      </div>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiMessageSquare className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              1. Start a Conversation
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Simply type your message in the text box and press Enter. YHOCHAT
              will automatically create a new conversation or continue the
              current one.
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <code className="text-primary">
                💬 &quot;How can I improve my productivity?&quot;
              </code>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiZap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              2. Intelligent Processing
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your message is sent to Google Gemini AI, which analyzes the
              complete context of the conversation to generate accurate and
              relevant responses.
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <span className="text-primary">
                ⚡ Processing with Gemini AI...
              </span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiDatabase className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              3. Contextual Response
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              You receive an intelligent response that considers the entire
              conversation history, automatically formatted with markdown, code
              blocks, and lists.
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <span className="text-primary">
                🤖 Response generated and formatted
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiRefreshCw className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              4. Continuous Conversation
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Continue the conversation naturally. YHOCHAT maintains the
              complete context and can refer to previous messages for more
              accurate responses.
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <span className="text-primary">
                🔄 Context maintained automatically
              </span>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiShield className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">
              5. Secure Storage
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              All your conversations are automatically saved in your browser.
              Your data remains private and accessible only to you.
            </p>
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <span className="text-primary">🔒 Local and secure storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional features */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-foreground mb-4">
          Additional Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <FiSmartphone className="h-5 w-5 text-primary" />
            <span className="text-sm">Responsive design for all devices</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <FiZap className="h-5 w-5 text-primary" />
            <span className="text-sm">Fast and smooth responses</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <FiDatabase className="h-5 w-5 text-primary" />
            <span className="text-sm">Multiple simultaneous conversations</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <FiRefreshCw className="h-5 w-5 text-primary" />
            <span className="text-sm">Real-time auto-save</span>
          </div>
        </div>
      </div>
    </div>
  )
}
