import { User } from '@/types'
import { MutationTree, ActionTree, ActionContext } from 'vuex'

export type State = {
  user: User | null
}

export type Actions = {
  setUser: (ctx: ActionContext<State, {}>, user: User) => Promise<void>
}

enum Mutation {
  SET_USER = 'SET_USER'
}

export const state = (): State => ({
  user: null
})

export const actions: ActionTree<State, {}> = {
  setUser ({ commit }, user: User) {
    commit(Mutation.SET_USER, user)
  }
}

export const mutations: MutationTree<State> = {
  [Mutation.SET_USER]: (state: State, user: User) => {
    state.user = user
  }
}
