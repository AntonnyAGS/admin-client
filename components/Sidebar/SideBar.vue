<template>
  <v-navigation-drawer
    app
    mini-variant
    color="primary"
    mobile-breakpoint="600"
    mini-variant-width="80px"
    :value="true"
    :disable-route-watcher="true"
    style="border-top-right-radius: 20px; border-bottom-right-radius: 20px;"
  >
    <div class="sidebar__grid">
      <div style="width: 80px;">
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar class="ma-0">
              <img src="@/assets/images/icon.svg">
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </div>

      <div style="width: 80px;">
        <v-list
          nav
          dense
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            class="mb-5"
            link
            :to="item.to"
            active-class="sidebar__active"
          >
            <v-list-item-icon class="ma-0">
              <v-icon color="white" large>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div class="d-flex align-end" style="width: 80px;">
        <v-list style="width: 100%">
          <v-list-item class="px-2" @click="handleLogout">
            <v-list-item-icon class="ma-0">
              <v-icon color="white" large>
                mdi-logout
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { SidebarItem } from '@/types'

import { useNamespacedActions } from 'vuex-composition-helpers'

import { Actions } from '@/store/config'

export default defineComponent({
  props: {
    items: {
      type: Array as () => SidebarItem[],
      required: true
    }
  },

  setup () {
    const { logout } = useNamespacedActions<Actions>('config', ['logout'])

    const handleLogout = async () => {
      await logout()
    }

    return {
      handleLogout
    }
  }
})
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
