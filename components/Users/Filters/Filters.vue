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
      <div class="user-filters">
        <div class="user-filters__title">
          Filtros
        </div>
        <v-autocomplete
          v-if="showMenu"
          label="Tipo"
          :items="items"
          :value="filter.role"
          multiple
          small-chips
          item-value="value"
          item-text="text"
          style="width: 290px;"
          @input="setFilter"
        >
          <template v-slot:selection="{item}">
            <v-chip small :color="UserRoleColor[item.value]" class="white--text">
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

import { UserRole } from '@/enums'

import { UserRoleColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/users'

export default defineComponent({
  setup () {
    const { filter } = useNamespacedState<State>('users', ['filter'])
    const { setFilters } = useNamespacedActions<Actions>('users', ['setFilters'])

    const items = ref([
      { text: 'Alunos', value: UserRole.STUDENT },
      { text: 'Administradores', value: UserRole.ADMIN },
      { text: 'Clientes', value: UserRole.CLIENT }
    ])

    const showMenu = ref(false)

    const setFilter = (value: UserRole[]) => {
      const filters = JSON.parse(JSON.stringify(filter.value))
      filters.role = value
      setFilters(filters)
    }

    return {
      items,
      showMenu,
      UserRoleColor,
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
