<script setup lang="ts">
import PostCard from '~/components/posts/post-card.vue'
import DestinationCard from '~/components/destinations/destination-card.vue'

definePageMeta({
  layout: 'base',
})
const route = useRoute()
const city = computed(() => {
  return cityDetails.find((d) => d.id === Number(route.params.id))
})
const { cityDetails } = useDestinationStore()
</script>

<template>
  <div class="destination-detail">
    <!-- 顶部大图和面包屑 -->
    <div class="banner">
      <img :src="city?.cover" :alt="city?.name" />
      <nav class="breadcrumb">
        <NuxtLink to="/" class="hover:text-black">首页</NuxtLink>
        <span class="mx-2">></span>
        <NuxtLink to="/destinations" class="hover:text-black">热门景点</NuxtLink>
        <span class="mx-2">></span>
        <span class="text-black">{{ city?.name }}</span>
      </nav>
    </div>

    <div class="content-container">
      <div class="content">
        <!-- 城市简介 -->
        <section class="intro">
          <h1>
            {{ city?.name }}
          </h1>
          <p>{{ city?.description }}</p>
        </section>

        <!-- 相关笔记-->
        <section class="related-posts">
          <h2>探索</h2>
          <div class="post-grid">
            <div v-for="p in city?.posts" :key="p.id" :data="p" class="post-card">
              <NuxtLink :to="`/posts/${p.id}`">
                <PostCard :post="p" />
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- 热门景点 -->
        <section class="attractions">
          <h2>热门景点</h2>
          <div class="attraction-grid">
            <div v-for="a in city?.attractions" :key="a.id" :data="a" class="attraction-card">
              <DestinationCard :des="a" />
            </div>
          </div>
        </section>

        <!-- 旅行贴士 -->
        <section class="travel-tips">
          <h2>旅行攻略</h2>
          <div v-for="section in city?.travelTips" :key="section.title" class="travel-tip-section">
            <h3 class="tip-section-title">{{ section.title }}</h3>
            <ul class="tip-list">
              <li v-for="(item, index) in section.content" :key="item.title || index">
                <template v-if="item.title">
                  <div class="tip-item-title">{{ item.title }}</div>
                </template>
                <template v-if="Array.isArray(item.content)">
                  <ul class="tip-sublist">
                    <li v-for="sub in item.content" :key="sub">{{ sub }}</li>
                  </ul>
                </template>
                <template v-else>
                  <div class="tip-item-content">{{ item.content }}</div>
                </template>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.destination-detail {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px;
  background: #fff;
}
.banner img {
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  max-height: 320px;
}
.breadcrumb {
  margin: 12px 0;
  color: #888;
  font-size: 0.95rem;
}
.post-card {
  width: 50%;
}
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  .content {
    width: 80%;
  }
}

.intro {
  h1 {
    font-size: 32px;
    font-weight: bolder;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #666;
  }
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  gap: 24px;
}
.post-card {
  width: 100%;
}

section {
  margin-bottom: 40px;
}
h1,
h2 {
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 24px;
}
.attraction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.itinerary-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.must-visit-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
.must-visit-item img {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
}
ul {
  padding-left: 20px;
}
ul li {
  margin-bottom: 8px;
}
@media (max-width: 700px) {
  .attraction-grid,
  .itinerary-list {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
  .must-visit-item {
    flex-direction: column;
    align-items: flex-start;
  }
}

.travel-tips {
  margin-top: 32px;
}

.travel-tips h2 {
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.travel-tip-section {
  border-radius: 14px;
  margin-bottom: 28px;
}

.tip-section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 14px;
  letter-spacing: 1px;
}

.tip-list {
  padding-left: 0;
  margin: 0;
}

.tip-list > li {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}

.tip-item-title {
  font-weight: 500;
  color: #111;
  margin-bottom: 2px;
}

.tip-item-content {
  color: #666;
  margin: 20px 0 20px 0.5em;
}

.tip-sublist {
  list-style: circle inside;
  margin-left: 1.2em;
  color: #555;
  font-size: 0.98em;
}

.tip-sublist li {
  margin-bottom: 4px;
}

/* 响应式 */
@media (max-width: 700px) {
  .travel-tip-section {
    padding: 16px 10px 12px 10px;
  }
  .travel-tips h2 {
    font-size: 1.2rem;
  }
  .tip-section-title {
    font-size: 1rem;
  }
}
</style>
