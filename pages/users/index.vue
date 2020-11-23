<template>
  <div class="users">
    <div class="users__header">
      <action-card
        title="Crie administradores"
        description="Você pode criar novos administradores para te ajudar."
        image-url="whiteboard.svg"
        class="users__create-admin-card"
      />
      <action-card
        title="Crie novos alunos"
        description="Você pode criar novos alunos para te ajudar."
        image-url="books.svg"
        class="users__create-students-card"
      />
    </div>
    <div class="users__body">
      <data-table
        :headers="headers"
        class="users__table"
        no-data-text="Ainda não há nada aqui."
      />
    </div>
  </div>
</template>
<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import { ActionCard } from '@/components/Cards'
import DataTable from '@/components/Table'

// Services
import { UserService } from '@/services'

export default defineComponent({
  components: { ActionCard, DataTable },

  setup () {
    const service = new UserService()
    const users = ref()

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: 'Email', value: 'email', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false }
    ]

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
      users,
      headers
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
