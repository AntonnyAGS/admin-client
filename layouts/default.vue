<template>
  <v-app>
    <side-bar :items="items" />
    <v-main>
      <v-container fluid class="main-container fill-height">
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
      { to: '/users', icon: 'mdi-account-multiple', title: 'groups' },
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
@import '@/assets/variables.scss';

html {
  overflow-y: auto !important;
  box-sizing: border-box;
  font-size: 14px;
}

.main-container {
  padding: $LAYOUT_PADDING !important;
}

@media #{map-get($display-breakpoints, 'lg-and-up')}{
  html {
    font-size: 16px;
  }
  .main-container {
    padding: $LAYOUT_PADDING * 3 !important;
  }
}
</style>
