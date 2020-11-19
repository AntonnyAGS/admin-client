<template>
  <div class="fill-height">
    <v-card class="action-card">
      <div class="d-flex flex-column">
        <div class="action-card__title">
          {{ title }}
        </div>
        <div class="action-card__description">
          {{ description }}
        </div>
        <v-spacer />
        <v-btn rounded color="#ff9700" class="action-card__button white--text text-capitalize" width="120px">
          Clique aqui
        </v-btn>
      </div>
      <div class="action-card__image" />
    </v-card>
  </div>
</template>

<script lang="typescript">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';
@import '~vuetify/src/styles/styles.sass';

.action-card {
  background-color: $MAIN_GREY !important;
  height: 100%;
  border-radius: $BORDER_RADIUS !important;
  padding: $MAIN_SPACE;
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  &__title {
    font-family: Roboto;
    font-size: 1.2rem;
    font-weight: 600;
  }
  &__button {
    margin-top: $MAIN_SPACE;
  }
  &__image {
    background-image: url('../../../assets/images/discussion.svg');
    background-size: contain;
    background-position: right;
  }
}

</style>
