import axios from 'axios'

const api = axios.create({
  baseURL: 'https://frontend-test-api-eta.vercel.app/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url
    const currentPath = window.location.pathname

    const isAuthRoute = ['/me'].some((path) => requestUrl?.includes(path))

    if (
      ((status === 401 && window.location.pathname !== '/') || (status === 404 && isAuthRoute)) &&
      currentPath !== '/login'
    ) {
      console.warn('Déconnexion forcée :', status, requestUrl)
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default api
