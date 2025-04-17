<script setup lang="ts">
import ColorMode from './color-mode.vue'
</script>

<template>
  <div class="max-w-[1280px] w-full mx-auto flex justify-between items-center pt-8 px-6">
    <div class="flex items-center gap-2">
      <img src="~/assets/images/logo.png" alt="logo" class="w-10 h-10" />
      <span class="text-2xl font-bold">Trip Story</span>
    </div>

    <div class="flex gap-10 text-sm font-bold">
      <NuxtLink to="/">{{ $t('home') }}</NuxtLink>
      <NuxtLink to="/community">{{ $t('Community') }}</NuxtLink>
      <NuxtLink to="/posts">{{ $t('Posts') }}</NuxtLink>
    </div>

    <div class="flex gap-4 items-center">
      <ColorMode />
      <div class="w-10 h-10 rounded-full overflow-hidden">
        <!-- TODO:add user upload image -->
        <img src="~/assets/images/avatar.png" alt="avatar" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
