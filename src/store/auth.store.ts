import { defineStore } from 'pinia'
import { FetchError } from 'ohmyfetch'
import type { User } from 'interfaces/user.interface'
import type { CustomResponse } from 'interfaces/response.interface'
import type { Tokens } from 'interfaces/token.interface'

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      apiKey: '',
      isBanned: false,
      isVerified: false,
      userLinks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const router = useRouter()

        const response = await useApi<CustomResponse<Tokens>>('/auth/login', {
          body: { email, password },
          method: 'POST',
        })

        localStorage.setItem('trym.access_token', response.data!.accessToken)

        createToast('Login successful. Redirecting...', { type: 'success' })

        setTimeout(() => {
          router.push('/')
        }, 2000)
      } catch (error) {
        if (error instanceof FetchError) {
          createToast(error.response?._data.message, { type: 'error' })
        }
      }
    },

    async fetchUser() {
      try {
        const response = await useApi<CustomResponse<User>>('/api/auth/me', {
          method: 'GET',
        })

        this.user = response.data!
      } catch (error) {
        if (error instanceof FetchError) {
          createToast(error.response?._data.message, { type: 'error' })
        }
      }
    },

    async logout() {
      try {
        const router = useRouter()

        localStorage.clear()

        return router.push('/login')
      } catch (error) {
        if (error instanceof Error) {
          createToast(error.message, { type: 'error' })
        }
      }
    },
  },
})
