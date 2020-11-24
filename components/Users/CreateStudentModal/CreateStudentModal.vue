<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create-student__title">
        Criar aluno
        <v-spacer />
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-form @submit.prevent>
        <div class="create-student__body">
          <v-text-field
            v-model="form.name"
            label="Nome"
            placeholder="Digite o nome do aluno"
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="text"
            placeholder="Digite o email do aluno"
          />
          <v-text-field
            v-model="form.phone"
            label="Telefone"
            placeholder="Digite o telefone do aluno"
          />

          <div class="create-student__password-obs">
            <strong>Atenção:</strong> todos os alunos serão criados com a senha '123456' como padrão.
          </div>
        </div>
        <v-divider />
        <div class="create-student__footer">
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

import { UserRole } from '@/enums'

export default defineComponent({
  props: {
    value: Boolean,
    loading: Boolean
  },

  setup (_, { emit }) {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      password: '123456',
      password_repeat: '123456',
      role: UserRole.STUDENT
    })

    const handleSubmit = () => {
      console.log('entrei')
      emit('handle-submit', form.value)
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

.create-student {
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
