import Vue from 'vue'
import Notifications from 'vue-notification'

import {
  onGlobalSetup,
  defineNuxtPlugin,
  provide,
  wrapProperty
} from '@nuxtjs/composition-api'

Vue.use(Notifications)

const useNotify = wrapProperty('$notify', false)

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => {
    const notify = useNotify()

    provide('notify', notify)
  })
})
