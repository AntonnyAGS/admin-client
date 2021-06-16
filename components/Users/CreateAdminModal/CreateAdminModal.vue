<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create-admin__title">
        Criar administrador
        <v-spacer />
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-form @submit.prevent>
        <div class="create-admin__body">
          <v-text-field
            v-model="form.name"
            label="Nome *"
            placeholder="Digite o nome do aluno"
          />
          <v-text-field
            v-model="form.email"
            label="Email *"
            type="text"
            placeholder="Digite o email do aluno"
          />

          <div class="create-admin__password-obs">
            <strong>Atenção:</strong> todos os administradores serão criados com a senha '123456' como padrão.
          </div>
        </div>
        <v-divider />
        <div class="create-admin__footer">
          <v-spacer />
          <v-btn
            type="submit"
            class="text-none"
            color="secondary"
            :loading="loading"
            @click="handleSubmit"
          >
            Salvar
          </v-btn>
        </div>
      </v-form>
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
  password: string;
  // eslint-disable-next-line
  password_repeat: string;
  role: UserRole;

}

const validateSchema = yup.object().shape<UserForm>({
  name: yup.string().required('Digite o nome'),
  email: yup.string().email('Digite um email válido').required('Digite o email'),
  password: yup.string().required('Digite a senha'),
  password_repeat: yup.string().required('Digite a confirmação de senha'),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole))
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
      password_repeat: '123456',
      role: UserRole.ADMIN

    })

    const handleSubmit = () => {
      try {
        validateSchema.validateSync(form.value, { abortEarly: false })
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

    return {
      form,
      handleSubmit
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.create-admin {
  &__title {
    padding: $MAIN_SPACE;
    font-size: 1.4rem;
    font-family: Montserrat;
    display: flex;
  }
  &__body {
    padding: $MAIN_SPACE;
  }
  &__footer {
    padding: $MAIN_SPACE;
    display: flex;
  }
  &__password-obs {
    text-align: center;
    opacity: 0.5;
  }
}
</style>
