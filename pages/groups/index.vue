<template>
  <div class="groups">
    <div class="groups__header">
      <action-card
        title="Gerencie seus grupos"
        description="Crie novos grupos para te auxiliar a gerenciar os projetos."
        image-url="discussion.svg"
        class="groups__cover-card"
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
              <v-icon small color="white" @click="showSearch = !showSearch">
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
          <template v-slot:[`item.status`]="{item}">
            <v-chip :color="StatusColor[item.status]" class="white--text">
              {{ StatusText[item.status] }}
            </v-chip>
          </template>
          <template v-slot:[`item.action`]="{item}">
            <v-btn rounded small class="text-capitalize" color="secondary">
              Detalhes
            </v-btn>
          </template>
        </data-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'

// Components
import DataTable from '@/components/DataTable'
import ActionCard from '@/components/Cards/ActionCard'

// Services/Helpers/Types
import { GroupService } from '@/services'
import { StatusText, StatusColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/groups'

export default defineComponent({
  components: {
    ActionCard,
    DataTable
  },

  setup () {
    const { setGroups } = useNamespacedActions<Actions>('groups', ['setGroups'])
    const { groups } = useNamespacedState<State>('groups', ['groups'])

    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateStudent = ref(false)
    const showCreateAdmin = ref(false)

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: 'Descrição', value: 'description', sortable: true, align: 'center' },
      { text: 'Status', value: 'status', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false, align: 'center' }
    ]

    const loadProjects = async () => {
      try {
        const service = new GroupService()
        loading.value = true
        const _groups = await service.groups()
        await setGroups(_groups)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    loadProjects()
    return {
      groups,
      headers,
      loading,
      search,
      showSearch,
      showCreateStudent,
      StatusText,
      StatusColor,
      showCreateAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
