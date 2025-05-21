import { ref } from 'vue'
import type { User, UserInfo } from '~/types/user'


export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: 0,
    name: '',
    avatar: '',
    password: '',
    phone: '',
  })

  const login = (userInfo: User) => {
    user.value = userInfo
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  const logout = () => {
    user.value = {
      id: 0,
      name: '',
      avatar: '',
      password: '',
      phone: '',
    }
    localStorage.removeItem('user')
  }

  const register = (userInfo: User) => {
    user.value = userInfo
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  const loadUser = () => {
    const saved = localStorage.getItem('user')
    if (saved) user.value = JSON.parse(saved)
  }

  const updateUser = (userInfo: UserInfo) => {
    user.value = { ...user.value, ...userInfo }
    console.log(user.value)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  return {
    user,
    login,
    loadUser,
    logout,
    register,
    updateUser
  }
})
