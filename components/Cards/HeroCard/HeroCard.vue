<template>
  <div>
    <v-card class="hero-card">
      <div class="hero-card__text">
        <div class="hero-card__title">
          Olá, {{ name }}!
        </div>
        <div class="hero-card__subtitle">
          É bom ver você novamente.
        </div>
      </div>
      <img src="@/assets/images/hero_vector.svg">
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

.hero-card {
  background-color: $MAIN_GREY;
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 40px;
  img {
    margin-top: -40px;
    margin-right: $MAIN_SPACE;
  }
  &__text {
    display: flex;
    flex-direction: column;
    padding: $MAIN_SPACE;
    justify-content: center;
  }
  &__title {
    font-family: Baloo;
    font-size: 2rem;
    font-weight: 600;
  }
}
</style>
