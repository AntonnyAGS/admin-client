import { Group } from '@/types'
import { MutationTree, ActionTree, ActionContext } from 'vuex'

export type State = {
  groups: Group[];
}

export type Actions = {
  setGroups: (ctx: ActionContext<State, {}>, groups: Group[]) => Promise<void>
}

enum Mutation {
  SET_GROUPS = 'SET_GROUPS',
}

export const state = (): State => ({
  groups: []
})

export const actions: ActionTree<State, {}> = {
  setGroups ({ commit }, groups: Group[]) {
    commit(Mutation.SET_GROUPS, groups)
  }
}

export const mutations: MutationTree<State> = {
  [Mutation.SET_GROUPS]: (state: State, groups: Group[]) => {
    state.groups = groups
  }
}
