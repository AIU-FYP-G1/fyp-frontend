interface tokens {
  access: string;
  refresh: string;
}

export const useAuth = defineStore('auth', () => {

  const access_token = useCookie('access_token')
  const refresh_token = useCookie('refresh_token')

  const storeTokens = (tokens: tokens) => {
    access_token.value = tokens.access
    refresh_token.value = tokens.refresh
  }

  const logout = () => {
    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    accessTokenCookie.value = null;
    refreshTokenCookie.value = null;

    navigateTo('/login');
  }

  return {
    storeTokens,
    logout,
  }
})