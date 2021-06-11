<template>
  <div class="users">
    <div class="users__header">
      <action-card
        title="Crie administradores"
        description="Você pode criar novos administradores para te ajudar."
        image-url="whiteboard.svg"
        class="users__create-admin-card"
        @handle-click="showCreateAdmin = true"
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
              style="margin-left: 15px;"
            />
            <v-btn icon>
              <v-icon small color="white" @click="showSearch = !showSearch">
                fas fa-search
              </v-icon>
            </v-btn>
            <filters />
          </div>
        </div>
        <data-table
          :loading="loading"
          :headers="headers"
          :items="filteredUsers"
          class="users__table"
          no-data-text="Ainda não há nada aqui."
          :footer-total-items="users ? users.length : 0"
          :search="search"
          no-results-text="Nada encontrado."
          loading-text="Carregando..."
        >
          <template v-slot:[`item.role`]="{item}">
            <v-chip :color="UserRoleColor[item.role]" class="white--text">
              {{ UserRoleText[item.role] }}
            </v-chip>
          </template>
          <template v-slot:[`item.action`]="{item}">
            <v-btn class="text-capitalize" color="secondary" @click="$router.push(`/users/${item._id}`)">
              Detalhes
            </v-btn>
          </template>
        </data-table>
      </v-card>
    </div>
    <create-student-modal v-if="showCreateStudent" v-model="showCreateStudent" :loading.sync="loading" @handle-submit="handleCreateStudent" />
    <create-admin-modal v-if="showCreateAdmin" v-model="showCreateAdmin" :loading.sync="loading" @handle-submit="handleCreateAdmin" />
  </div>
</template>
<script lang="ts">
// Libs
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

// Components
import { ActionCard } from '@/components/Cards'
import DataTable from '@/components/DataTable'
import { Filters, CreateStudentModal, CreateAdminModal } from '@/components/Users'

// Services/Helpers/Types
import { UserService } from '@/services'
import { UserRoleText, UserRoleColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/users'
import { UserRole } from '@/enums'
import { User } from '~/types'

export default defineComponent({
  components: {
    ActionCard,
    DataTable,
    CreateStudentModal,
    CreateAdminModal,
    Filters
  },

  setup (_, { root: { $notify, $route } }) {
    const { setUsers, setFilters } = useNamespacedActions<Actions>('users', ['setUsers', 'setFilters'])
    const { users, filter } = useNamespacedState<State>('users', ['users', 'filter'])

    const { role } = $route.query

    if (role && Object.values(UserRole).includes(role as UserRole)) {
      setFilters({ role: [role as UserRole] })
    } else {
      setFilters({ role: Object.values(UserRole) })
    }

    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateStudent = ref(false)
    const showCreateAdmin = ref(false)

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: 'Email', value: 'email', sortable: true, align: 'center' },
      { text: 'Tipo', value: 'role', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false, align: 'center' }
    ]

    const filteredUsers = computed(() => {
      return users.value.filter((item) => {
        return filter.value.role.includes(item.role)
      })
    })

    const loadUsers = async () => {
      try {
        const service = new UserService()
        loading.value = true
        const _users = await service.users()
        await setUsers(_users)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    const handleCreateStudent = async (user: User) => {
      try {
        const service = new UserService()
        loading.value = true
        await service.createStudent(user)
        showCreateStudent.value = false
        $notify({
          title: 'Aluno criado com sucesso!',
          text: 'Seu novo aluno foi criado com sucesso.'
        })
        loadUsers()
      } catch (error) {
        $notify({
          title: 'Erro ao criar aluno!',
          text: error.message,
          type: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    const handleCreateAdmin = async (user: User) => {
      try {
        const service = new UserService()
        loading.value = true
        await service.createAdmin(user)
        showCreateAdmin.value = false
        $notify({
          title: 'Administrador criado com sucesso!',
          text: 'Seu novo administrador foi criado com sucesso.'
        })
        loadUsers()
      } catch (error) {
        console.log(error)
        $notify({
          title: 'Erro ao criar administrador!',
          text: error.message,
          type: 'error'
        })
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
      handleCreateStudent,
      UserRoleText,
      UserRoleColor,
      filteredUsers,
      showCreateAdmin,
      handleCreateAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
