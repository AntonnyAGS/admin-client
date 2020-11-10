<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <hero-card v-if="user" :name="user.name" />
      <div class="dashboard__projects-info">
        <project-info-card :type="ProjectStatus.APPROVED" value="03" />
        <project-info-card :type="ProjectStatus.APPROVED" value="03" />
      </div>
    </div>
    <div class="dashboard__body">
      <projects-card v-if="projects" :items="projects" class="dashboard__projects" />
      <projects-progress-card v-if="projects" :items="projects" class="dashboard__projects-progress" />
    </div>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useNamespacedState } from 'vuex-composition-helpers'
import moment from 'moment'

// Components
import { HeroCard, ProjectInfoCard, ProjectsCard, ProjectsProgressCard } from '@/components/Cards'

// Types
import { State } from '@/store/user'
import { ProjectStatus } from '@/enums'
import { Project } from '@/types'

export default defineComponent({
  components: {
    HeroCard,
    ProjectInfoCard,
    ProjectsCard,
    ProjectsProgressCard
  },

  setup () {
    const { user } = useNamespacedState<State>('user', ['user'])
    const projects = ref<Project[]>([
      { _id: 'mockid-1', name: 'Projeto Captção', createdAt: moment('2020-11-05T21:58:04.721Z').utc(), status: ProjectStatus.APPROVED },
      { _id: 'mockid-2', name: 'Projeto Captção', createdAt: moment('2020-10-05T21:58:04.721Z').utc(), status: ProjectStatus.FINISHED },
      { _id: 'mockid-3', name: 'Projeto Captção', createdAt: moment('2020-11-02T21:58:04.721Z').utc(), status: ProjectStatus.DOING },
      { _id: 'mockid-4', name: 'Projeto Captção', createdAt: moment('2020-11-05T21:58:04.721Z').utc(), status: ProjectStatus.REPROVED },
      { _id: 'mockid-5', name: 'Projeto Captção', createdAt: moment('2020-11-05T21:58:04.721Z').utc(), status: ProjectStatus.WAITING }
    ])

    return {
      user,
      ProjectStatus,
      projects
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
