<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="header__logo">
      <img src="/assets/imgs/logo.png" alt="logo" />
      <span class="brand">Trip Story</span>
    </div>
    <div class="header__nav">
      <div>Home</div>
      <div>Society</div>
      <div>Posts</div>
    </div>
    <div class="header__setting">
      <button class="button">click</button>
      <div class="avatar">
        <!-- TODO:add user upload image -->
        <img src="/assets/imgs/avatar.png" alt="avatar" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply max-w-[1200px] w-[100%] mx-auto;

  @apply flex justify-between items-center;
  @apply pt-8 px-6;

  &__logo {
    @apply flex items-center gap-2;

    .brand {
      @apply text-2xl font-bold;
    }

    img {
      @apply w-10 h-10;
    }
  }

  &__nav {
    @apply flex gap-10 text-sm;
    @apply text-sm font-bold;
  }

  &__setting {
    @apply flex gap-4;

    .button {
      @apply text-sm p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300;
    }

    .avatar {
      @apply w-10 h-10 rounded-full overflow-hidden;
    }
  }
}
</style>
