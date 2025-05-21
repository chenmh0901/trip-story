import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const response = await $fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        messages: body.messages,
        model: 'deepseek-chat',
        temperature: 0.7,
        stream: false
      })
    })

    return response
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to communicate with DeepSeek API'
    })
  }
}) 
