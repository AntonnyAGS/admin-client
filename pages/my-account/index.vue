<template>
  <div class="my-account">
    <page-header />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { Header as PageHeader } from '@/components/MyAccount'

export default defineComponent({
  components: {
    PageHeader
  },

  setup () {

  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

.my-account {
  height: 100%;
  width: 100%;

  background: $MAIN_GREY;
}
</style>
