<script setup lang="ts">
import UploadPost from '~/components/posts/upload-post.vue'
definePageMeta({
  layout: 'base',
})

interface Category {
  id: string
  name: string
}

const selectedCategory = ref('all')

const categories: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'food', name: '美食' },
  { id: 'scenery', name: '风景' },
  { id: 'culture', name: '文化' },
  { id: 'shopping', name: '购物' },
  { id: 'hotel', name: '住宿' },
  { id: 'transportation', name: '交通' },
]

const posts = [
  {
    id: 1,
    title: '成都三日游｜探店必吃美食清单',
    cover: '/images/posts/guangxi.png',
    description: '整理了成都最地道的美食，从早餐到夜宵，承包你的整个行程',
    likes: 2341,
    comments: 156,
    author: {
      name: '美食探店家',
      avatar: '/images/avatars/user1.png',
    },
    tags: ['成都', '美食', '探店'],
  },
  {
    id: 2,
    title: '香港维多利亚港｜最佳拍摄时间和机位推荐',
    cover: '/images/posts/kyoto.png',
    description: '维多利亚港日落到夜景的完美拍摄攻略，收藏了各个角度的取景位置',
    likes: 1892,
    comments: 89,
    author: {
      name: '摄影师阿杰',
      avatar: '/images/avatars/user2.png',
    },
    tags: ['香港', '摄影', '风景'],
  },
  {
    id: 3,
    title: '香港维多利亚港｜最佳拍摄时间和机位推荐',
    cover: '/images/posts/kyoto.png',
    description: '维多利亚港日落到夜景的完美拍摄攻略，收藏了各个角度的取景位置',
    likes: 1892,
    comments: 89,
    author: {
      name: '摄影师阿杰',
      avatar: '/images/avatars/user2.png',
    },
    tags: ['香港', '摄影', '风景'],
  },
  {
    id: 4,
    title: '香港维多利亚港｜最佳拍摄时间和机位推荐',
    cover: '/images/posts/kyoto.png',
    description: '维多利亚港日落到夜景的完美拍摄攻略，收藏了各个角度的取景位置',
    likes: 1892,
    comments: 89,
    author: {
      name: '摄影师阿杰',
      avatar: '/images/avatars/user2.png',
    },
    tags: ['香港', '摄影', '风景'],
  },
  {
    id: 5,
    title: '香港维多利亚港｜最佳拍摄时间和机位推荐',
    cover: '/images/posts/kyoto.png',
    description: '维多利亚港日落到夜景的完美拍摄攻略，收藏了各个角度的取景位置',
    likes: 1892,
    comments: 89,
    author: {
      name: '摄影师阿杰',
      avatar: '/images/avatars/user2.png',
    },
    tags: ['香港', '摄影', '风景'],
  },
]

const setCategory = (id: string) => {
  selectedCategory.value = id
}

const showUploadPost = ref(false)
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
            :class="selectedCategory === cat.id ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 hover:bg-gray-200'"
            @click="setCategory(cat.id)"
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
        <div v-for="post in posts" :key="post.id" class="post-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <!-- 封面图 -->
          <div class="relative pb-[100%]">
            <NuxtImg :src="post.cover" :alt="post.title" class="absolute inset-0 w-full h-full object-cover" />
          </div>

          <!-- 内容区 -->
          <div class="p-3">
            <!-- 标题 -->
            <h3 class="text-base font-medium line-clamp-2 mb-2">
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
    <button class="fixed right-8 bottom-8 rounded-full w-14 h-14 shadow-lg text-black" @click="showUploadPost = true">+</button>

    <UploadPost v-if="showUploadPost" />
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

.post-card {
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>
