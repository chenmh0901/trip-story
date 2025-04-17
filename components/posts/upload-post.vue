<script setup lang="ts">
import { ref } from 'vue'

// 日记数据结构
interface PostData {
  title: string
  content: string
  images: string[]
  locations: string[]
  startDate: string
  endDate: string
  enableLocation: boolean
}

// 初始化数据
const postData = ref<PostData>({
  title: '',
  content: '',
  images: [],
  locations: [],
  startDate: '',
  endDate: '',
  enableLocation: false,
})

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
        postData.value.images.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
}

// 添加地点
const addLocation = () => {
  if (locationInput.value.trim()) {
    postData.value.locations.push(locationInput.value)
    locationInput.value = ''
  }
}

// 移除地点
const removeLocation = (index: number) => {
  postData.value.locations.splice(index, 1)
}

// 移除图片
const removeImage = (index: number) => {
  postData.value.images.splice(index, 1)
}

// 发布日记
const publishPost = () => {
  // 这里添加实际的发布逻辑
  console.log('Publishing post:', postData.value)
}

// 保存草稿
const saveDraft = () => {
  // 这里添加保存草稿逻辑
  console.log('Saving draft:', postData.value)
}
</script>

<template>
  <div class="upload-post">
    <!-- 标题输入 -->
    <input v-model="postData.title" type="text" class="title-input" placeholder="请输入一个吸引人的标题" />

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

    <!-- 旅行地点 -->
    <div class="location-section">
      <h3 class="section-title">旅行地点</h3>
      <div class="location-input-group">
        <input v-model="locationInput" type="text" placeholder="添加地点标签" class="location-input" />
        <button class="add-btn" @click="addLocation">添加</button>
      </div>
      <div class="location-tags">
        <span v-for="(location, index) in postData.locations" :key="index" class="location-tag">
          {{ location }}
          <button class="remove-tag" @click="removeLocation(index)">
            <Icon name="i-ph-x" />
          </button>
        </span>
      </div>
    </div>

    <!-- 旅行时间 -->
    <div class="time-section">
      <h3 class="section-title">旅行时间</h3>
      <div class="date-picker-group">
        <input v-model="postData.startDate" type="date" class="date-input" />
        <span class="mx-2">至</span>
        <input v-model="postData.endDate" type="date" class="date-input" />
      </div>
    </div>

    <!-- 位置信息 -->
    <div class="location-toggle">
      <label class="toggle-switch">
        <input v-model="postData.enableLocation" type="checkbox" />
        <span class="slider" />
      </label>
      <span class="ml-2">开启位置信息</span>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="cancel-btn" @click="$emit('cancel')">取消</button>
      <button class="draft-btn" @click="saveDraft">保存草稿</button>
      <button class="publish-btn" @click="publishPost">发布日记</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss' .upload-post {
  @apply max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm;
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

.location-section {
  @apply mb-8;
}

.section-title {
  @apply text-lg font-medium mb-4;
}

.location-input-group {
  @apply flex gap-2 mb-4;

  .location-input {
    @apply flex-1 px-4 py-2 border rounded-lg;
  }

  .add-btn {
    @apply px-6 py-2 bg-blue-500 text-white rounded-lg;
    @apply hover:bg-blue-600 transition-colors;
  }
}

.location-tags {
  @apply flex flex-wrap gap-2;

  .location-tag {
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
</style>
