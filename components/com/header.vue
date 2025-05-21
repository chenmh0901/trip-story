<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import ColorMode from './color-mode.vue'

const showSetting = ref(false)
const userStore = useUserStore()

// 上传头像
const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userStore.updateUser({ avatar: e.target?.result as string })
    }
    reader.readAsDataURL(input.files[0])
  }
}

const handleLogout = () => {
  userStore.logout()
  showSetting.value = false
  navigateTo('/login')
}

const handleChat = () => {
  navigateTo('/chat')
}
</script>

<template>
  <div class="max-w-[1280px] w-full mx-auto flex justify-between items-center pt-8 px-6">
    <NuxtLink to="/" class="flex items-center gap-2">
      <img src="~/assets/images/logo.png" alt="logo" class="w-10 h-10" />
      <span class="text-2xl font-bold">Trip Story</span>
    </NuxtLink>

    <div class="flex gap-10 text-sm font-bold">
      <NuxtLink to="/">{{ $t('home') }}</NuxtLink>
      <NuxtLink to="/destinations">{{ $t('destinations') }}</NuxtLink>
      <NuxtLink to="/posts">{{ $t('posts') }}</NuxtLink>
    </div>

    <div class="flex gap-4 items-center">
      <div class="relative w-24 cursor-pointer" @click="handleChat">
        <input class="w-full h-full py-1 rounded-full border pointer-events-none bg-[#f3f0fa] border-gray-300" />
        <button class="absolute left-2 top-1 cursor-pointer"><Icon name="material-symbols:search" width="24" height="24" /></button>
      </div>

      <ColorMode />

      <div class="relative">
        <div
          class="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200"
          @click="userStore.user.id === 0 ? navigateTo('/login') : (showSetting = !showSetting)"
        >
          <template v-if="userStore.user.id !== 0">
            <img :src="userStore.user.avatar || '/images/avatars/placeholder.png'" alt="avatar" class="w-full h-full object-cover" />
          </template>
          <template v-else>
            <span class="text-gray-500 text-sm text-center w-12">未登录</span>
          </template>
        </div>
        <div v-if="showSetting && userStore.user.id !== 0" class="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md p-4 z-50">
          <div class="flex items-center gap-2 mb-4">
            <img :src="userStore.user.avatar || '/images/avatars/placeholder.png'" class="w-10 h-10 rounded-full" />
            <span class="text-sm font-bold">{{ userStore.user.name }}</span>
          </div>
          <label class="block cursor-pointer text-blue-500 hover:underline mb-2">
            上传头像
            <input type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
          </label>
          <button class="w-full text-left cursor-pointer text-red-500 hover:underline" @click="handleLogout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
