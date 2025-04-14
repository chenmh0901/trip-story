<script setup lang="ts">
const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <div class="color-mode-icon-container">
      <Icon v-if="colorMode.preference === 'dark'" name="mdi:weather-night" class="color-mode__icon" @click="toggleColorMode" />
      <Icon v-else name="mdi:weather-sunny" class="color-mode__icon" @click="toggleColorMode" />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.color-mode-icon-container {
  @apply flex items-center justify-center p-2 w-[40px] h-[40px];
  @apply hover:bg-[#e5e7eb];
  @apply rounded-2xl cursor-pointer;

  &__icon {
    @apply w-6 h-6;
  }
}
</style>
