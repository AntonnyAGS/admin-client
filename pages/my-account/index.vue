<template>
  <v-card class="my-account">
    <page-header />
    <v-divider />
    <div class="my-account__body">
      <div class="my-account__title">
        Informações pessoais
      </div>
      <v-form class="my-account__form" @submit.prevent>
        <v-text-field
          v-model="email"
          dense
          hide-details
          background-color="white"
          placeholder="Email"
          outlined
        />
        <v-text-field
          v-model="fullName"
          hide-details
          placeholder="Nome completo"
          background-color="white"
          dense
          outlined
        />
        <v-text-field
          v-model="phone"
          v-mask="'(##) #####-#####'"
          hide-details
          placeholder="Telefone"
          background-color="white"
          dense
          outlined
        />
        <v-text-field
          v-model="actualPassword"
          hide-details
          placeholder="Senha atual"
          background-color="white"
          dense
          outlined
          :append-icon="showActualPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          :type="showActualPassword ? 'text' : 'password'"
          @click:append="showActualPassword = !showActualPassword"
        />
        <v-text-field
          v-model="newPassword"
          hide-details
          placeholder="Nova senha"
          background-color="white"
          dense
          outlined
          :append-icon="showNewPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          :type="showNewPassword ? 'text' : 'password'"
          @click:append="showNewPassword = !showNewPassword"
        />

        <div class="d-flex mt-4">
          <v-btn color="secondary" @click="handleSubmit">
            Salvar
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import { Header as PageHeader } from '@/components/MyAccount'

import { useNamespacedState, useNamespacedActions } from 'vuex-composition-helpers'

import { State, Actions } from '@/store/user'
import { mask } from 'vue-the-mask'
import { useNotify } from '@/hooks'
import { validateEmail, formatPhone } from '~/helpers'
import { UserService } from '~/services'

export default defineComponent({
  components: {
    PageHeader
  },

  directives: {
    mask
  },

  setup () {
    const { user } = useNamespacedState<State>('user', ['user'])
    const { setUser } = useNamespacedActions<Actions>('user', ['setUser'])

    const notify = useNotify()

    const email = ref(user.value?.email)
    const actualPassword = ref()
    const newPassword = ref()
    const fullName = ref(user.value?.name)
    const phone = ref(formatPhone(user.value?.phone || ''))

    const showNewPassword = ref(false)
    const showActualPassword = ref(false)

    const rules = {
      email: [
        (v: string) => validateEmail(v) || 'Digite um email válido'
      ],
      password: [
        (v: string) => (!!v && v.length > 5) || 'Digite uma senha válida'
      ]
    }

    const handleSubmit = async () => {
      try {
        const service = new UserService()

        const user = await service.updateLoggedUser({
          email: email.value,
          newPassword: newPassword.value,
          currentPassword: actualPassword.value,
          name: fullName.value,
          phone: phone.value.replace(/[^\d]+/g, '')
        })

        setUser(user)

        notify({
          title: 'Usuário atualizado',
          text: 'Sua conta foi atualizada com sucesso!',
          type: 'success'
        })
      } catch (error) {
        notify({
          title: 'Erro ao atualizar usuário',
          text: error.message,
          type: 'error'
        })
      }
    }

    return {
      email,
      actualPassword,
      newPassword,
      fullName,
      showActualPassword,
      showNewPassword,
      handleSubmit,
      rules,
      phone
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
