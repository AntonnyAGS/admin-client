<template>
  <v-app>
    <side-bar :items="items" />
    <v-main>
      <v-container fluid class="fill-height">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import SideBar from '@/components/Sidebar'

// Types
import { SidebarItem } from '@/types'

export default defineComponent({
  middleware: 'isAuthenticated',

  name: 'layout',

  components: {
    SideBar
  },

  setup () {
    const items = ref<SidebarItem[]>([
      { to: '/dashboard', icon: 'mdi-home', title: 'home' },
      { to: '/groups', icon: 'mdi-account-multiple', title: 'groups' },
      { to: '/projects', icon: 'mdi-folder', title: 'projects' }
    ])

    return {
      items
    }
  }
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
html {
  overflow-y: auto !important;
  box-sizing: border-box;
  font-size: 16px;
}
@media #{map-get($display-breakpoints, 'md-and-down')}{
  html {
    font-size: 14px;
  }
}
</style>
