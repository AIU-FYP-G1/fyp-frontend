import { navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('access_token')

  if (to.path === '/login' && accessToken.value) {
    return navigateTo('/dashboard')
  } else if (to.path === '/dashboard' && !accessToken.value) {
    return navigateTo('/login')
  }
})
