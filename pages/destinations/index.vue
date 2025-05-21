<script setup lang="ts">
import DestinationCard from '~/components/destinations/destination-card.vue'
definePageMeta({
  layout: 'base',
})

const { destinations } = useDestinationStore()
</script>

<template>
  <div class="destinations-page">
    <!-- 页面标题 -->
    <h1 class="main-title pb-10">Discover China Hot Destinations</h1>

    <!-- 城市卡片网格 -->
    <div class="destinations-grid">
      <NuxtLink v-for="city in destinations" :key="city.id" class="destination-card" to="/destinations/1">
        <DestinationCard :des="city" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
.destinations-page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}
.main-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
}
.sub-title {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2.5rem;
  text-align: center;
}
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1100px;
}
</style>
