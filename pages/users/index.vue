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
      <v-card class="users__table-card">
        <div class="users__table-header">
          <div class="users__table-header__title">
            Usuários
          </div>
          <v-spacer />
          <!-- <v-text-field hide-details dense /> -->
          <div class="users__table-header__action" style="margin-left: 15px">
            <v-text-field
              v-if="showSearch"
              v-model="search"
              label="Pesquisar"
              single-line
              dense
              hide-details
            />
            <v-icon small color="white" style="margin-left: 15px" @click="showSearch = !showSearch">
              fas fa-search
            </v-icon>
            <v-icon small color="white" style="margin-left: 15px">
              fas fa-filter
            </v-icon>
          </div>
        </div>
        <data-table
          :loading="loading"
          :headers="headers"
          :items="users"
          class="users__table"
          no-data-text="Ainda não há nada aqui."
          :footer-total-items="users ? users.length : 0"
          :search="search"
          no-results-text="Nada encontrado."
          loading-text="Carregando..."
        />
      </v-card>
    </div>
  </div>
</template>
<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import { ActionCard } from '@/components/Cards'
import DataTable from '@/components/DataTable'

// Services
import { UserService } from '@/services'

export default defineComponent({
  components: {
    ActionCard,
    DataTable
  },

  setup () {
    const service = new UserService()
    const users = ref()
    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: 'Email', value: 'email', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false }
    ]

    const loadUsers = async () => {
      try {
        loading.value = true
        users.value = await service.users()
        console.log(users)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    loadUsers()
    return {
      users,
      headers,
      loading,
      search,
      showSearch
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
