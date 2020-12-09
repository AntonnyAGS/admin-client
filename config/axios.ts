// @ts-nocheck
import axios from 'axios'
import Cookies from 'js-cookie'
import { AuthService } from '@/services'

const instance = axios.create({
  baseURL: process.env.API_URL
})

type RefreshTokenData = {
  token: string;
  refreshToken: string;
}
let loop = 0
let isRefreshing = false

let subscribers = []

function subscribeTokenRefresh (cb) {
  subscribers.push(cb)
}

function onRrefreshed (token) {
  subscribers.map(cb => cb(token))
}

instance.interceptors.response.use(undefined, (err) => {
  loop = 0
  const {
    config,
    response: { status }
  } = err
  const originalRequest = config

  if (status === 403) {
    window.$nuxt.$store.dispatch('config/logout')
  }

  if (status === 401 && loop < 1) {
    loop++

    // eslint-disable-next-line no-console
    console.clear()
    // eslint-disable-next-line no-console
    console.log('%cConsole limpo após token refresh', 'color: blue')

    if (!isRefreshing) {
      const refreshToken = Cookies.get(process.env.REFRESH_TOKEN)
      const service = new AuthService()
      isRefreshing = true
      service.refreshToken(refreshToken || '').then((res) => {
        const { token, refreshToken } = res
        isRefreshing = false
        Cookies.set(process.env.REFRESH_TOKEN, refreshToken, { expires: 7 })
        Cookies.set(process.env.TOKEN, token, { expires: 1 / 24 })
        onRrefreshed(token)
        subscribers = []
      })
    }

    return new Promise((resolve) => {
      loop = 0
      subscribeTokenRefresh(() => {
        const token = Cookies.get(process.env.TOKEN)
        originalRequest.headers.Authorization = 'Bearer ' + token
        resolve(axios(originalRequest))
      })
    })
  }
  return Promise.reject(err)
})

export default instance
