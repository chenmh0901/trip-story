<script setup lang="ts">
definePageMeta({
  layout: 'base',
})

const route = useRoute()
const id = route.params.id
const postId = Number(id)

const selectedNote = computed(() => {
  return postsStore.posts.find((post) => post.id === postId)
})

const postsStore = usePostsStore()
const userStore = useUserStore()

const isCommentOpen = ref(false)
const commentInput = ref()

const isLoggedIn = computed(() => userStore.user && userStore.user.id !== 0)

const handleCommentSubmit = () => {
  if (!isLoggedIn.value) {
    alert('请先登录后再评论')
    return
  }
  if (!commentInput.value.trim()) return
  postsStore.addComment(postId, {
    id: postsStore.posts.length + 1,
    author: userStore.user,
    content: commentInput.value,
    createdAt: formatDate(),
  })
  commentInput.value = ''
}

const isLiked = computed(() => {
  return selectedNote?.value?.likedByMe
})
const handleLikeClick = () => {
  if (!isLoggedIn.value) {
    alert('请先登录后再点赞')
    return
  }
  if (isLiked.value) {
    postsStore.removeLike(postId)
  } else {
    postsStore.addLike(postId)
  }
}
</script>

<template>
  <div class="note-detail-page bg-gray-100 min-h-screen py-6">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <!-- 返回与更多操作 -->
      <div class="flex items-center justify-between mb-4">
        <NuxtLink to="/posts" class="text-gray-500 hover:text-black flex items-center"><Icon name="ph:arrow-left" class="mr-1" /> 返回</NuxtLink>
        <button class="text-gray-400 hover:text-gray-600">
          <Icon name="ph:dots-three-outline" />
        </button>
      </div>

      <!-- 用户信息 -->
      <div class="flex items-center mb-2">
        <img class="w-10 h-10 rounded-full mr-3" :src="selectedNote?.author.avatar" />
        <div>
          <div class="font-semibold text-gray-900">{{ selectedNote?.author.name }}</div>
          <div class="text-xs text-gray-400">{{ selectedNote?.createdAt }} · {{ selectedNote?.location }}</div>
        </div>
      </div>

      <!-- 标题 -->
      <h1 class="text-xl font-bold my-3">{{ selectedNote?.title }}</h1>

      <!-- 图片瀑布流 -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <img v-for="img in selectedNote?.images" :key="img" :src="img" class="rounded-lg object-cover w-full h-48" />
      </div>

      <!-- 正文 -->
      <div class="text-gray-800 text-base leading-relaxed mb-3">
        {{ selectedNote?.content }}
      </div>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in selectedNote?.tags" :key="tag" class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"> #{{ tag }} </span>
      </div>

      <!-- 操作栏 -->
      <div class="flex items-center justify-between border-t pt-3 text-gray-500 text-sm">
        <div class="flex items-center gap-6">
          <span :class="[isLiked ? 'text-red-500' : 'text-gray-500', 'flex items-center gap-1 cursor-pointer hover:text-gray-600']" @click="handleLikeClick">
            <Icon name="ph:heart" />{{ selectedNote?.likes }}
          </span>
          <span class="flex items-center gap-1 cursor-pointer hover:text-gray-600" @click="isCommentOpen = !isCommentOpen"><Icon name="ph:chat-circle" />{{ selectedNote?.comments.length }}</span>
          <span class="flex items-center gap-1 cursor-pointer hover:text-gray-600"><Icon name="ph:bookmark" />收藏</span>
          <span class="flex items-center gap-1 cursor-pointer hover:text-gray-600"><Icon name="ph:share" />分享</span>
        </div>
      </div>

      <!-- 输入评论-->
      <div v-if="isCommentOpen" class="mt-6 p-1">
        <div class="flex items-center gap-2">
          <img class="w-8 h-8 rounded-full mr-2" :src="userStore.user.avatar" />
          <input v-model="commentInput" type="text" class="w-full border-gray-300 rounded-full px-3 py-2 bg-gray-100" placeholder="添加评论" />
          <button class="bg-blue-500 text-white w-16 h-12 cursor-pointer rounded-full flex items-center justify-center" @click="handleCommentSubmit">发送</button>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="mt-6">
        <div class="font-semibold mb-2">热门评论</div>
        <div v-for="comment in selectedNote?.comments" :key="comment.id" class="flex items-start mb-4">
          <img :src="comment.author.avatar" class="w-8 h-8 rounded-full mr-2" />
          <div>
            <div class="font-medium text-gray-800">{{ comment.author.name }}</div>
            <div class="text-gray-600 text-sm">{{ comment.content }}</div>
            <div class="text-xs text-gray-400 mt-1">{{ comment.createdAt }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
