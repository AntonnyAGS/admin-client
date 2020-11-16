<template>
  <div style="width: 100%;" class="project-info">
    <v-card class="project-info-card">
      <div class="project-info-card__number">
        {{ value }}
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
export default defineComponent({
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: '0'
    }
  },

  setup () {
    const types:Record<ProjectStatus, string> = {
      [ProjectStatus.APPROVED]: 'Projetos aprovados',
      [ProjectStatus.FINISHED]: 'Projetos finalizados',
      [ProjectStatus.WAITING]: 'Projetos pendentes',
      [ProjectStatus.REPROVED]: 'Projetos reprovados',
      [ProjectStatus.DOING]: 'Projetos em andamento'
    }

    return {
      types
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';

.project-info-card {
  background-color: $MAIN_GREY;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  padding: $MAIN_SPACE;
  width: 100%;
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

// @media #{map-get($display-breakpoints, 'md-and-up')}{
//   .project-info-card {
//     // padding: $MAIN_SPACE * 2;
//   }
// }
</style>
