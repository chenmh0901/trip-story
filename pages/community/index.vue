<script setup lang="ts">
import { categories, posts } from './constant'
definePageMeta({
  layout: 'base',
})

export interface Category {
  id: string
  name: string
}

const selectedCategory = ref('all')

const setCategory = (id: string) => {
  selectedCategory.value = id
}

const hotSpots = [
  { name: 'Shanghai', image: '/images/hotspots/shanghai.jpg' },
  { name: 'Beijing', image: '/images/hotspots/beijing.jpg' },
  { name: 'Hong Kong', image: '/images/hotspots/hongkong.jpg' },
  { name: 'Macau', image: '/images/hotspots/macau.jpg' },
  { name: 'Guangzhou', image: '/images/hotspots/guangzhou.jpg' },
  { name: 'Chongqing', image: '/images/hotspots/chongqing.jpg' },
  { name: 'Chengdu', image: '/images/hotspots/chengdu.jpg' },
  { name: 'Shenzhen', image: '/images/hotspots/shenzhen.jpg' },
  { name: "Xi'an", image: '/images/hotspots/xian.jpg' },
  { name: 'Guilin', image: '/images/hotspots/guilin.jpg' },
  { name: 'Qingdao', image: '/images/hotspots/qingdao.jpg' },
  { name: 'Nanjing', image: '/images/hotspots/nanjing.jpg' },
  { name: 'Zhangjiajie', image: '/images/hotspots/zhangjiajie.jpg' },
]
</script>

<template>
  <div class="society">
    <!-- 顶部导航和筛选 -->
    <div class="society__header sticky top-0 z-50 shadow-sm">
      <div class="max-w-[1200px] mx-auto px-4 py-4">
        <!-- 分类导航 -->
        <div class="flex items-center space-x-6 overflow-x-auto pb-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
            :class="selectedCategory === cat.id ? 'bg-[#3B82F6] text-white' : 'bg-gray-00 text-black hover:bg-gray-200'"
            @click="setCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="society__content max-w-[1200px] mx-auto px-4 py-6">
      <!-- 瀑布流布局 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="post in posts" :key="post.id" class="post-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <!-- 封面图 -->
          <div class="relative pb-[100%]">
            <NuxtImg :src="post.cover" :alt="post.title" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <!-- 内容区 -->
          <div class="p-3">
            <!-- 标题 -->
            <h3 class="text-base font-medium line-clamp-2 mb-2 text-black">
              {{ post.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-sm text-gray-600 line-clamp-2 mb-3">
              {{ post.description }}
            </p>

            <!-- 作者信息 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <NuxtImg :src="post.author.avatar" :alt="post.author.name" class="w-6 h-6 rounded-full" />
                <span class="text-sm text-gray-600">{{ post.author.name }}</span>
              </div>
            </div>

            <!-- 互动数据 -->
            <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div class="flex items-center space-x-1">
                <Icon name="ph:heart" />
                <span>{{ post.likes }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="ph:chat-circle" />
                <span>{{ post.comments }}</span>
              </div>
            </div>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="text-center mt-8">
        <UButton variant="outline"> 加载更多 </UButton>
      </div>
    </div>

    <!-- 悬浮发布按钮 -->
    <button class="fixed right-8 bottom-8 rounded-full w-14 h-14 shadow-lg" color="primary" icon="i-ph-plus" />

    <section class="max-w-5xl mx-auto py-12 px-4">
      <h2 class="text-3xl font-bold mb-8 text-gray-900">热门景点推荐</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="spot in hotSpots" :key="spot.name" class="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-transform hover:-translate-y-1">
          <img :src="spot.image" :alt="spot.name" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div class="absolute bottom-4 left-0 w-full flex justify-center">
            <span class="text-white text-xl font-extrabold drop-shadow-lg tracking-wide">
              {{ spot.name }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';

.society {
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

.post-card {
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
