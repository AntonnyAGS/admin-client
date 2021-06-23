<template>
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { File } from '@/types'
import { FileText } from '@/helpers'

import moment from 'moment'

export default defineComponent({
  props: {
    files: {
      type: Array as () => File[],
      required: true
    }
  },
  setup ({ files }) {
    const handleFileDownload = (fileId: string) => {
      if (!files) { return }
      const _file = files.find(({ _id }) => _id === fileId)

      const url = _file?.fileUrl || ''
      const filename = _file?.fileName || ''

      fetch(url)
        .then((t) => {
          return t.blob()
        })
        .then((b) => {
          const downloadUrl = window.URL.createObjectURL(b)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
    }

    return {
      moment,
      FileText,
      handleFileDownload
    }
  }

})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.project {
  font-family: Montserrat;
  &__docs {
    padding: $MAIN_SPACE;
  }
  &__docs-title {
    font-weight: 500;
  }
  &__docs-body {
    display: flex;
    margin-top: 8px;
  }
  &__docs-empty {
    color: grey;
  }
  &__docs-item {
    margin: 0 8px 0 0;
    width: 120px;
    border: 1px solid #d7d7d9;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }
  &__docs-item-header {
    padding: 8px;
    border-bottom: 1px solid #d7d7d9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.8rem;
  }
  &__docs-item-download {
    padding: 8px;
    color: grey;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    cursor: pointer;
  }
  &__docs-item-data {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
}
</style>
