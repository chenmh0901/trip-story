<script setup lang="ts">
import type { Post } from '~/types/post'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="post-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
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

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mt-3">
        <span v-for="tag in post.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>
