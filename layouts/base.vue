<script setup lang="ts"></script>

<template>
  <div class="layout-base relative">
    <ComHeader />
    <main>
      <slot />
    </main>
    <ComFooter />
  </div>
</template>

<style lang="scss" scoped>
.layout-base {
  @apply min-h-[100vh] min-w-[900px];
  @apply flex flex-col;
}
</style>
