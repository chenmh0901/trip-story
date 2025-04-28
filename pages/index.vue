<script setup lang="ts">
import { hotDestinations, featuredStories, travelInspirations } from './constant'
definePageMeta({
  layout: 'base',
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero relative h-screen">
      <div class="absolute inset-0">
        <img src="~/assets/images/hero-bg.png" alt="探索世界的每个角落" class="w-full h-full" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
      </div>
      <div class="relative container h-full flex flex-col justify-center items-center text-white">
        <h1 class="text-6xl md:text-7xl font-bold mb-6">探索世界的每个角落</h1>
        <p class="text-xl md:text-2xl mb-8">记录你的旅行故事，分享精彩瞬间，让更多人感受旅行的魅力</p>
        <div class="flex gap-4">
          <button class="bg-[#3B82F6] text-white w-40 h-12 rounded-xl">开始探索</button>
          <button class="bg-[#FFFFFF] text-black w-40 h-12 rounded-xl">分享旅记</button>
        </div>
      </div>
    </section>

    <!-- Hot Destinations -->
    <section class="py-20">
      <div class="container">
        <h2 class="text-3xl font-bold mb-8">热门目的地</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink v-for="dest in hotDestinations" :key="dest.name" :to="dest.link" class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <NuxtImg :src="dest.image" :alt="dest.name" class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <div class="absolute bottom-0 p-6">
                <h3 class="text-2xl font-bold text-white mb-2">{{ dest.name }}</h3>
                <p class="text-gray-200 text-sm mb-4">{{ dest.description }}</p>
                <div class="flex items-center text-gray-300 text-sm">
                  <Icon name="i-ph-user" class="mr-1" />
                  <span>{{ dest.visits }} 人去过</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Stories -->
    <section class="bg-[#EFEFEF] py-20">
      <div class="container">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-black">精选游记</h2>
          <div class="flex gap-2">
            <button class="btn text-black">最新发布</button>
            <button class="btn text-black">最多浏览</button>
            <button class="btn text-black" active>查看更多</button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="story in featuredStories" :key="story.title" class="bg-gray-800 rounded-xl overflow-hidden group">
            <div class="relative overflow-hidden">
              <NuxtImg :src="story.image" :alt="story.title" class="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-4">
                <img :src="story.author.avatar" :alt="story.author.name" class="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 class="text-white font-medium">{{ story.author.name }}</h4>
                  <p class="text-gray-400 text-sm">{{ story.date }}</p>
                </div>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">{{ story.title }}</h3>
              <div class="flex text-white text-sm gap-2">
                <span class="flex items-center gap-1"><Icon name="i-ph-heart" />{{ story.likes }}</span>
                <span class="flex items-center gap-1"><Icon name="i-ph-chat-circle" />{{ story.comments }}</span>
                <span class="flex items-center gap-1"><Icon name="i-ph-share" />{{ story.shares }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Travel Inspirations -->
    <section class="bg-[#F9FAFB] py-20">
      <div class="container">
        <h2 class="text-3xl font-bold mb-12 text-start">旅行灵感</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="inspiration in travelInspirations" :key="inspiration.title" class="text-start p-8 rounded-xl bg-white">
            <div class="flex items-center justify-center w-12 h-12 bg-[#EBF2FE] rounded-xl mb-4">
              <Icon :name="inspiration.icon" class="text-2xl text-[#3B82F6]" />
            </div>
            <h3 class="text-xl font-bold mb-3">{{ inspiration.title }}</h3>
            <p class="text-gray-600">{{ inspiration.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Community -->
    <section class="max-w-[1080px] mx-auto bg-[#111827] rounded-xl my-20">
      <div class="container !pr-0 !pl-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-4xl font-bold text-white mb-4">加入我们的旅行社区</h2>
            <p class="text-gray-300 mb-8">与来自世界各地的旅行者分享经历，获取最新的旅行灵感和实用建议</p>
            <button class="btn">立即加入</button>
          </div>
          <div class="md:w-1/2">
            <img src="~/assets/images/community.png" alt="Travel Community" class="rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';
.home-page {
  @apply w-full;
}

.container {
  @apply max-w-[1280px] mx-auto w-full px-4;
}

.hero {
  @apply relative flex items-center justify-center;
  min-height: 100vh;
}

.btn {
  @apply w-24 h-10 rounded-xl bg-[#F3F4F6];
  @apply transition-all duration-300 ease-in-out;
  @apply shadow-sm hover:shadow-md;

  &[active] {
    @apply bg-[#3B82F6] text-white;
    @apply shadow-lg;
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
}
</style>
