import { ActionTree, ActionContext } from 'vuex'
import Cookies from 'js-cookie'

export type Actions = {
  logout: (ctx: ActionContext<any, any>) => void
}
export const actions: ActionTree<any, any> = {
  logout () {
    console.log('oi')
    Cookies.remove(process.env.TOKEN, { path: '/' })
    Cookies.remove(process.env.REFRESH_TOKEN, { path: '/' })
    this.$router.replace('/login')
  }
}
