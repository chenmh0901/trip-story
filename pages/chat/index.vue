<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

definePageMeta({
  layout: 'base',
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

  try {
    const response = await $fetch<{
      choices: Array<{
        message: {
          content: string
        }
      }>
    }>('/api/chat', {
      method: 'POST',
      body: {
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
      },
    })

    const assistantMessage = {
      id: messages.value.length + 1,
      content: response.choices[0].message.content,
      type: 'assistant' as const,
      timestamp: new Date().toLocaleTimeString(),
    }

    messages.value.push(assistantMessage)
  } catch (error) {
    console.error('Error:', error)
    messages.value.push({
      id: messages.value.length + 1,
      content: '抱歉，发生了错误。',
      type: 'assistant',
      timestamp: new Date().toLocaleTimeString(),
    })
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
  <div class="flex flex-col bg-gray-100 items-center justify-center">
    <div class="w-[1080px] h-[1200px] relative">
      <!-- 聊天消息列表 -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="message in messages" :key="message.id" :class="['max-w-[80%] rounded-lg p-4', message.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-white']">
          <div class="text-sm">{{ message.content }}</div>
          <div :class="['text-xs mt-1', message.type === 'user' ? 'text-blue-100' : 'text-gray-500']">
            {{ message.timestamp }}
          </div>
        </div>

        <!-- 加载状态指示器 -->
        <div v-if="isLoading" class="mr-auto bg-white rounded-lg p-4 max-w-[80%]">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s" />
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s" />
          </div>
        </div>
      </div>

      <!-- 输入框区域 -->
      <div class="border rounded-full border-gray-200 bg-white p-4 absolute bottom-0 left-0 right-0 mb-2">
        <div class="flex space-x-4 max-w-4xl mx-auto">
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
.flex-1 {
  min-height: 0;
}

/* 消息气泡动画 */
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

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  background: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}
</style>
