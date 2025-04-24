<script lang="ts" setup></script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang="scss">
body {
  overflow-y: scroll;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.22s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(18px);
}
</style>
