<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="import-students__title">
        Importar alunos
        <v-spacer />
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <input
        v-show="false"
        ref="input"
        type="file"
        accept=".csv"
        @change="handleFileChange"
      >
      <div class="import-students__body">
        <div class="import-students__card" @click="openFileInput">
          <div v-if="!file" class="import-students__inner">
            Clique aqui para fazer o upload dos alunos.
            <div class="import-students__info">
              Arquivos suportados: csv.
            </div>
            <div class="import-students__info">
              O arquivo deve possuir as seguintes colunas: <span style="font-weight: 500">email, telefone, ra e nome.</span>
            </div>
          </div>
          <div v-else class="import-students__inner">
            {{ file.name }}
          </div>
        </div>
      </div>
      <v-divider />
      <div class="import-students__footer">
        <v-spacer />
        <v-btn color="secondary" @click="handleSubmit">
          Concluir
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { mask } from 'vue-the-mask'

// Types/enums
import { UserRole } from '@/enums'
type UserForm = {
  name: string;
  email: string;
  ra: string;
  password: string;
  // eslint-disable-next-line
  password_repeat: string;
  phone?: string;
  role: UserRole;

}

export default defineComponent({
  props: {
    value: Boolean,
    loading: Boolean
  },

  directives: {
    mask
  },

  setup (_, { emit }) {
    const input = ref()

    const file = ref()

    const handleSubmit = () => {
      if (!file.value) {
        emit('input', false)
        return
      }

      emit('import:file', file.value)
    }

    const handleFileChange = (evt: Event) => {
      const input = evt.target as HTMLInputElement

      if (!input || !input.files) { return }

      file.value = input.files[0]
    }

    const openFileInput = () => {
      if (input.value) {
        input.value.click()
      }
    }

    return {
      handleSubmit,
      input,
      openFileInput,
      handleFileChange,
      file
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.import-students {
  &__title {
    padding: $MAIN_SPACE;
    font-size: 1.4rem;
    font-family: Montserrat;
    display: flex;
  }
  &__body {
    padding: $MAIN_SPACE;
  }
  &__card {
    border: 1px dashed black;

    padding: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  &__inner {
    display: flex;
    flex-direction: column;

    gap: 8px;

    padding: 16px;

    justify-content: center;
    align-items: center;

    text-align: center;

    background: #d9e7ff;
    border-radius: 4px;

    font-weight: 500;
  }
  &__info {
    font-weight: 400;
    font-size: 0.875rem;
  }
  &__footer {
    padding: $MAIN_SPACE;
    display: flex;
  }

}
</style>
