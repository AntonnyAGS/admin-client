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
      :is-admin="user && user.role === UserRole.ADMIN"
      :project="project"
      @show-manage-groups="showManageGroupsModal = true"
      @show-add-students-score="showAddStudentScore = true"
      @show-create-tasks="showCreateTasks = true"
      @handle-manage-status="handleManageStatus($event)"
    />
    <v-divider />
    <client :project="project" />
    <v-divider />
    <groups :project="project" />
    <v-divider />
    <student-score v-if="user && user.role === UserRole.STUDENT" :score="studentScore" />
    <v-divider v-if="user && user.role === UserRole.STUDENT" />
    <docs v-if="files" :files="files" />
    <v-divider />
    <tasks :tasks="tasks" @click:task="handleOpenEditTask" />
    <manage-groups-modal v-if="showManageGroupsModal" v-model="showManageGroupsModal" :items="groups" :selected-items="project.groups" @handle-submit="handleManageGroups" />
    <add-student-score
      v-if="showAddStudentScore"
      v-model="showAddStudentScore"
      :items="project.groups"
      :scores="scores"
      :project="project"
      @handle-submit="handleCreateScores"
    />
    <create-tasks-modal
      v-if="showCreateTasks"
      v-model="showCreateTasks"
      :is-admin="user && user.role === UserRole.ADMIN"
      :groups="project.groups"
      :task.sync="task"
      @input="task = {}"
      @handle-submit="handleCreateTask"
      @handle-edit="handleEditTask"
    />
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

import { ProjectService, DocService, ScoreService } from '@/services'
import { UserPersonText, formatCnpj, formatCpf, StatusText, StatusColor, FileText } from '@/helpers'
import { PersonType, ProjectStatus, UserRole } from '@/enums'
import moment from 'moment'
import { useNamespacedState } from 'vuex-composition-helpers'

import { State } from '@/store/groups'
import { State as UserState } from '@/store/user'
import {
  ManageGroupsModal,
  Header as ProjectHeader,
  Client,
  AddStudentScore,
  Groups,
  Docs,
  StudentScore,
  Tasks,
  CreateTasksModal
} from '@/components/Projects'
import { useLoadGroups, useNotify } from '@/hooks'
import { TaskFactory, TaskInputFactory } from '@/factories/task-factory'
import { Project, File, Group, Score, Task } from '~/types'
import TaskService from '~/services/TaskService'

export default defineComponent({
  components: {
    ManageGroupsModal,
    ProjectHeader,
    Client,
    AddStudentScore,
    Groups,
    Docs,
    StudentScore,
    Tasks,
    CreateTasksModal
  },

  setup (_, { root: { $route } }) {
    const { user } = useNamespacedState<UserState>('user', ['user'])
    const { groups } = useNamespacedState<State>('groups', ['groups'])
    const { id } = $route.params

    const project = ref<Project>()
    const files = ref<File[]>()
    const scores = ref<Score[]>()

    const task = ref<Task>()
    const tasks = ref<Task[]>()

    const showManageGroupsModal = ref(false)
    const showAddStudentScore = ref(false)

    const showCreateTasks = ref(false)

    const notify = useNotify()

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

    const getTasks = async () => {
      try {
        const service = new TaskService()

        tasks.value = await service.get(id)
      } catch (err) {
        console.error(err)
      }
    }

    getProject()
    getFiles()
    useLoadGroups()
    getScores()
    getTasks()

    const studentScore = computed(() => {
      if (user.value?.role !== UserRole.STUDENT) {
        return
      }

      return scores.value && scores.value.length > 0 ? scores.value[0] : {}
    })

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
      project.value.groupsId = _groups.map(g => g._id)
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

    const handleCreateTask = async () => {
      try {
        if (!task.value) { return }

        const input = TaskInputFactory.build(task.value, id)

        const service = new TaskService()

        await service.create(input)

        getTasks()

        notify({
          title: 'Tarefa cadastrada com sucesso!',
          type: 'success'
        })
      } catch (err) {
        const message = err.response.data.message ? err.response.data.message : 'Por favor, contate o administrador'

        notify({
          title: 'Não foi possível cadastrar a tarefa',
          type: 'error',
          text: message
        })
      }
    }

    const handleEditTask = async () => {
      try {
        if (!task.value) { return }

        const input = TaskInputFactory.build(task.value, id)

        const service = new TaskService()

        await service.update(input, task.value._id || '')

        getTasks()

        notify({
          title: 'Tarefa cadastrada com sucesso!',
          type: 'success'
        })
      } catch (err) {
        const message = err.response.data.message ? err.response.data.message : 'Por favor, contate o administrador'

        notify({
          title: 'Não foi possível cadastrar a tarefa',
          type: 'error',
          text: message
        })
      }
    }

    const handleOpenEditTask = (selected: Task) => {
      task.value = TaskFactory.build(selected)

      showCreateTasks.value = true
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
      handleCreateScores,
      user,
      UserRole,
      studentScore,
      showCreateTasks,
      task,
      handleCreateTask,
      tasks,
      handleOpenEditTask,
      handleEditTask
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
