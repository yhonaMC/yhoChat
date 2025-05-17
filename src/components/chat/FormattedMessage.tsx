import React from 'react'
import { cn, applyTextFormatting } from '@/lib/utils'

interface FormattedMessageProps {
  content: string
  className?: string
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  content,
  className
}) => {
  const processContent = () => {
    if (!content) return []

    const lines = content.split('\n')

    let currentGroup: {
      type: 'paragraph' | 'list' | 'code' | 'heading'
      items: string[]
      language?: string
      headingLevel?: number
    } = {
      type: 'paragraph',
      items: []
    }

    const result: Array<{
      type: 'paragraph' | 'list' | 'code' | 'heading'
      items: string[]
      language?: string
      headingLevel?: number
    }> = []

    let inCodeBlock = false
    let codeLanguage = ''

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith('```')) {
        if (!inCodeBlock) {
          if (currentGroup.items.length > 0) {
            result.push({ ...currentGroup })
          }

          codeLanguage = trimmedLine.slice(3).trim()

          currentGroup = { type: 'code', items: [], language: codeLanguage }
          inCodeBlock = true
        } else {
          result.push({ ...currentGroup })
          currentGroup = { type: 'paragraph', items: [] }
          inCodeBlock = false
        }
        return
      }

      if (inCodeBlock) {
        currentGroup.items.push(line)
        return
      }

      if (trimmedLine === '') {
        if (currentGroup.items.length > 0) {
          result.push({ ...currentGroup })
          currentGroup = { type: 'paragraph', items: [] }
        }
        return
      }

      const markdownHeadingMatch = trimmedLine.match(/^(#+)\s+(.+)$/)

      const isOtherHeading = /^(.+:)$|^(\d+\.\s+.+:)$/.test(trimmedLine)

      const isListItem = /^[-*•]|^\d+\./.test(trimmedLine)

      if (markdownHeadingMatch) {
        if (currentGroup.items.length > 0) {
          result.push({ ...currentGroup })
        }

        const headingLevel = Math.min(markdownHeadingMatch[1].length, 3)

        currentGroup = {
          type: 'heading',
          items: [markdownHeadingMatch[2]],
          headingLevel
        }

        result.push({ ...currentGroup })
        currentGroup = { type: 'paragraph', items: [] }
      } else if (isOtherHeading) {
        if (currentGroup.items.length > 0) {
          result.push({ ...currentGroup })
        }

        currentGroup = {
          type: 'heading',
          items: [trimmedLine],
          headingLevel: 2
        }

        result.push({ ...currentGroup })
        currentGroup = { type: 'paragraph', items: [] }
      } else if (isListItem) {
        if (currentGroup.type !== 'list' && currentGroup.items.length > 0) {
          result.push({ ...currentGroup })
          currentGroup = { type: 'list', items: [] }
        } else if (currentGroup.type !== 'list') {
          currentGroup = { type: 'list', items: [] }
        }

        currentGroup.items.push(trimmedLine)
      } else {
        if (currentGroup.type === 'list' && currentGroup.items.length > 0) {
          result.push({ ...currentGroup })
          currentGroup = { type: 'paragraph', items: [] }
        }

        currentGroup.items.push(trimmedLine)
      }

      if (index === lines.length - 1 && currentGroup.items.length > 0) {
        result.push({ ...currentGroup })
      }
    })

    if (inCodeBlock && currentGroup.items.length > 0) {
      result.push({ ...currentGroup })
    }

    return result
  }

  const contentGroups = processContent()

  return (
    <div
      className={cn('text-sm text-foreground whitespace-pre-wrap', className)}
    >
      {contentGroups.map((group, groupIndex) => {
        if (group.type === 'paragraph') {
          return (
            <p
              key={groupIndex}
              className="mb-4 last:mb-0"
              dangerouslySetInnerHTML={{
                __html: applyTextFormatting(group.items.join(' '))
              }}
            />
          )
        } else if (group.type === 'list') {
          return (
            <ul key={groupIndex} className="mb-4 last:mb-0 pl-6 space-y-1">
              {group.items.map((item, itemIndex) => {
                const formattedItem = item
                  .replace(
                    /^(\d+)\.(\s+)/,
                    '<span class="font-semibold">$1.</span>$2'
                  )
                  .replace(
                    /^[-*•](\s+)/,
                    '<span class="inline-block w-3">•</span>$1'
                  )

                return (
                  <li
                    key={itemIndex}
                    className="relative pl-2"
                    dangerouslySetInnerHTML={{
                      __html: applyTextFormatting(formattedItem)
                    }}
                  />
                )
              })}
            </ul>
          )
        } else if (group.type === 'heading') {
          const headingText = group.items[0].replace(/^(.+):$/, '$1')

          const level = group.headingLevel || 2
          const headingClass = cn(
            'font-semibold mb-2',
            level === 1 ? 'text-lg' : level === 2 ? 'text-base' : 'text-sm'
          )

          return (
            <h3 key={groupIndex} className={headingClass}>
              {headingText}
            </h3>
          )
        } else if (group.type === 'code') {
          const codeContent = group.items.join('\n')
          return (
            <div key={groupIndex} className="mb-4 last:mb-0">
              <div className="relative bg-muted rounded-md overflow-x-auto">
                {group.language && (
                  <div className="text-xs text-muted-foreground px-4 py-1 border-b border-muted-foreground/10">
                    {group.language}
                  </div>
                )}

                <pre className="p-4 text-xs">
                  <code>{codeContent}</code>
                </pre>
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
