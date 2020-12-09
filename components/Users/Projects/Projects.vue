<template>
  <div class="user__projects">
    <div class="user__projects-title">
      Projetos
    </div>
    <div class="user__projects-body">
      <template v-if="projects && projects.length > 0">
        <v-chip v-for="project in projects" :key="project._id" color="#ff9700" class="white--text">
          {{ project.name }}
        </v-chip>
      </template>
      <div v-else class="user__projects-empty">
        Ainda não há nenhum projeto em que este usuário esteja alocado.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { Project } from '@/types'
import { StatusColor, StatusText } from '@/helpers'
import { ProjectStatus } from '@/enums'

export default defineComponent({
  props: {
    projects: {
      type: Array as () => Project[],
      required: true
    }
  },

  setup () {
    return {
      StatusColor,
      StatusText,
      ProjectStatus
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.user {
  font-family: Montserrat;
  &__projects {
    padding: $MAIN_SPACE;
  }
  &__projects-body {
    margin-top: 10px;
    ::v-deep .v-chip {
      margin: 5px 5px 0 0;
    }
  }
  &__projects-title {
    font-weight: 500;
  }
  &__projects-empty {
    color: grey;
  }
}
</style>
