<template>
  <v-menu v-model="showMenu" offset-y left :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon small color="white">
          fas fa-filter
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <div v-if="showMenu" class="user-filters">
        <div class="user-filters__title">
          Filtros
        </div>
        <v-autocomplete
          label="Tipo"
          :items="items"
          :value="filter.status"
          multiple
          small-chips
          item-value="value"
          item-text="text"
          style="width: 290px; margin-top: 15px;"
          @input="setFilter"
        >
          <template v-slot:selection="{item}">
            <v-chip small :color="StatusColor[item.value]" class="white--text">
              {{ item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { ProjectStatus } from '@/enums'

import { StatusText, StatusColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/projects'

export default defineComponent({
  setup () {
    const { filter } = useNamespacedState<State>('projects', ['filter'])
    const { setFilter: setFilters } = useNamespacedActions<Actions>('projects', ['setFilter'])

    const items = ref([
      { text: StatusText[ProjectStatus.WAITING], value: ProjectStatus.WAITING },
      { text: StatusText[ProjectStatus.APPROVED], value: ProjectStatus.APPROVED },
      { text: StatusText[ProjectStatus.FINISHED], value: ProjectStatus.FINISHED },
      { text: StatusText[ProjectStatus.REPROVED], value: ProjectStatus.REPROVED },
      { text: StatusText[ProjectStatus.DOING], value: ProjectStatus.DOING }
    ])

    const showMenu = ref(false)

    const setFilter = (value: ProjectStatus[]) => {
      const filters = JSON.parse(JSON.stringify(filter.value))
      filters.status = value
      setFilters(filters)
    }

    return {
      items,
      showMenu,
      StatusColor,
      filter,
      setFilter
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';

.user-filters {
  padding: $MAIN_SPACE;
  &__title {
    font-size: 1.2rem;
    font-weight: 500;
  }
}
</style>
