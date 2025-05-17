import {
  ChatHistoryEntry,
  GeminiConfig,
  GeminiResponse,
  GeminiServiceInterface,
  GeminiStreamResponse
} from '../types/gemini'

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'

export class GeminiService implements GeminiServiceInterface {
  private genAI: GoogleGenerativeAI | null = null
  private model: GenerativeModel | null = null
  private modelName: string = 'gemini-2.0-flash-001'

  initialize(config: GeminiConfig): void {
    try {
      this.genAI = new GoogleGenerativeAI(config.apiKey)
      this.modelName = config.modelName || this.modelName

      const options = {
        model: this.modelName
      }

      this.model = this.genAI.getGenerativeModel(options)
    } catch (error) {
      console.error('Error initializing Gemini API:', error)
    }
  }

  async generateContent(prompt: string): Promise<GeminiResponse> {
    if (!this.model) {
      throw new Error('Gemini model not initialized')
    }

    try {
      const result = await this.model.generateContent(prompt)
      const response = result.response
      return {
        text: response.text(),
        response
      }
    } catch (error) {
      console.error('Error generating content:', error)
      throw error
    }
  }

  async *generateContentStream(
    prompt: string
  ): AsyncGenerator<GeminiStreamResponse, void, unknown> {
    if (!this.model) {
      throw new Error('Gemini model not initialized')
    }

    try {
      const result = await this.model.generateContentStream(prompt)

      for await (const chunk of result.stream) {
        const text = chunk.text()
        yield {
          text,
          isComplete: false
        }
      }

      yield {
        text: '',
        isComplete: true
      }
    } catch (error) {
      console.error('Error generating content stream:', error)
      throw error
    }
  }

  async generateChatResponse(
    history: ChatHistoryEntry[]
  ): Promise<GeminiResponse> {
    if (!this.model) {
      throw new Error('Gemini model not initialized')
    }

    try {
      const chat = this.model.startChat({
        history: history.map((entry) => ({
          role: entry.role === 'assistant' ? 'model' : entry.role,
          parts: [
            {
              text:
                typeof entry.content === 'string'
                  ? entry.content
                  : JSON.stringify(entry.content)
            }
          ]
        }))
      })

      const lastUserEntry = history
        .filter((entry) => entry.role === 'user')
        .pop()
      if (!lastUserEntry) {
        throw new Error('No user message found in history')
      }

      const lastUserMessage =
        typeof lastUserEntry.content === 'string'
          ? lastUserEntry.content
          : JSON.stringify(lastUserEntry.content)

      const result = await chat.sendMessage(lastUserMessage)
      const response = result.response

      return {
        text: response.text(),
        response
      }
    } catch (error) {
      console.error('Error generating chat response:', error)
      throw error
    }
  }

  async *generateChatResponseStream(
    history: ChatHistoryEntry[]
  ): AsyncGenerator<GeminiStreamResponse, void, unknown> {
    if (!this.model) {
      throw new Error('Gemini model not initialized')
    }

    try {
      const chat = this.model.startChat({
        history: history.slice(0, -1).map((entry) => ({
          role: entry.role === 'assistant' ? 'model' : entry.role,
          parts: [
            {
              text:
                typeof entry.content === 'string'
                  ? entry.content
                  : JSON.stringify(entry.content)
            }
          ]
        }))
      })

      const lastUserEntry = history
        .filter((entry) => entry.role === 'user')
        .pop()
      if (!lastUserEntry) {
        throw new Error('No user message found in history')
      }

      const lastUserMessage =
        typeof lastUserEntry.content === 'string'
          ? lastUserEntry.content
          : JSON.stringify(lastUserEntry.content)

      const result = await chat.sendMessageStream(lastUserMessage)

      for await (const chunk of result.stream) {
        const text = chunk.text()
        yield {
          text,
          isComplete: false
        }
      }

      yield {
        text: '',
        isComplete: true
      }
    } catch (error) {
      console.error('Error generating chat response stream:', error)
      throw error
    }
  }
}
