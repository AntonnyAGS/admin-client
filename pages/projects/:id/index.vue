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
    <project-header
      :project="project"
      @show-manage-groups="showManageGroupsModal = true"
      @show-add-students-score="showAddStudentScore = true"
      @handle-manage-status="handleManageStatus($event)"
    />
    <v-divider />
    <client :project="project" />
    <v-divider />
    <groups :project="project" />
    <v-divider />
    <docs :files="files" />
    <manage-groups-modal v-model="showManageGroupsModal" :items="groups" :selected-items="project.groups" @handle-submit="handleManageGroups" />
    <add-student-score v-model="showAddStudentScore" :items="project.groups" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

import { ProjectService, DocService } from '@/services'
import { UserPersonText, formatCnpj, formatCpf, StatusText, StatusColor, FileText } from '@/helpers'
import { PersonType, ProjectStatus } from '@/enums'
import moment from 'moment'
import { useNamespacedState } from 'vuex-composition-helpers'

import { State } from '@/store/groups'
import { ManageGroupsModal, Header as ProjectHeader, Client, AddStudentScore, Groups, Docs } from '@/components/Projects'
import { useLoadGroups } from '@/hooks'
import { Project, File, Group } from '~/types'

export default defineComponent({
  components: {
    ManageGroupsModal,
    ProjectHeader,
    Client,
    AddStudentScore,
    Groups,
    Docs
  },

  setup (_, { root: { $route } }) {
    const { groups } = useNamespacedState<State>('groups', ['groups'])
    const { id } = $route.params

    const project = ref<Project>()
    const files = ref<File[]>()

    const showManageGroupsModal = ref(false)
    const showAddStudentScore = ref(false)

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

    getProject()
    getFiles()
    useLoadGroups()

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
      groups,
      showManageGroupsModal,
      handleManageStatus,
      ProjectStatus,
      handleManageGroups,
      showAddStudentScore
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
