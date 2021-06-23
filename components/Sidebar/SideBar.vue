<template>
  <v-navigation-drawer
    app
    mini-variant
    color="primary"
    expand-on-hover
    mobile-breakpoint="600"
    :value="true"
    :disable-route-watcher="true"
    style="border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
  >
    <div class="sidebar__grid">
      <div class="py-2">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <img src="@/assets/images/icon.svg">
          </v-list-item-avatar>
          <v-list-item-title style="font-weight: 500;">
            Fabrica de software
          </v-list-item-title>
        </v-list-item>
      </div>

      <v-list nav class="pa-0 ma-0">
        <template v-for="item in items">
          <v-list-item
            v-if="!item.isAdminOnly || (item.isAdminOnly && user && user.role === UserRole.ADMIN) "
            :key="item.title"
            link
            class="pa-0 ma-0"
            :to="item.to"
            active-class="sidebar__active"
          >
            <v-list-item-icon class="mx-4">
              <v-icon color="white">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title style="font-weight: 500">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <div class="d-flex align-end py-2" style="width: 100%">
        <v-list nav class="pa-0 ma-0" style="width: 100%">
          <v-list-item class="pa-0 ma-0 logout" to="/my-account">
            <v-list-item-icon class="ma-4">
              <v-icon color="white">
                fas fa-cog
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Configurações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0 ma-0 logout" @click="handleLogout">
            <v-list-item-icon class="ma-4">
              <v-icon color="white">
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-weight: 500">
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SidebarItem } from '@/types'

import { useNamespacedActions, useNamespacedState } from 'vuex-composition-helpers'

import { Actions } from '@/store/config'

import { State } from '@/store/user'

import { UserRole } from '@/enums'

export default defineComponent({
  props: {
    items: {
      type: Array as () => SidebarItem[],
      required: true
    }
  },

  setup () {
    const { logout } = useNamespacedActions<Actions>('config', ['logout'])
    const { user } = useNamespacedState<State>('user', ['user'])

    const handleLogout = () => {
      logout()
    }

    return {
      handleLogout,
      user,
      UserRole
    }
  }
})
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
