<script setup lang="ts">
import type { Destination } from '~/types/destinations'

defineProps<{
  des: Destination
}>()
</script>

<template>
  <div class="destination-card">
    <img :src="des.cover" :alt="des.name" class="card-image hover:scale-105 transition-transform duration-300" />
    <div class="card-name">{{ des.name }}</div>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';
.destination-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.destination-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.13);
}
.card-image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.card-name {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0.7rem 0;
  position: absolute;
  bottom: 0;
  left: 0;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}
.destination-card {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
