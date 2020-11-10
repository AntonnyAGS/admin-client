<template>
  <div>
    <v-card class="project-progress-card">
      <div class="project-progress-card__header">
        <div class="project-progress-card__title">
          Prazo
        </div>
      </div>
      <div class="project-progress-card__body">
        <div v-for="item in items" :key="item._id" class="project-progress-card__item">
          <div class="project-progress-card__item-title">
            <v-icon small style="margin-bottom:4px" :color="StatusColor[item.status]">
              fas fa-circle
            </v-icon>
            {{ item.name }}
          </div>
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="getProgress(item)"
            :color="StatusColor[item.status]"
          >
            {{ getDiffDays(item) }}
          </v-progress-circular>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent } from '@nuxtjs/composition-api'
import moment from 'moment'

// Types
import { Project } from '@/types'

import { StatusColor } from '@/helpers'

export default defineComponent({
  props: {
    items: {
      type: Array as () => Project,
      required: true
    },
    completedValue: {
      type: Number,
      default: 30
    }
  },

  setup ({ completedValue }) {
    const getDiffDays = (project: Project): number => {
      if (!project) { return 0 }
      const diffDays = moment().diff(moment(project.createdAt), 'days')
      return diffDays
    }
    const getProgress = (project: Project): number => {
      if (!project) { return 0 }
      const diffDays = getDiffDays(project)
      const porcent = (diffDays * 100) / completedValue
      return porcent
    }

    return {
      getProgress,
      StatusColor,
      getDiffDays
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
