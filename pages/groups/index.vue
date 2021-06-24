<template>
  <div class="groups">
    <div class="groups__header">
      <action-card
        title="Gerencie seus grupos"
        description="Crie novos grupos para te auxiliar a gerenciar os projetos."
        image-url="discussion.svg"
        class="groups__cover-card"
        :is-admin="user.role === UserRole.ADMIN"
        @handle-click="showCreateGroup = true"
      />
    </div>
    <div class="groups__body">
      <v-card class="groups__table-card">
        <div class="groups__table-header">
          <div class="groups__table-header__title">
            Grupos
          </div>
          <v-spacer />
          <div class="groups__table-header__action">
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
              <v-icon small color="white" @click="showSearch = !showSearch, search = ''">
                fas fa-search
              </v-icon>
            </v-btn>
          </div>
        </div>
        <data-table
          :loading="loading"
          :headers="headers"
          :items="groups"
          class="groups__table"
          no-data-text="Ainda não há nada aqui."
          :footer-total-items="groups ? groups.length : 0"
          :search="search"
          no-results-text="Nada encontrado."
          loading-text="Carregando..."
        >
          <template v-slot:[`item.action`]="{item}">
            <v-btn class="text-none" color="secondary" @click="handleEditGroup(item)">
              Detalhes
            </v-btn>
          </template>
        </data-table>
      </v-card>
    </div>
    <create-group-modal
      v-if="showCreateGroup"
      v-model="showCreateGroup"
      :items="users.filter(({ role }) => role === UserRole.STUDENT)"
      @handle-submit="handleCreateGroup"
    />
    <edit-group-modal
      v-if="showEditGroup"
      v-model="showEditGroup"
      :is-admin="user.role === UserRole.ADMIN"
      :items="users.filter(({ role }) => role === UserRole.STUDENT)"
      :group="selectedGroup"
      @handle-submit="handleUpdate"
    />
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import DataTable from '@/components/DataTable'
import ActionCard from '@/components/Cards/ActionCard'
import { CreateGroupModal, EditGroupModal } from '@/components/Groups'

// Services/Helpers/Types
import { GroupService, UserService } from '@/services'
import { CreateGroupVars, UpdateGroupVars } from '@/services/GroupService'
import { StatusText, StatusColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/groups'
import { State as UsersState, Actions as UsersActions } from '@/store/users'
import { State as UserState } from '@/store/user'

import { UserRole } from '@/enums'
import { Group } from '~/types'
import { useNotify } from '~/hooks'

export default defineComponent({
  components: {
    ActionCard,
    DataTable,
    CreateGroupModal,
    EditGroupModal
  },

  setup () {
    const { setGroups } = useNamespacedActions<Actions>('groups', ['setGroups'])
    const { groups } = useNamespacedState<State>('groups', ['groups'])

    const { setUsers } = useNamespacedActions<UsersActions>('users', ['setUsers'])
    const { users } = useNamespacedState<UsersState>('users', ['users'])
    const { user } = useNamespacedState<UserState>('user', ['user'])

    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateGroup = ref(false)
    const showEditGroup = ref(false)
    const selectedGroup = ref<Group>()

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false, align: 'center' }
    ]

    const notify = useNotify()

    const loadGroups = async () => {
      try {
        loading.value = true
        const service = new GroupService()
        const _groups = await service.groups()
        await setGroups(_groups)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }
    loadGroups()

    const loadUsers = async () => {
      try {
        loading.value = true
        const service = new UserService()
        const _users = await service.users()
        await setUsers(_users)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    loadUsers()

    const handleCreateGroup = async (group: CreateGroupVars) => {
      try {
        loading.value = true
        const service = new GroupService()
        await service.create(group)
        showCreateGroup.value = false

        notify({
          title: 'Grupo criado com sucesso',
          type: 'success'
        })

        await loadGroups()
      } catch (error) {
        notify({
          title: 'Erro ao cadastrar grupo',
          text: error,
          type: 'error'
        })
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    const handleEditGroup = (item: Group) => {
      selectedGroup.value = item
      showEditGroup.value = true
    }

    const handleUpdate = async (group: UpdateGroupVars) => {
      try {
        loading.value = true
        const service = new GroupService()
        await service.update(group)
        showEditGroup.value = false

        notify({
          title: 'Grupo atualizado com sucesso',
          type: 'success'
        })

        await loadGroups()
      } catch (error) {
        notify({
          title: 'Erro ao atualizar grupo',
          text: error,
          type: 'error'
        })
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      groups,
      headers,
      loading,
      search,
      showSearch,
      showCreateGroup,
      StatusText,
      StatusColor,
      users,
      UserRole,
      handleCreateGroup,
      showEditGroup,
      handleEditGroup,
      selectedGroup,
      handleUpdate,
      user
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
