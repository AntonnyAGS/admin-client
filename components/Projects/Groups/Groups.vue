<template>
  <div class="project__groups">
    <div class="project__groups-title">
      Grupos
    </div>
    <div class="project__groups-body">
      <template v-if="project.groups && project.groups.length > 0">
        <v-chip v-for="group in project.groups" :key="group._id" color="#ff9700" class="white--text">
          {{ group.name }}
        </v-chip>
      </template>
      <div v-else class="project__groups-empty">
        Ainda não há nenhum grupo alocado para este projeto.
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
    project: {
      type: Object as () => Project,
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

.project {
  font-family: Montserrat;
  &__groups {
    padding: $MAIN_SPACE;
  }
  &__groups-body {
    margin-top: 10px;
    ::v-deep .v-chip {
      margin: 5px 5px 0 0;
    }
  }
  &__groups-title {
    font-weight: 500;
  }
  &__groups-empty {
    color: grey;
  }
}
</style>
