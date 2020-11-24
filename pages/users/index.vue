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
        @handle-click="showCreateStudent = true"
      />
    </div>
    <div class="users__body">
      <v-card class="users__table-card">
        <div class="users__table-header">
          <div class="users__table-header__title">
            Usuários
          </div>
          <v-spacer />
          <div class="users__table-header__action">
            <v-text-field
              v-if="showSearch"
              v-model="search"
              label="Pesquisar"
              single-line
              dense
              hide-details
            />
            <v-btn icon>
              <v-icon small color="white" @click="showSearch = !showSearch">
                fas fa-search
              </v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon small color="white">
                fas fa-filter
              </v-icon>
            </v-btn>
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
    <create-student-modal v-model="showCreateStudent" :loading.sync="loading" @handle-submit="handleSubmit" />
  </div>
</template>
<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import { ActionCard } from '@/components/Cards'
import DataTable from '@/components/DataTable'
import CreateStudentModal from '@/components/Users/CreateStudentModal'

// Services
import { UserService } from '@/services'
import { User } from '~/types'

export default defineComponent({
  components: {
    ActionCard,
    DataTable,
    CreateStudentModal
  },

  setup () {
    const service = new UserService()
    const users = ref()
    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateStudent = ref(false)

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

    const handleSubmit = async (user: User) => {
      try {
        loading.value = true
        await service.createStudent(user)
        loadUsers()
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
      showSearch,
      showCreateStudent,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
