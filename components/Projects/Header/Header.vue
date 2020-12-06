<template>
  <div class="project__header">
    <div class="project__header-info">
      <div class="project__header-actions">
        <template v-if="project.status === ProjectStatus.WAITING">
          <v-btn icon @click="$emit('handle-manage-status', ProjectStatus.APPROVED)">
            <v-icon>
              fas fa-thumbs-up
            </v-icon>
          </v-btn>
          <v-btn icon @click="handleManageStatus(ProjectStatus.REPROVED)">
            <v-icon>
              fas fa-thumbs-down
            </v-icon>
          </v-btn>
        </template>
        <v-btn v-if="project.status === ProjectStatus.APPROVED" icon @click="$emit('handle-manage-status', ProjectStatus.DOING)">
          <v-icon>
            fas fa-play
          </v-icon>
        </v-btn>
        <v-btn v-if="project.status === ProjectStatus.DOING || project.status === ProjectStatus.APPROVED" icon @click="$emit('show-manage-groups')">
          <v-icon>
            fas fa-users
          </v-icon>
        </v-btn>
        <v-btn v-if="project.status === ProjectStatus.DOING" icon @click="$emit('handle-manage-status', ProjectStatus.FINISHED)">
          <v-icon>
            fas fa-check
          </v-icon>
        </v-btn>
        <v-btn v-if="project.status === ProjectStatus.FINISHED" icon @click="$emit('show-add-students-score')">
          <v-icon>
            fas fa-star
          </v-icon>
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
    margin-top: $MAIN_SPACE;
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
