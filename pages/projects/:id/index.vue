<template>
  <v-card v-if="project" class="fill-height project">
    <div class="project__breadcrumbs">
      Você está aqui:
      <v-breadcrumbs
        class="pa-0"
        :items="breadcrumbItems"
        style="margin-left: 15px;"
        divider=">"
      />
    </div>
    <v-divider />
    <project-header :project="project" @show-manage-groups="showManageGroupsModal = true" />
    <v-divider />
    <div class="project__client">
      <div class="project__client-title">
        Dados do cliente
      </div>
      <div class="project__client-info">
        {{ project.client.name }} ({{ project.client.email }}) - {{ UserPersonText[project.client.personType] }}
        -
        {{ project.client.personType === PersonType.COMPANY ? formatCnpj(project.client.cnpj) : formatCpf(project.client.cpf) }}
      </div>
    </div>
    <v-divider />
    <div class="project__groups">
      <div class="project__groups-title">
        Grupos
      </div>
      <div class="project__groups-body">
        <template v-if="project.groups && project.groups.length > 0">
          <v-chip v-for="group in project.groups" :key="group._id" color="#ff9700" class="white--text">
            {{ group.name }}
          </v-chip>
        </template>
        <div v-else class="project__groups-empty">
          Ainda não há nenhum grupo alocado para este projeto.
        </div>
      </div>
    </div>
    <v-divider />
    <div class="project__docs">
      <div class="project__docs-title">
        Documentos
      </div>
      <div class="project__docs-body">
        <div v-if="files && files.length === 0" class="project__docs-empty">
          Ainda não há documentos para este projeto.
        </div>
        <div v-for="file in files" :key="file._id" class="project__docs-item">
          <div class="project__docs-item-header">
            {{ FileText[file.fileType] }}
          </div>
          <div class="project__docs-item-download" @click="handleFileDownload(file._id)">
            {{ file.fileName }}
            <div class="project__docs-item-data">
              {{ moment(file.createdAt).format('DD/MM/YYYY') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <manage-groups-modal v-model="showManageGroupsModal" :items="groups" :selected-items="project.groups" @handle-submit="handleManageGroups" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

import { ProjectService, DocService, GroupService } from '@/services'
import { UserPersonText, formatCnpj, formatCpf, StatusText, StatusColor, FileText } from '@/helpers'
import { PersonType, ProjectStatus } from '@/enums'
import moment from 'moment'
import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/groups'
import { ManageGroupsModal, Header as ProjectHeader } from '@/components/Projects'
import { Project, File, Group } from '~/types'

export default defineComponent({
  components: {
    ManageGroupsModal,
    ProjectHeader
  },

  setup (_, { root: { $route } }) {
    const { setGroups } = useNamespacedActions<Actions>('groups', ['setGroups'])
    const { groups } = useNamespacedState<State>('groups', ['groups'])
    const { id } = $route.params

    const project = ref<Project>()
    const files = ref<File[]>()

    const showManageGroupsModal = ref(false)

    const getProject = async () => {
      try {
        const service = new ProjectService()
        project.value = await service.project(id)
      } catch (error) {
        console.log(error)
      }
    }

    const getFiles = async () => {
      try {
        const service = new DocService()
        files.value = await service.doc(id)
      } catch (error) {
        console.log(error)
      }
    }

    const loadGroups = async () => {
      try {
        const service = new GroupService()
        const _groups = await service.groups()
        await setGroups(_groups)
      } catch (error) {
        console.log(error)
      }
    }

    const handleFileDownload = (fileId: string) => {
      if (!files.value) { return }
      const _file = files.value.find(({ _id }) => _id === fileId)
      window.open(_file?.fileUrl)
    }

    getProject()
    getFiles()
    loadGroups()

    const breadcrumbItems = computed(() => {
      return [
        { text: 'Projeto', disabled: false, link: true, exact: true, to: '/projects' },
        { text: project.value?.name, disabled: true }
      ]
    })

    const handleManageStatus = async (status: ProjectStatus) => {
      if (!project.value) { return }
      const service = new ProjectService()
      await service.updateProject({ ...project.value, status })
      project.value.status = status
    }

    const handleManageGroups = async (_groups: Group[]) => {
      if (!project.value) { return }
      const groupsId = _groups.map(_id => _id)
      const service = new ProjectService()
      await service.updateProject({ ...project.value, groupsId })
      project.value.groups = _groups
      showManageGroupsModal.value = false
    }

    return {
      getProject,
      project,
      breadcrumbItems,
      UserPersonText,
      PersonType,
      formatCnpj,
      formatCpf,
      StatusText,
      StatusColor,
      files,
      FileText,
      moment,
      handleFileDownload,
      groups,
      showManageGroupsModal,
      handleManageStatus,
      ProjectStatus,
      handleManageGroups
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
