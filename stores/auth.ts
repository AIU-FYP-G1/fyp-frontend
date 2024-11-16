interface tokens {
  access: string;
  refresh: string;
}

export const useAuth = defineStore('auth', () => {

  let {$axios} = useNuxtApp()
  const api = $axios()

  const access_token = useCookie('access_token')
  const refresh_token = useCookie('refresh_token')
  const profileInformation = ref()
  const avatarPreview = ref<string>('');

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

  const fetchCurrentUserData = async () => {
    try {
      const {data: responseData} = await api.get(`/profile/`)
      profileInformation.value = responseData
    } catch (error) {
      throw error
    }
  }

  const updateProfileInformation = async (payload: FormData) => {
    try {
      const {data: responseData} = await api.patch('/profile/', payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      profileInformation.value = responseData
    } catch (error) {
      throw error
    }
  }

  const changeProfilePassword = async (payload: object) => {
    try {
      await api.put('/password/', payload)
    } catch (error) {
      throw error
    }
  }

  const getProfilePictureUrl = () => {
    return avatarPreview.value || profileInformation.value.profile_picture
  }

  return {
    storeTokens,
    logout,
    fetchCurrentUserData,
    profileInformation,
    updateProfileInformation,
    changeProfilePassword,
    avatarPreview,
    getProfilePictureUrl
  }
})