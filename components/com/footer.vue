<script setup lang="ts">
const aboutLinks = [
  { name: '公司介绍', link: '/about' },
  { name: '加入我们', link: '/join' },
  { name: '联系方式', link: '/contact' },
  { name: '用户协议', link: '/terms' },
]

const helpLinks = [
  { name: '新手指南', link: '/guide' },
  { name: '常见问题', link: '/faq' },
  { name: '意见反馈', link: '/feedback' },
  { name: '隐私政策', link: '/privacy' },
]

const socialLinks = [
  { icon: 'i-ph-wechat-logo', link: '#' },
  { icon: 'i-ph-wechat-logo', link: '#' },
  { icon: 'i-ph-instagram-logo', link: '#' },
]
</script>

<template>
  <footer class="w-full bg-[#111827] pt-16 pb-8">
    <div class="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
      <!-- Logo Section -->
      <div class="md:col-span-3">
        <div class="text-2xl font-cursive text-white mb-3">Trip Story</div>
        <p class="text-gray-400 text-sm">分享旅行故事，探索世界之美</p>
      </div>

      <!-- Navigation Links -->
      <div class="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-white font-medium text-lg mb-6">关于我们</h3>
          <ul>
            <li v-for="link in aboutLinks" :key="link.name">
              <NuxtLink :to="link.link" class="text-gray-400 hover:text-white transition-colors duration-300 block py-2">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-white font-medium text-lg mb-6">帮助中心</h3>
          <ul>
            <li v-for="link in helpLinks" :key="link.name">
              <NuxtLink :to="link.link" class="text-gray-400 hover:text-white transition-colors duration-300 block py-2">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="text-white font-medium text-lg mb-6">关注我们</h3>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.link"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon :name="social.icon" class="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="mt-16 pt-8 border-t border-gray-800">
      <div>
        <p class="text-gray-500 text-sm text-center">© {{ new Date().getFullYear() }} Travel Stories. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
