import { Project, ProjectsFilter } from '@/types'
import { MutationTree, ActionTree, ActionContext } from 'vuex'
import { ProjectStatus } from '@/enums'

export type State = {
  projects: Project[];
  filter: ProjectsFilter;
}

export type Actions = {
  setProjects: (ctx: ActionContext<State, {}>, projects: Project[]) => Promise<void>
  setFilter: (ctx: ActionContext<State, {}>, filter: ProjectsFilter) => Promise<void>
}

enum Mutation {
  SET_PROJECTS = 'SET_PROJECT',
  SET_FILTER = 'SET_FILTER'
}

export const state = (): State => ({
  projects: [],
  filter: {
    status: [ProjectStatus.APPROVED, ProjectStatus.DOING, ProjectStatus.FINISHED, ProjectStatus.REPROVED, ProjectStatus.WAITING]
  }
})

export const actions: ActionTree<State, {}> = {
  setProjects ({ commit }, projects: Project[]) {
    commit(Mutation.SET_PROJECTS, projects)
  },
  setFilter ({ commit }, filter: ProjectsFilter) {
    commit(Mutation.SET_FILTER, filter)
  }
}

export const mutations: MutationTree<State> = {
  [Mutation.SET_PROJECTS]: (state: State, projects: Project[]) => {
    state.projects = projects
  },
  [Mutation.SET_FILTER]: (state: State, filter: ProjectsFilter) => {
    state.filter = filter
  }
}
