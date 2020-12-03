<template>
  <div>
    oi
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { ProjectService } from '@/services'

export default defineComponent({
  setup (_, { root: { $route } }) {
    const { id } = $route.params

    const service = new ProjectService()
    service.project(id)
  }
})

</script>
