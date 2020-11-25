import { User, UsersFilter } from '@/types'
import { MutationTree, ActionTree, ActionContext } from 'vuex'
import { UserRole } from '~/enums'

export type State = {
  users: User[],
  filter: UsersFilter
}

export type Actions = {
  setUsers: (ctx: ActionContext<State, {}>, users: User[]) => Promise<void>
  setFilters: (ctx: ActionContext<State, {}>, filters: UsersFilter) => Promise<void>
}

enum Mutation {
  SET_USERS = 'SET_USERS',
  SET_FILTERS = 'SET_FILTERS'
}

export const state = (): State => ({
  users: [],
  filter: {
    role: [UserRole.ADMIN, UserRole.CLIENT, UserRole.STUDENT]
  }
})

export const actions: ActionTree<State, {}> = {
  setUsers ({ commit }, users: User[]) {
    commit(Mutation.SET_USERS, users)
  },
  setFilters ({ commit }, filters: UsersFilter) {
    commit(Mutation.SET_FILTERS, filters)
  }
}

export const mutations: MutationTree<State> = {
  [Mutation.SET_USERS]: (state: State, users: User[]) => {
    state.users = users
  },
  [Mutation.SET_FILTERS]: (state: State, filters: UsersFilter) => {
    state.filter = filters
  }
}
