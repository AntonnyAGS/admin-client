<template>
  <v-app>
    <div class="unauthorized">
      <div class="unauthorized__left d-none d-md-flex">
        <div style="width: 60%">
          <div class="unauthorized__title">
            Sua nova plataforma para gestão de projetos
          </div>
          <img src="@/assets/images/login_vector.svg" alt="" width="100%">
        </div>
      </div>
      <div class="unauthorized__right white--text">
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import Cookie from 'js-cookie'

export default defineComponent({
  middleware: 'isNotAuthenticated'
})
</script>
<style lang="scss">
  body {
    font-family: 'Montserrat', sans-serif;
  }
</style>
<style lang="scss" scoped>
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.unauthorized {
  height: 100%;
  &__right {
    background-color: black;
    height: 100%;
  }
}

@media #{map-get($display-breakpoints, 'md-and-up')}{
  .unauthorized {
    display: grid;
    grid-template-columns: 2fr 1fr;
    &__left {
      background-color: $MAIN_WHITE;
      background-image: url('../assets/images/login_background.svg');
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    &__title {
      width: 70%;
      margin-bottom: 100px;
      font-size: 2rem;
      font-weight: 600;
      border-left: 5px solid black;
      padding-left: 10px;
      font-family: Baloo2, 'sans serif';
    }
}
}
</style>
