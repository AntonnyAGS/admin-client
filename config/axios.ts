import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.API_URL
})

type RefreshTokenData = {
  token: string;
  refreshToken: string;
}

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = Cookies.get(process.env.REFRESH_TOKEN)
      originalRequest._retry = true
      return instance.post<RefreshTokenData>('/auth/refresh-token', { refreshToken }).then((res) => {
        if (res.status === 201) {
          // eslint-disable-next-line no-console
          console.clear()
          // eslint-disable-next-line no-console
          console.log('%cConsole limpo após token refresh', 'color: blue')
          Cookies.set(process.env.REFRESH_TOKEN, res.data.refreshToken, { expires: 7 })
          Cookies.set(process.env.TOKEN, res.data.token, { expires: 1 / 24 })
          originalRequest.headers.authorization = 'Bearer ' + res.data.token
          return instance(originalRequest)
        }
      })
    } else if (error.response.status === 403) {
      window.$nuxt.$store.dispatch('config/logout')
      return Promise.reject(error)
    }
  }
)

export default instance
