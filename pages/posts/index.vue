<script setup lang="ts">
import UploadPost from '~/components/posts/upload-post.vue'
import PostCard from '~/components/posts/post-card.vue'
import type { Category, Post } from '~/types/post'

definePageMeta({
  layout: 'base',
})
const categories: Category[] = [
  { id: 'all', name: '全部', value: 'all' },
  { id: 'food', name: '美食', value: '美食' },
  { id: 'scenery', name: '风景', value: '风景' },
  { id: 'entertainment', name: '娱乐', value: '娱乐' },
  { id: 'culture', name: '文化', value: '文化' },
  { id: 'shopping', name: '购物', value: '购物' },
  { id: 'hotel', name: '住宿', value: '住宿' },
  { id: 'transportation', name: '交通', value: '交通' },
]

const { posts, addPost, saveDraft } = usePostsStore()
const selectedCategory = ref('all')

const setCategory = (id: string) => {
  selectedCategory.value = id
}

const filteredPosts = computed(() => {
  return posts.filter((post) => {
    if (selectedCategory.value === 'all') return true
    return post.category === selectedCategory.value
  })
})

const showUploadPost = ref(false)

const handlePostClick = (id: number | string) => {
  navigateTo(`/posts/${id}`)
}

const handleUpload = (post: Post) => {
  addPost(post)
  showUploadPost.value = false
}

const handleSaveDraft = (post: Post) => {
  saveDraft(post)
  showUploadPost.value = false
}
</script>

<template>
  <div class="posts">
    <!-- 顶部导航和筛选 -->
    <div class="posts__header sticky top-0 z-50 shadow-sm">
      <div class="max-w-[1200px] mx-auto px-4 py-4">
        <!-- 分类导航 -->
        <div class="flex items-center space-x-6 overflow-x-auto pb-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
            :class="selectedCategory === cat.value ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'"
            @click="setCategory(cat.value)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="posts__content max-w-[1200px] mx-auto px-4 py-6">
      <!-- 瀑布流布局 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" @click="handlePostClick(post.id)" />
      </div>
    </div>

    <!-- Nuxt UI Modal -->
    <UModal
      v-model:open="showUploadPost"
      title="发布日记"
      :dismissible="false"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
      :ui="{
        content: 'max-w-5xl',
      }"
    >
      <button class="fixed right-8 bottom-8 rounded-full w-14 h-14 shadow-lg text-white bg-blue-600 text-3xl flex items-center justify-center" @click="showUploadPost = true">+</button>

      <template #body>
        <div class="w-full">
          <UploadPost @upload="handleUpload" @save-draft="handleSaveDraft" />
        </div>
      </template>
    </UModal>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';

.posts {
  @apply min-h-screen bg-gray-50;

  &__header {
    @apply border-b;
  }

  ::-webkit-scrollbar {
    @apply h-1.5 w-1.5;
  }

  ::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-full;
  }
}
</style>
