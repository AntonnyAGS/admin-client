<template>
  <div class="login fill-height">
    <div class="login__container">
      <div class="login__title">
        Bem vindo (a)
      </div>
      <v-form ref="form" @submit.prevent>
        <v-text-field
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
        <v-btn type="submit" block height="50px" color="secondary" @click="handleSubmit">
          Entrar
        </v-btn>
      </v-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { validateEmail } from '@/helpers'
import { Form } from '@/types'

export default defineComponent({
  layout: 'unauthorized',
  setup () {
    const teste = ref('olá')
    const showPassword = ref(false)
    const form = ref<Form>()
    const rules = {
      email: [
        (v: string) => validateEmail(v) || 'Digite um email válido'
      ],
      password: [
        (v: string) => (!!v && v.length > 6) || 'Digite uma senha válida'
      ]
    }
    const handleSubmit = () => {
      if (!form.value) { return }
      if (form.value.validate()) {
        console.log('ok')
      }
    }
    return {
      teste,
      showPassword,
      form,
      rules,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
