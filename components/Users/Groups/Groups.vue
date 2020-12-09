<template>
  <div class="user__groups">
    <div class="user__groups-title">
      Grupos
    </div>
    <div class="user__groups-body">
      <template v-if="groups && groups.length > 0">
        <v-chip v-for="group in groups" :key="group._id" color="#ff9700" class="white--text">
          {{ group.name }}
        </v-chip>
      </template>
      <div v-else class="user__groups-empty">
        Ainda não há nenhum grupo em que este usuário esteja alocado.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { Group } from '@/types'
import { StatusColor, StatusText } from '@/helpers'
import { ProjectStatus } from '@/enums'

export default defineComponent({
  props: {
    groups: {
      type: Array as () => Group[],
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
