<template>
  <div class="hero-container">
    <v-card class="hero-card">
      <div class="hero-card__text">
        <div class="hero-card__title">
          Olá, {{ name }}!
        </div>
        <div class="hero-card__subtitle">
          É bom ver você novamente.
        </div>
      </div>
      <div class="hero-card__image" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';
@import '~vuetify/src/styles/styles.sass';

.hero-card {
  background-color: $MAIN_GREY !important;
  display: grid;
  grid-template-columns: auto 1fr;
  border-radius: $BORDER_RADIUS;
  height: 100%;
  &__text {
    display: flex;
    flex-direction: column;
    padding: $MAIN_SPACE;
    justify-content: center;
  }
  &__title {
    font-family: Roboto;
    font-size: 2rem;
    font-weight: 600;
  }
  &__image {
    background-image: url('../../../assets/images/hero_vector.svg');
    background-size: contain;
    background-position: center;
  }
}

@media (min-width: 340px){
  .hero-card {
    &__image {
      background-position: calc(100% - 15px);
    }
  }
}
</style>
