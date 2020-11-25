<template>
  <div style="width: 100%;" class="project-info">
    <v-card class="project-info-card">
      <div class="project-info-card__number">
        {{ formatNumber(value, 2) }}
      </div>
      <div class="project-info-card__type">
        {{ types[type] }}
      </div>
    </v-card>
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
      [ProjectStatus.APPROVED]: 'Projetos aprovados',
      [ProjectStatus.FINISHED]: 'Projetos finalizados',
      [ProjectStatus.WAITING]: 'Projetos pendentes',
      [ProjectStatus.REPROVED]: 'Projetos reprovados',
      [ProjectStatus.DOING]: 'Projetos em andamento',
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
  padding: $MAIN_SPACE;
  width: 100%;
  border-radius: $BORDER_RADIUS;
  &__number {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    font-family: Roboto;
    font-weight: bold;
    align-items: center;
  }
  &__type {
    display: flex;
    text-align: center;
    align-items: center;
    font-weight: 500;
  }
}
</style>
