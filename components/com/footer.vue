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
  <footer class="footer">
    <div class="container">
      <!-- Logo Section -->
      <div class="footer-logo">
        <div class="logo text-2xl font-cursive text-white mb-3">Trip Story</div>
        <p class="text-gray-400 text-sm">分享旅行故事，探索世界之美</p>
      </div>

      <!-- Navigation Links -->
      <div class="footer-links">
        <div class="link-group">
          <h3 class="footer-title">关于我们</h3>
          <ul>
            <li v-for="link in aboutLinks" :key="link.name">
              <NuxtLink :to="link.link" class="footer-link">{{ link.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="link-group">
          <h3 class="footer-title">帮助中心</h3>
          <ul>
            <li v-for="link in helpLinks" :key="link.name">
              <NuxtLink :to="link.link" class="footer-link">{{ link.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div class="link-group">
          <h3 class="footer-title">关注我们</h3>
          <div class="social-links">
            <a v-for="social in socialLinks" :key="social.icon" :href="social.link" class="social-link" target="_blank" rel="noopener noreferrer">
              <Icon :name="social.icon" class="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="copyright">
      <div>
        <p class="text-gray-500 text-sm text-center">© {{ new Date().getFullYear() }} Travel Stories. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @apply w-full bg-[#111827] pt-16 pb-8;
}

.container {
  @apply max-w-[1200px] mx-auto px-4;
  @apply grid grid-cols-1 md:grid-cols-12 gap-8;

  .footer-logo {
    @apply md:col-span-3;
  }

  .footer-links {
    @apply md:col-span-9;
    @apply grid grid-cols-1 md:grid-cols-3 gap-8;
  }
}

.footer-title {
  @apply text-white font-medium text-lg mb-6;
}

.footer-link {
  @apply text-gray-400 hover:text-white transition-colors duration-300;
  @apply block py-2;
}

.social-links {
  @apply flex gap-4;
}

.social-link {
  @apply w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center;
  @apply text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300;
}

.copyright {
  @apply mt-16 pt-8 border-t border-gray-800;
}
</style>
