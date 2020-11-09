<template>
  <div class="dashboard">
    <hero-card v-if="user" :name="user.name" />
    <div class="dashboard__projects-info">
      <project-info-card :type="ProjectStatus.APPROVED" value="03" />
      <project-info-card :type="ProjectStatus.APPROVED" value="03" />
    </div>
    <projects-card class="dashboard__projects" />
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent } from '@nuxtjs/composition-api'
import { useNamespacedState } from 'vuex-composition-helpers'

// Components
import { HeroCard, ProjectInfoCard, ProjectsCard } from '@/components/Cards'

// Types
import { State } from '@/store/user'
import { ProjectStatus } from '@/enums'

export default defineComponent({
  components: {
    HeroCard,
    ProjectInfoCard,
    ProjectsCard
  },

  setup () {
    const { user } = useNamespacedState<State>('user', ['user'])

    return {
      user,
      ProjectStatus
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
