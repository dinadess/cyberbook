import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/axios'
// import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  // const router = useRouter()
  const user = ref(null)
  const userName = computed(() => user.value?.name)
  async function fetchUser() {
    try {
      const res = await api.get('/me')
      user.value = res.data
    } catch (error) {
      console.log('error', error)
      // router.push('/login')
    }
  }

  const logout = async function (router) {
    localStorage.removeItem('token')
    user.value = null
    router.push('/login')
  }

  return { user, userName, fetchUser, logout }
})
