<template>
  <div class="dashboard">
    <hero-card v-if="user" :name="user.name" />
    <div class="dashboard__projects-info">
      <project-info-card :type="ProjectStatus.APPROVED" value="03" />
      <project-info-card :type="ProjectStatus.APPROVED" value="03" />
    </div>
    <projects-card v-if="projects" :items="projects" class="dashboard__projects" />
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useNamespacedState } from 'vuex-composition-helpers'
import moment from 'moment'

// Components
import { HeroCard, ProjectInfoCard, ProjectsCard } from '@/components/Cards'

// Types
import { State } from '@/store/user'
import { ProjectStatus } from '@/enums'
import { Project } from '@/types'

export default defineComponent({
  components: {
    HeroCard,
    ProjectInfoCard,
    ProjectsCard
  },

  setup () {
    const { user } = useNamespacedState<State>('user', ['user'])
    const projects = ref<Project[]>([
      { _id: 'mockid-1', name: 'Projeto Captção', createdAt: moment().format('DD/MM/YYYY, hh:mm:ss a'), status: ProjectStatus.APPROVED },
      { _id: 'mockid-2', name: 'Projeto Captção', createdAt: moment().format('DD/MM/YYYY, hh:mm:ss a'), status: ProjectStatus.FINISHED },
      { _id: 'mockid-3', name: 'Projeto Captção', createdAt: moment().format('DD/MM/YYYY, hh:mm:ss a'), status: ProjectStatus.DOING },
      { _id: 'mockid-4', name: 'Projeto Captção', createdAt: moment().format('DD/MM/YYYY, hh:mm:ss a'), status: ProjectStatus.REPROVED },
      { _id: 'mockid-5', name: 'Projeto Captção', createdAt: moment().format('DD/MM/YYYY, hh:mm:ss a'), status: ProjectStatus.WAITING }
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
