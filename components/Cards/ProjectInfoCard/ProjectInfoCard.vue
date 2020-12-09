<template>
  <div style="width: 100%;" class="project-info">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-card class="project-info-card" v-on="on">
          <div class="project-info-card__number">
            {{ formatNumber(value, 2) }}
          </div>
          <div class="project-info-card__type">
            <div class="project-info-card__title">
              {{ types[type] }}
            </div>
          </div>
        </v-card>
      </template>
      <span>
        {{ types[type] }}
      </span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ProjectStatus } from '@/enums'
import { formatNumber } from '@/helpers'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: '0'
    }
  },

  setup () {
    const types:Record<ProjectStatus | string, string> = {
      [ProjectStatus.APPROVED]: 'Aprovados',
      [ProjectStatus.FINISHED]: 'Finalizados',
      [ProjectStatus.WAITING]: 'Pendentes',
      [ProjectStatus.REPROVED]: 'Reprovados',
      [ProjectStatus.DOING]: 'Em andamento',
      ALL: 'Todos os projetos'
    }

    return {
      types,
      formatNumber
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';

.project-info-card {
  background-color: $MAIN_GREY !important;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: $MAIN_SPACE;
  padding: $MAIN_SPACE;
  width: 100%;
  border-radius: $BORDER_RADIUS;
  height: 100%;
  &__number {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    font-family: Montserrat;
    font-weight: bold;
    align-items: center;
  }
  &__type {
    display: flex;
    text-align: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
  }
  &__title {
    font-family: Montserrat;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
  }
}
</style>
