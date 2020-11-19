import { Project } from '@/types'
import { MutationTree, ActionTree, ActionContext } from 'vuex'

export type State = {
  projects: Project[]
}

export type Actions = {
  setProjects: (ctx: ActionContext<State, {}>, projects: Project[]) => Promise<void>
}

enum Mutation {
  SET_PROJECTS = 'SET_PROJECT'
}

export const state = (): State => ({
  projects: []
})

export const actions: ActionTree<State, {}> = {
  setProjects ({ commit }, projects: Project[]) {
    console.log('oi', projects)
    commit(Mutation.SET_PROJECTS, projects)
  }
}

export const mutations: MutationTree<State> = {
  [Mutation.SET_PROJECTS]: (state: State, projects: Project[]) => {
    state.projects = projects
  }
}
