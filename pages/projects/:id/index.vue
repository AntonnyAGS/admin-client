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
    <div class="project__header">
      <div class="project__header-title">
        {{ project.name }}
        <v-chip :color="StatusColor[project.status]" class="white--text">
          {{ StatusText[project.status] }}
        </v-chip>
      </div>
      <div class="project__header-description">
        {{ project.description }}
      </div>
    </div>
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
        <template v-if="project.groups.length > 0">
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

import { ProjectService, DocService } from '@/services'
import { UserPersonText, formatCnpj, formatCpf, StatusText, StatusColor, FileText } from '@/helpers'
import { PersonType } from '@/enums'
import moment from 'moment'
import { Project, File } from '~/types'

export default defineComponent({
  setup (_, { root: { $route } }) {
    const { id } = $route.params

    const project = ref<Project>()
    const files = ref<File[]>()

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

    const handleFileDownload = (fileId: string) => {
      if (!files.value) { return }
      const _file = files.value.find(({ _id }) => _id === fileId)
      window.open(_file?.fileUrl)
    }

    getProject()
    getFiles()

    const breadcrumbItems = computed(() => {
      return [
        { text: 'Projeto', disabled: false, link: true, exact: true, to: '/projects' },
        { text: project.value?.name, disabled: true }
      ]
    })

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
      handleFileDownload
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
