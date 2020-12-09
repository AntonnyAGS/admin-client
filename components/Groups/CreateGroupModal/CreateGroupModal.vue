<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create__title">
        Criar grupo
        <v-spacer />
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-form @submit.prevent>
        <div class="create__body">
          <v-text-field
            v-model="form.name"
            label="Nome *"
            placeholder="Digite o nome do grupo"
          />
          <v-autocomplete
            v-model="form.usersIds"
            multiple
            :items="items"
            label="Alunos *"
            item-text="name"
            item-value="_id"
            type="text"
            chips
            deletable-chips
            placeholder="Digite o do aluno"
          />
        </div>
        {{ form.userIds }}
        <v-divider />
        <div class="create__footer">
          <v-spacer />
          <v-btn
            type="submit"
            rounded
            class="text-capitalize"
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
import { User } from '@/types'

type UserForm = {
  name: string;
  usersIds: string[] | any;
}

const validateSchema = yup.object().shape<UserForm>({
  name: yup.string().required('Digite o nome'),
  usersIds: yup.mixed().test('users', 'Informe pelo menos um usuário', (val) => {
    if (val.length === 0) {
      return false
    }
    return true
  })
})

export default defineComponent({
  props: {
    value: Boolean,
    loading: Boolean,
    items: {
      type: Array as () => User[],
      default: () => []
    }
  },

  directives: {
    mask
  },

  setup (_, { emit, root: { $notify } }) {
    const form = ref<UserForm>({
      name: '',
      usersIds: []
    })

    const handleSubmit = () => {
      try {
        validateSchema.validateSync(form.value, { abortEarly: false })

        emit('handle-submit', form.value)
      } catch (error) {
        console.log(error)
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

.create {
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
