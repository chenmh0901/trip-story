<script setup lang="ts">
import { ref } from 'vue'
import type { Post } from '~/types/post'

const emit = defineEmits(['upload', 'saveDraft'])

// 初始化数据
const postData = ref<Post>({
  title: '',
  description: '',
  content: '',
  images: [],
  tags: [],
  location: '',
  likes: 0,
  author: {
    id: 1,
    avatar: '',
    name: '',
    password: '',
    phone: '',
  },
  comments: [],
  createdAt: '',
  updatedAt: '',
  category: '',
  cover: '',
  id: '',
})

const enableLocation = ref(false)

// 地点列表
const locationInput = ref('')

// 处理图片上传
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const file = input.files[0]
    // 这里添加实际的图片上传逻辑
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        postData.value.images?.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
}

// 添加地点
const addTags = () => {
  if (locationInput.value.trim()) {
    postData.value.tags.push(locationInput.value)
    locationInput.value = ''
  }
}

// 移除地点
const removeTag = (index: number) => {
  postData.value.tags.splice(index, 1)
}

// 移除图片
const removeImage = (index: number) => {
  postData.value.images?.splice(index, 1)
}

const { user } = useUserStore()
const { posts, draft } = usePostsStore()

// 发布日记
const publishPost = () => {
  console.log('Publishing post:', postData.value)
  postData.value.cover = postData.value.images?.[0] ?? ''
  postData.value.author = user
  postData.value.createdAt = formatDate()
  postData.value.updatedAt = formatDate()
  postData.value.id = posts.length + 1
  emit('upload', postData.value)
}

// 保存草稿
const saveDraft = () => {
  console.log('Saving draft:', postData.value)
  emit('saveDraft', postData.value)
}

onMounted(() => {
  if (draft) {
    postData.value = draft
  }
})
</script>

<template>
  <div class="upload-post">
    <!-- 标题输入 -->
    <input v-model="postData.title" type="text" class="title-input" placeholder="请输入一个吸引人的标题" />

    <!-- 描述输入 -->
    <textarea v-model="postData.description" type="text" class="desc-textarea" placeholder="请简单描述一下你的日记" />

    <!-- 富文本编辑器 -->
    <section class="mt-4">
      <!-- 富文本编辑器工具栏 -->
      <div class="editor-toolbar">
        <button class="toolbar-btn"><Icon name="i-ph-text-b" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-text-italic" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-text-underline" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-list-bullets" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-list-numbers" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-link" /></button>
        <button class="toolbar-btn"><Icon name="i-ph-image" /></button>
      </div>

      <!-- 内容编辑区 -->
      <textarea v-model="postData.content" class="content-editor" placeholder="开始记录你的精彩旅程..." />
    </section>

    <!-- 图片上传区 -->
    <div class="image-upload-section">
      <div class="image-grid">
        <div v-for="(image, index) in postData.images" :key="index" class="image-item">
          <img :src="image" alt="uploaded image" />
          <button class="remove-btn" @click="removeImage(index)">
            <Icon name="i-ph-x" />
          </button>
        </div>
        <label class="upload-trigger">
          <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          <div class="upload-placeholder">
            <Icon name="i-ph-cloud-arrow-up" class="text-3xl mb-2" />
            <p>点击或拖拽上传</p>
            <p class="text-sm text-gray-400">支持 JPG、PNG、GIF</p>
          </div>
        </label>
      </div>
    </div>

    <!-- 日记标签 -->
    <div class="tags-section">
      <h3 class="section-title">日记标签</h3>
      <div class="tags-input-group">
        <input v-model="locationInput" type="text" placeholder="添加日记标签" class="tags-input" />
        <button class="add-btn" @click="addTags">添加</button>
      </div>
      <div class="tags-tags">
        <span v-for="(tag, index) in postData.tags" :key="index" class="tags-item">
          {{ tag }}
          <button class="remove-tag" @click="removeTag(index)">
            <Icon name="i-ph-x" />
          </button>
        </span>
      </div>
    </div>

    <!-- 选择地点 -->
    <section class="location-section">
      <!-- 位置信息 -->
      <div class="location-toggle">
        <label class="toggle-switch">
          <input v-model="enableLocation" type="checkbox" />
          <span class="slider" />
        </label>
        <span class="ml-2">开启位置信息</span>
        <span v-if="enableLocation" class="ml-2">杭州</span>
      </div>

      <!-- 旅行目的地 -->
      <div class="destination-input">
        <input v-model="postData.location" type="text" placeholder="请输入旅行目的地" class="destination-input-box" />
      </div>
    </section>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="draft-btn" @click="saveDraft">保存草稿</button>
      <button class="publish-btn" @click="publishPost">发布日记</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';
.upload-post {
  @apply max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm;
  @apply overflow-y-auto;
}

.title-input {
  @apply w-full text-2xl font-medium mb-6 p-2 border-none outline-none;
  @apply placeholder:text-gray-400;
}

.editor-toolbar {
  @apply flex gap-2 mb-4 p-2 border-b;
}

.toolbar-btn {
  @apply w-8 h-8 flex items-center justify-center rounded;
  @apply hover:bg-gray-100 transition-colors;
}

.content-editor {
  @apply w-full min-h-[200px] p-4 mb-6 outline-none resize-none;
  @apply placeholder:text-gray-400;
}

.image-upload-section {
  @apply mb-8;

  .image-grid {
    @apply grid grid-cols-3 gap-4;
  }

  .image-item {
    @apply relative aspect-square rounded-lg overflow-hidden;

    img {
      @apply w-full h-full object-cover;
    }

    .remove-btn {
      @apply absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white;
      @apply flex items-center justify-center;
    }
  }

  .upload-trigger {
    @apply aspect-square border-2 border-dashed border-gray-300 rounded-lg;
    @apply flex flex-col items-center justify-center cursor-pointer;
    @apply hover:border-blue-500 transition-colors;
  }
}

.tags-section {
  @apply mb-8;
}

.section-title {
  @apply text-lg font-medium mb-4;
}

.tags-input-group {
  @apply flex gap-2 mb-4;

  .tags-input {
    @apply flex-1 px-4 py-2 border rounded-lg;
  }

  .add-btn {
    @apply px-6 py-2 bg-blue-500 text-white rounded-lg;
    @apply hover:bg-blue-600 transition-colors;
  }
}

.tags-tags {
  @apply flex flex-wrap gap-2;

  .tags-item {
    @apply flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full;

    .remove-tag {
      @apply w-4 h-4 flex items-center justify-center;
      @apply hover:text-red-500 transition-colors;
    }
  }
}

.time-section {
  @apply mb-8;
}

.date-picker-group {
  @apply flex items-center;

  .date-input {
    @apply px-4 py-2 border rounded-lg;
  }
}

.location-toggle {
  @apply flex items-center mb-8;
}

.toggle-switch {
  @apply relative inline-block w-12 h-6;

  input {
    @apply hidden;

    &:checked + .slider {
      @apply bg-blue-500;
    }

    &:checked + .slider:before {
      @apply translate-x-6;
    }
  }

  .slider {
    @apply absolute inset-0 bg-gray-300 rounded-full transition-all cursor-pointer;

    &:before {
      content: '';
      @apply absolute left-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all;
    }
  }
}

.action-buttons {
  @apply flex justify-end gap-4;

  button {
    @apply px-6 py-2 rounded-lg transition-colors;
  }

  .cancel-btn {
    @apply text-gray-600 hover:bg-gray-100;
  }

  .draft-btn {
    @apply border border-blue-500 text-blue-500 hover:bg-blue-50;
  }

  .publish-btn {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
}

.desc-textarea {
  @apply w-full text-base mb-4 p-3 rounded-lg bg-gray-50 border-none outline-none resize-none;
  @apply placeholder:text-gray-400;
  min-height: 48px;
  line-height: 1.7;
  transition: box-shadow 0.2s;
}
.desc-textarea:focus {
  @apply bg-white shadow;
}
.location-section {
  @apply flex items-center gap-6;
}

.destination-input {
  @apply mb-8;
}

.destination-input-box {
  @apply w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 outline-none;
  @apply placeholder:text-gray-400;
  @apply focus:bg-white focus:border-blue-400 focus:shadow;
  transition: box-shadow 0.2s;
}
</style>
