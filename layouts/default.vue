<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
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
