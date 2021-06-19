<template>
  <div class="header">
    <div class="header__breadcrumbs">
      bread
    </div>
    Header
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {

  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;

  &__title {
    font-size: 1.125rem;
  }
}
</style>
