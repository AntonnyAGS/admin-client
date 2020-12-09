<template>
  <div class="user__header">
    <div class="user__header-title">
      {{ user.name }}
      <v-spacer />
    </div>
    <div class="user__header-description">
      <div v-if="user.role === UserRole.STUDENT">
        {{ user.ra }}
      </div>
      <div>
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { User } from '@/types'
import { StatusColor, StatusText } from '@/helpers'
import { UserRole } from '@/enums'

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },

  setup () {
    return {
      StatusColor,
      StatusText,
      UserRole
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
  &__header {
    padding: $MAIN_SPACE;
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
// @media #{map-get($display-breakpoints, 'md-and-up')}{
//   .project {
//     &__header-info {
//       display: grid;
//       grid-template-columns: 1fr auto;
//       grid-template-areas: 'title actions';
//     }
//     &__header-actions {
//       grid-area: actions;
//     }
//   }
// }
</style>
