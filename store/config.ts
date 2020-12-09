import { ActionTree, ActionContext } from 'vuex'
import Cookies from 'js-cookie'
import { AuthService } from '@/services'

export type Actions = {
  logout: (ctx: ActionContext<any, any>) => void
}
export const actions: ActionTree<any, any> = {
  logout () {
    const service = new AuthService()

    service.logout(Cookies.get(process.env.REFRESH_TOKEN) || '')

    Cookies.remove(process.env.TOKEN, { path: '/' })
    Cookies.remove(process.env.REFRESH_TOKEN, { path: '/' })

    // Clearing Data
    window.$nuxt.$store.dispatch('user/setUser', null)
    window.$nuxt.$store.dispatch('groups/setGroups', [])
    window.$nuxt.$store.dispatch('projects/setProjects', [])
    window.$nuxt.$store.dispatch('users/setUsers', [])
    this.$router.replace('/')
  }
}
