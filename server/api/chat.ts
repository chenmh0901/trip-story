import { defineEventHandler, readBody } from 'h3'
import { ofetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await ofetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
            messages: body.messages,
            model: 'deepseek-chat',
            temperature: 0.7,
            stream: true
          }),
          responseType: 'stream'
        })

        const reader = response.getReader()
        if (!reader) throw new Error('No reader available')

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = new TextDecoder().decode(value)
          const lines = text.split('\n').filter(line => line.trim() !== '')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices[0]?.delta?.content
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content))
                }
              } catch (e) {
                console.error('Error parsing JSON:', e)
              }
            }
          }
        }
      } catch (error) {
        console.error('Stream Error:', error)
        controller.error(error)
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    }
  })
}) 
