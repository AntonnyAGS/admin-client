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
          <div class="import-students__inner">
            Clique aqui para fazer o upload dos alunos.
          </div>
        </div>
      </div>
      <v-divider />
      <div class="import-students__footer">
        <v-spacer />
        <v-btn color="secondary">
          Concluir
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import * as yup from 'yup'
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

const validateSchema = yup.object().shape<UserForm>({
  name: yup.string().required('Digite o nome'),
  email: yup.string().email('Digite um email válido').required('Digite o email'),
  password: yup.string().required('Digite a senha'),
  password_repeat: yup.string().required('Digite a confirmação de senha'),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)),
  ra: yup.string().required('Digite o RA'),
  phone: yup.string().test('len', 'Digite um telefone válido', (val) => {
    if (typeof val !== 'string' || (val?.length !== 0 && val.length < 14)) {
      return false
    }
    return true
  })

})

export default defineComponent({
  props: {
    value: Boolean,
    loading: Boolean
  },

  directives: {
    mask
  },

  setup (_, { emit, root: { $notify } }) {
    const form = ref<UserForm>({
      name: '',
      email: '',
      password: '123456',
      phone: '',
      ra: '',
      password_repeat: '123456',
      role: UserRole.STUDENT

    })

    const input = ref()

    const handleSubmit = () => {
      try {
        validateSchema.validateSync(form.value, { abortEarly: false })
        if (form.value.phone) {
          form.value.phone = form.value.phone.replace(/[^a-zA-Z0-9]/g, '')
        }
        form.value.email = form.value.email.toLowerCase()
        emit('handle-submit', form.value)
      } catch (error) {
        let title = ''
        if (error.name === 'ValidationError') {
          title = 'Erro de validação'
        }
        $notify({
          title,
          type: 'error',
          text: error.errors[0]
        })
        console.log(error.errors)
      }
    }

    const openFileInput = () => {
      if (input.value) {
        input.value.click()
      }
    }

    return {
      form,
      handleSubmit,
      input,
      openFileInput
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
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: #d9e7ff;
    border-radius: 4px;
  }
  &__footer {
    padding: $MAIN_SPACE;
    display: flex;
  }

}
</style>
