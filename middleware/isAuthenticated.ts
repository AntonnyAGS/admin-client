import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import Cookie from 'js-cookie'

export default defineNuxtMiddleware(({ redirect, store }) => {
  const token = Cookie.get(process.env.REFRESH_TOKEN)
  if (!token) {
    store.dispatch('config/logout')
  }
})
