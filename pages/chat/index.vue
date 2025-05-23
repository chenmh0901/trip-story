<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

definePageMeta({
  layout: 'plain',
})

interface Message {
  id: number
  content: string
  type: 'user' | 'assistant'
  timestamp: string
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)

// 发送消息到 DeepSeek API
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = {
    id: messages.value.length + 1,
    content: inputMessage.value,
    type: 'user' as const,
    timestamp: new Date().toLocaleTimeString(),
  }

  messages.value.push(userMessage)
  const userInput = inputMessage.value
  inputMessage.value = ''
  isLoading.value = true

  // 创建助手消息
  const assistantMessage = {
    id: messages.value.length + 1,
    content: '',
    type: 'assistant' as const,
    timestamp: new Date().toLocaleTimeString(),
  }
  messages.value.push(assistantMessage)

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
      }),
    })

    if (!response.body) throw new Error('No response body')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const text = decoder.decode(value)
      assistantMessage.content += text
    }
  } catch (error) {
    console.error('Error:', error)
    assistantMessage.content = '抱歉，发生了错误。'
  } finally {
    isLoading.value = false
  }
}

// 自动滚动到底部
const messagesContainer = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 监听消息变化，自动滚动
watch(
  messages,
  () => {
    nextTick(scrollToBottom)
  },
  { deep: true }
)
</script>

<template>
  <div class="flex bg-gray-100 items-center justify-center h-[88vh]">
    <div class="w-[1080px] bg-white rounded-2xl shadow-lg flex flex-col relative max-h-screen" style="height: 80vh">
      <!-- 聊天消息列表 -->
      <div ref="messagesContainer" class="p-6 space-y-4 flex-1">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['max-w-[80%] rounded-lg p-4 break-words', message.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-100 text-gray-900']"
        >
          <div class="text-sm">{{ message.content }}</div>
          <div :class="['text-xs mt-1', message.type === 'user' ? 'text-blue-100' : 'text-gray-500']">
            {{ message.timestamp }}
          </div>
        </div>

        <!-- 加载状态指示器 -->
        <div v-if="isLoading" class="mr-auto bg-gray-100 rounded-lg p-4 max-w-[80%]">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s" />
          </div>
        </div>
      </div>

      <!-- 输入框区域 -->
      <div class="border-t border-gray-200 bg-white p-4 h-[80px]">
        <div class="flex space-x-4">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="输入消息..."
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            :disabled="isLoading"
            @keyup.enter="sendMessage"
          />
          <button
            :disabled="isLoading"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            @click="sendMessage"
          >
            {{ isLoading ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 聊天整体背景和布局 */
.break-words {
  word-break: break-word;
}
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
/* 移除滚动条样式 */
::-webkit-scrollbar {
  display: none;
}
</style>
