<template>
  <div class="project__header">
    <div class="project__header-info">
      <div v-if="isAdmin" class="project__header-actions">
        <template v-if="project.status === ProjectStatus.WAITING">
          <v-btn
            class="text-none white--text"
            color="#29CC97"
            @click="$emit('handle-manage-status', ProjectStatus.APPROVED)"
          >
            Aprovar
          </v-btn>
          <v-btn
            class="text-none white--text"
            color="#FF4C33"
            @click="handleManageStatus(ProjectStatus.REPROVED)"
          >
            Reprovar
          </v-btn>
        </template>
        <v-btn
          v-if="project.status === ProjectStatus.APPROVED"
          class="text-none white--text"
          color="#FF9C33"
          @click="$emit('handle-manage-status', ProjectStatus.DOING)"
        >
          Iniciar projeto
        </v-btn>
        <v-btn
          v-if="project.status === ProjectStatus.DOING || project.status === ProjectStatus.APPROVED"
          color="#33cccc"
          class="text-none white--text"
          @click="$emit('show-manage-groups')"
        >
          Alocar grupos
        </v-btn>
        <v-btn
          v-if="project.status === ProjectStatus.DOING || project.status === ProjectStatus.APPROVED"
          color="#5690E3"
          class="text-none white--text"
          @click="$emit('show-create-tasks')"
        >
          Criar tarefa
        </v-btn>
        <v-btn
          v-if="project.status === ProjectStatus.DOING"
          class="text-none white--text"
          color="#2696E8"
          @click="$emit('handle-manage-status', ProjectStatus.FINISHED)"
        >
          Finalizar projeto
        </v-btn>
        <v-btn
          v-if="project.status === ProjectStatus.FINISHED"
          class="text-none white--text"
          color="#FF9C33"
          @click="$emit('show-add-students-score')"
        >
          Atribuir notas
        </v-btn>
      </div>
      <div class="project__header-title">
        {{ project.name }}
        <v-chip :color="StatusColor[project.status]" class="white--text">
          {{ StatusText[project.status] }}
        </v-chip>
        <v-spacer />
      </div>
    </div>
    <div class="project__header-description">
      {{ project.description }}
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
    },
    isAdmin: {
      type: Boolean,
      default: true
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
  &__header {
    padding: $MAIN_SPACE;
  }
  &__header-actions {
    margin-bottom: $MAIN_SPACE;
    ::v-deep .v-btn:not(:last-child) {
      margin-right: 10px !important;
    }
  }
  &__header-title {
    font-size: 2rem;
    display: flex;
    align-items: center;
    ::v-deep .v-chip {
      margin-left: $MAIN_SPACE;
    }
  }
  &__header-description {
    color: grey;
    margin-top: 8px;
  }
}
@media #{map-get($display-breakpoints, 'md-and-up')}{
  .project {
    &__header-info {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: 'title actions';
    }
    &__header-actions {
      grid-area: actions;
    }
  }
}
</style>
