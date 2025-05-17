import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUrlsInText(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>'
  )
}

export function highlightText(text: string, keywords: string[] = []): string {
  if (!keywords.length) return text

  let result = text
  keywords.forEach((keyword) => {
    if (keyword.trim() === '') return

    const regex = new RegExp(`(${keyword})`, 'gi')
    result = result.replace(
      regex,
      '<span class="bg-yellow-300/20 text-yellow-700 dark:text-yellow-300">$1</span>'
    )
  })

  return result
}

export function formatMarkdownText(text: string): string {
  let formatted = text

  // Format bold text **bold** or __bold__
  formatted = formatted.replace(
    /\*\*(.*?)\*\*|__(.*?)__/g,
    '<strong>$1$2</strong>'
  )

  // Format italic text *italic* or _italic_
  formatted = formatted.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')

  // Format inline code `code`
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted px-1 py-0.5 rounded text-xs">$1</code>'
  )

  return formatted
}

export function applyTextFormatting(text: string): string {
  let formatted = text
  formatted = formatUrlsInText(formatted)
  formatted = formatMarkdownText(formatted)
  return formatted
}
