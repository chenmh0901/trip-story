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

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.light-mode body {
  background-color: #f1e7d0;
  color: #433422;
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
