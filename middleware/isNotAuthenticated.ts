import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import Cookie from 'js-cookie'

export default defineNuxtMiddleware(({ redirect }) => {
  const token = Cookie.get(process.env.REFRESH_TOKEN)
  if (token) {
    redirect('/dashboard')
  }
})
