<template>
  <div class="dashboard">
    {{ token }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Cookies from 'js-cookie'

export default defineComponent({
  setup () {
    const token = Cookies.get(process.env.TOKEN)

    return {
      token
    }
  }
})
</script>
