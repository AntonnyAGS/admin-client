<template>
  <div class="projects">
    <div class="projects__header">
      <cover-card
        title="Gerencie seus projetos"
        description="Gerencie os projetos de extensão de sua instituição."
        image-url="whiteboard.svg"
        class="projects__cover-card"
      />
      <!-- <action-card
        title="Crie novos alunos"
        description="Você pode criar novos alunos para te ajudar."
        image-url="books.svg"
        class="projects__create-students-card"
        @handle-click="showCreateStudent = true"
      /> -->
    </div>
    <div class="projects__body">
      <v-card class="projects__table-card">
        <div class="projects__table-header">
          <div class="projects__table-header__title">
            Projetos
          </div>
          <v-spacer />
          <div class="projects__table-header__action">
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
          :items="filteredProjects"
          class="projects__table"
          no-data-text="Ainda não há nada aqui."
          :footer-total-items="projects ? projects.length : 0"
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
            <v-btn rounded small class="text-capitalize" color="secondary" @click="$router.push(`/projects/${item._id}`)">
              Detalhes
            </v-btn>
          </template>
          <template v-slot:[`item.description`]="{value}">
            <div class="projects__table-description">
              {{ value }}
            </div>
          </template>
        </data-table>
      </v-card>
    </div>
  </div>
</template>
<script lang="ts">
// Libs
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

// Components
import DataTable from '@/components/DataTable'
import { Filters, CoverCard } from '@/components/Projects'

// Services/Helpers/Types
import { ProjectService } from '@/services'
import { StatusText, StatusColor } from '@/helpers'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/projects'

export default defineComponent({
  components: {
    CoverCard,
    DataTable,
    Filters
  },

  setup () {
    const { setProjects } = useNamespacedActions<Actions>('projects', ['setProjects'])
    const { projects, filter } = useNamespacedState<State>('projects', ['projects', 'filter'])

    const loading = ref(false)
    const search = ref('')
    const showSearch = ref(false)
    const showCreateStudent = ref(false)
    const showCreateAdmin = ref(false)

    const headers = [
      { text: 'Nome', value: 'name', sortable: true, align: 'center' },
      { text: 'Descrição', value: 'description', sortable: true, align: 'center', width: '30%' },
      { text: 'Status', value: 'status', sortable: true, align: 'center' },
      { text: '', value: 'action', sortable: false, align: 'center' }
    ]

    const filteredProjects = computed(() => {
      return projects.value.filter((item) => {
        return filter.value.status.includes(item.status)
      })
    })

    const loadProjects = async () => {
      try {
        const service = new ProjectService()
        loading.value = true
        const _projects = await service.projects()
        await setProjects(_projects)
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    loadProjects()
    return {
      projects,
      headers,
      loading,
      search,
      showSearch,
      showCreateStudent,
      StatusText,
      StatusColor,
      filteredProjects,
      showCreateAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
