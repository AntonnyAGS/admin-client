<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <hero-card v-if="user" :name="user.name" />
      <div class="dashboard__actions">
        <action-card title="Gerencie seus grupos" description="Você pode gerenciar seus grupos clicando no botão abaixo." image-url="discussion.svg" />
      </div>
    </div>
    <div class="dashboard__info">
      <project-info-card type="ALL" :value="projects.length" class="dashboard__info--all" />
      <project-info-card :type="ProjectStatus.WAITING" :value="filteredProjects(ProjectStatus.WAITING).length" />
      <project-info-card :type="ProjectStatus.APPROVED" :value="filteredProjects(ProjectStatus.APPROVED).length" />
      <project-info-card :type="ProjectStatus.DOING" :value="filteredProjects(ProjectStatus.DOING).length" />
      <project-info-card :type="ProjectStatus.FINISHED" :value="filteredProjects(ProjectStatus.FINISHED).length" />
    </div>
    <div class="dashboard__body">
      <div>
        <projects-progress-card v-if="projects" :items="filteredProjects(ProjectStatus.WAITING).slice(0,3)" class="dashboard__projects-progress" />
        <projects-card v-if="projects" :items="filteredProjects(ProjectStatus.WAITING).slice(0,3)" class="dashboard__projects" />
      </div>
      <information-card class="dashboard__carousel" />
    </div>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

// Components
import { HeroCard, ProjectInfoCard, ProjectsCard, ProjectsProgressCard, ActionCard, InformationCard } from '@/components/Cards'

// Types/Enums
import { ProjectStatus } from '@/enums'

// Store
import { State as UserState } from '@/store/user'
import { State as ProjectState, Actions as ProjectActions } from '@/store/projects'

// Service
import { ProjectService } from '@/services'

export default defineComponent({
  components: {
    HeroCard,
    ProjectInfoCard,
    ProjectsCard,
    ProjectsProgressCard,
    ActionCard,
    InformationCard
  },

  setup () {
    const { user } = useNamespacedState<UserState>('user', ['user'])
    const { projects } = useNamespacedState<ProjectState>('projects', ['projects'])
    const { setProjects } = useNamespacedActions<ProjectActions>('projects', ['setProjects'])

    const loading = ref(false)

    const loadProjects = async () => {
      loading.value = true
      const service = new ProjectService()
      const response = await service.projects()
      setProjects(response)
      loading.value = false
    }

    loadProjects()

    const filteredProjects = (status: ProjectStatus) => {
      return projects.value.filter(project => project.status === status)
    }

    return {
      user,
      ProjectStatus,
      loadProjects,
      loading,
      projects,
      filteredProjects
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
