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
    <docs v-if="files" :files="files" />
    <manage-groups-modal v-if="showManageGroupsModal" v-model="showManageGroupsModal" :items="groups" :selected-items="project.groups" @handle-submit="handleManageGroups" />
    <add-student-score
      v-if="showAddStudentScore"
      v-model="showAddStudentScore"
      :items="project.groups"
      :scores="scores"
      :project="project"
      @handle-submit="handleCreateScores"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

import { ProjectService, DocService, ScoreService } from '@/services'
import { UserPersonText, formatCnpj, formatCpf, StatusText, StatusColor, FileText } from '@/helpers'
import { PersonType, ProjectStatus } from '@/enums'
import moment from 'moment'
import { useNamespacedState } from 'vuex-composition-helpers'

import { State } from '@/store/groups'
import { ManageGroupsModal, Header as ProjectHeader, Client, AddStudentScore, Groups, Docs } from '@/components/Projects'
import { useLoadGroups } from '@/hooks'
import { Project, File, Group, Score } from '~/types'

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
    const scores = ref<Score[]>()

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

    const getScores = async () => {
      try {
        const service = new ScoreService()
        scores.value = await service.scores(id)
      } catch (error) {
        console.log(error)
      }
    }

    getProject()
    getFiles()
    useLoadGroups()
    getScores()

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

    const handleCreateScores = async (_scores: Score[]) => {
      try {
        const service = new ScoreService()
        const newScores = _scores.filter(s => !s._id)
        const updatedScores = _scores.filter(s => s._id)

        if (newScores.length > 0) {
          await service.create(newScores)
        }
        if (updatedScores.length > 0) {
          await service.update(updatedScores)
        }
        showAddStudentScore.value = false
        scores.value = _scores
      } catch (error) {
        console.log(error)
      }
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
      showAddStudentScore,
      scores,
      handleCreateScores
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
