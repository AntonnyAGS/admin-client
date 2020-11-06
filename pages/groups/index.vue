<template>
  <div class="dashboard">
    {{ users }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Cookies from 'js-cookie'
import { UserService } from '@/services'

export default defineComponent({
  setup () {
    const token = Cookies.get(process.env.TOKEN)
    const service = new UserService()
    const users = ref()

    const loadUsers = async () => {
      try {
        users.value = await service.users()
        console.log(users)
      } catch (error) {
        console.log(error)
      }
    }

    loadUsers()
    return {
      users
    }
  }
})
</script>
