<script setup lang="ts">
const { t } = useI18n()
const { locales, setLocale } = useI18n()

const isLogin = ref(true)
const phone = ref('')
const username = ref('')
const password = ref('')
const verifyCode = ref('')
const countdown = ref(60)
const timer = ref<number | null>(null)
const currentVerifyCode = ref('') // 存储当前生成的验证码

// 错误提示
const errors = ref({
  phone: '',
  username: '',
  password: '',
  verifyCode: '',
})

// 验证手机号格式
const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phone.value) {
    errors.value.phone = t('auth.errors.phone_required')
    return false
  }
  if (!phoneRegex.test(phone.value)) {
    errors.value.phone = t('auth.errors.phone_invalid')
    return false
  }
  errors.value.phone = ''
  return true
}

// 验证用户名
const validateUsername = () => {
  if (!isLogin.value) {
    if (!username.value) {
      errors.value.username = t('auth.errors.username_required')
      return false
    }
    if (username.value.length < 3) {
      errors.value.username = t('auth.errors.username_length')
      return false
    }
  }
  errors.value.username = ''
  return true
}

// 验证密码
const validatePassword = () => {
  if (!isLogin.value) {
    if (!password.value) {
      errors.value.password = t('auth.errors.password_required')
      return false
    }
    if (password.value.length < 6) {
      errors.value.password = t('auth.errors.password_length')
      return false
    }
    // 密码必须包含字母和数字
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!passwordRegex.test(password.value)) {
      errors.value.password = t('auth.errors.password_format')
      return false
    }
  }
  errors.value.password = ''
  return true
}

// 生成随机验证码
const generateVerifyCode = () => {
  const code = Math.random().toString().slice(-6)
  currentVerifyCode.value = code
  return code
}

// 修改发送验证码的函数
const sendVerifyCode = () => {
  if (!validatePhone()) {
    return
  }

  // 生成新的验证码
  const code = generateVerifyCode()

  // 开始倒计时
  countdown.value = 60
  timer.value = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer.value!)
      timer.value = null
    }
  }, 1000)

  // 模拟发送验证码（在实际场景中这里会调用后端API）
  console.log(`手机号：${phone.value} 的验证码是：${code}`)
  // 可以使用 alert 让用户更容易看到验证码
  alert(`您的验证码是：${code}`)
}

// 修改验证码验证函数
const validateVerifyCode = () => {
  if (!verifyCode.value) {
    errors.value.verifyCode = t('auth.errors.code_required')
    return false
  }
  if (verifyCode.value.length !== 6) {
    errors.value.verifyCode = t('auth.errors.code_length')
    return false
  }
  // 验证输入的验证码是否正确
  if (verifyCode.value !== currentVerifyCode.value) {
    errors.value.verifyCode = t('auth.errors.code_invalid')
    return false
  }
  errors.value.verifyCode = ''
  return true
}

// 修改登录函数
const handleLogin = () => {
  // 验证所有字段
  const isPhoneValid = validatePhone()
  const isVerifyCodeValid = validateVerifyCode()

  if (!isPhoneValid || !isVerifyCodeValid) {
    return
  }

  // 模拟登录成功
  console.log('登录成功:', {
    phone: phone.value,
    verifyCode: verifyCode.value,
  })

  // 存储登录状态（可以存储在 localStorage 中）
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userPhone', phone.value)

  // 登录成功后跳转
  navigateTo('/')
}

// 修改注册函数
const handleRegister = () => {
  // 验证所有字段
  const isPhoneValid = validatePhone()
  const isUsernameValid = validateUsername()
  const isPasswordValid = validatePassword()
  const isVerifyCodeValid = validateVerifyCode()

  if (!isPhoneValid || !isUsernameValid || !isPasswordValid || !isVerifyCodeValid) {
    return
  }

  // 模拟注册成功，存储用户信息
  const userInfo = {
    username: username.value,
    phone: phone.value,
    password: password.value, // 实际项目中不建议明文存储密码
  }

  // 存储用户信息（这里仅作演示）
  localStorage.setItem('userInfo', JSON.stringify(userInfo))

  // 提示注册成功
  alert('注册成功！')

  // 注册成功后自动切换到登录
  isLogin.value = true

  // 清空表单
  username.value = ''
  password.value = ''
  verifyCode.value = ''
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- 语言切换按钮 -->
    <div class="absolute top-4 right-4 flex gap-2">
      <button v-for="locale in locales" :key="locale.code" class="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded-lg text-sm transition-colors" @click="setLocale(locale.code)">
        {{ locale.code === 'zh' ? '中文' : 'English' }}
      </button>
    </div>

    <div class="max-w-md w-full space-y-8">
      <!-- Logo -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ t(isLogin ? 'auth.welcome_back' : 'auth.create_account') }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ t(isLogin ? 'auth.login_account' : 'auth.start_journey') }}
        </p>
      </div>

      <!-- 表单 -->
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- 用户名输入框（仅在注册时显示） -->
          <div v-if="!isLogin" class="space-y-1">
            <label for="username" class="sr-only">用户名</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.username }"
              :placeholder="t('auth.username')"
              @blur="validateUsername"
            />
            <p v-if="errors.username" class="text-red-500 text-xs">{{ t(errors.username) }}</p>
          </div>

          <!-- 手机号输入框 -->
          <div class="space-y-1">
            <label for="phone" class="sr-only">手机号</label>
            <input
              id="phone"
              v-model="phone"
              type="tel"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.phone }"
              :placeholder="t('auth.phone')"
              @blur="validatePhone"
            />
            <p v-if="errors.phone" class="text-red-500 text-xs">{{ t(errors.phone) }}</p>
          </div>

          <!-- 密码输入框（仅在注册时显示） -->
          <div v-if="!isLogin" class="space-y-1">
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              :placeholder="t('auth.password')"
              @blur="validatePassword"
            />
            <p v-if="errors.password" class="text-red-500 text-xs">{{ t(errors.password) }}</p>
          </div>

          <!-- 验证码输入框 -->
          <div class="space-y-1">
            <div class="flex gap-2">
              <div class="flex-1">
                <input
                  v-model="verifyCode"
                  type="text"
                  required
                  class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  :class="{ 'border-red-500': errors.verifyCode }"
                  :placeholder="t('auth.verify_code')"
                  @blur="validateVerifyCode"
                />
              </div>
              <button
                type="button"
                :disabled="!!timer"
                class="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="sendVerifyCode"
              >
                {{ timer ? t('auth.retry_after', { count: countdown }) : t('auth.get_code') }}
              </button>
            </div>
            <p v-if="errors.verifyCode" class="text-red-500 text-xs">{{ t(errors.verifyCode) }}</p>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="isLogin ? handleLogin() : handleRegister()"
          >
            {{ t(isLogin ? 'auth.login' : 'auth.register') }}
          </button>
        </div>

        <!-- 切换登录/注册 -->
        <div class="text-center">
          <button type="button" class="text-sm text-blue-600 hover:text-blue-500" @click="isLogin = !isLogin">
            {{ t(isLogin ? 'auth.to_register' : 'auth.to_login') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
