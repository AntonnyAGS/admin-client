<template>
  <div class="login fill-height">
    <div class="login__container">
      <div class="d-flex align-center justify-center">
        <img src="@/assets/images/icon.svg" alt="">
      </div>
      <div class="login__title mt-12">
        Bem vindo (a)
      </div>
      <v-form ref="form" @submit.prevent>
        <v-text-field
          v-model="email"
          label="Email"
          color="secondary"
          placeholder="Digite seu email aqui..."
          background-color="white"
          type="text"
          style="border-radius: 0 !important"
          class="login__textfield"
          :rules="rules.email"
          filled
        >
          <template v-slot:prepend-inner>
            <v-icon color="secondary" class="mr-5">
              fas fa-envelope
            </v-icon>
          </template>
        </v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          color="secondary"
          placeholder="Digite sua senha aqui..."
          background-color="white"
          style="border-radius: 0 !important"
          :type="!showPassword ? 'password' : 'text'"
          :append-icon="!showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
          filled
          class="login__textfield"
          :rules="rules.password"
          @click:append="showPassword = !showPassword"
        >
          <template v-slot:prepend-inner>
            <v-icon color="secondary" class="mr-5">
              fas fa-lock
            </v-icon>
          </template>
        </v-text-field>
        <div class="login__forgot">
          Esqueceu sua senha? <nuxt-link to="#" class="white--text">
            Clique aqui
          </nuxt-link>
        </div>
        <v-btn
          type="submit"
          block
          height="50px"
          color="secondary"
          :loading="loading"
          @click="handleSubmit"
        >
          Entrar
        </v-btn>
      </v-form>
      <div>
        oi
      </div>
    </div>
    <v-snackbar v-model="error.show">
      <div class="text-center">
        {{ error.message }}
      </div>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { validateEmail } from '@/helpers'
import { Form } from '@/types'
import { AuthService } from '@/services'
import { Actions } from '@/store/user'
import { useNamespacedActions } from 'vuex-composition-helpers'

export default defineComponent({
  layout: 'unauthorized',

  setup () {
    const { setUser } = useNamespacedActions<Actions>('user', ['setUser'])

    const loading = ref(false)
    const showPassword = ref(false)
    const form = ref<Form>()
    const email = ref('')
    const password = ref('')
    const rules = {
      email: [
        (v: string) => validateEmail(v) || 'Digite um email válido'
      ],
      password: [
        (v: string) => (!!v && v.length > 5) || 'Digite uma senha válida'
      ]
    }
    const error = ref({
      show: false,
      message: ''
    })

    const { redirect } = useContext()

    const handleSubmit = async () => {
      if (!form.value) { return }
      if (form.value.validate()) {
        loading.value = true
        try {
          const service = new AuthService()
          const { user } = await service.auth({ email: email.value, password: password.value })
          setUser(user)
          redirect('/dashboard')
        } catch (er) {
          error.value.message = er.message
          error.value.show = true
        } finally {
          loading.value = false
        }
      }
    }
    return {
      showPassword,
      form,
      rules,
      handleSubmit,
      email,
      password,
      loading,
      error
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
