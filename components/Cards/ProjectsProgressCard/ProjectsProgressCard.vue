<template>
  <div>
    <v-card class="project-progress-card">
      <div class="project-progress-card__header">
        <div class="project-progress-card__title">
          Prazo
        </div>
      </div>
      <div class="project-progress-card__body">
        <div v-if="items.length === 0" style="height: 48px" class="d-flex align-center">
          Ainda não há nada aqui.
        </div>
        <div v-for="item in items" v-else :key="item._id" class="project-progress-card__item">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div class="project-progress-card__item-title" v-on="on">
                <v-icon small style="margin-bottom:4px" :color="StatusColor[item.status]">
                  fas fa-circle
                </v-icon>
                <div class="project-progress-card__item-text">
                  {{ item.name }}
                </div>
              </div>
            </template>
            <span>
              {{ item.name }}
            </span>
          </v-tooltip>
          <div class="progress-circular-container" :style="{'background-color': StatusColor[item.status] }">
            <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="getProgress(item)"
              :color="StatusColor[item.status]"
            >
              <span class="white--text" style="font-weight: 600; font-size: 1.3rem">
                {{ getDiffDays(item) }}
              </span>
            </v-progress-circular>
          </div>
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
      type: Array as () => Project[],
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
