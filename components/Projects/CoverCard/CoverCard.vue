<template>
  <div>
    <v-card class="cover-card" style="min-height: 133px;">
      <div class="d-flex flex-column">
        <div class="cover-card__title">
          {{ title }}
        </div>
        <div class="cover-card__description">
          {{ description }}
        </div>
        <v-spacer />
        <!-- <v-btn
          rounded
          color="#ff9700"
          class="cover-card__button white--text text-capitalize"
          width="120px"
          @click="$emit('handle-click')"
        >
          Clique aqui
        </v-btn> -->
      </div>
      <div class="cover-card__image" :style="{ 'background-image': `url(${require(`@/assets/images/${imageUrl}`)})` }" />
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
    },
    imageUrl: String
  }
})
</script>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/variables.scss';
@import '~vuetify/src/styles/styles.sass';

.cover-card {
  background-color: $MAIN_GREY !important;
  height: 100%;
  border-radius: $BORDER_RADIUS !important;
  padding: $MAIN_SPACE;
  display: grid !important;
  grid-template-columns: 1.8fr 1fr;
  gap: $MAIN_SPACE;
  &__title {
    font-family: Roboto;
    font-size: 1.2rem;
    font-weight: 600;
  }
  &__button {
    margin-top: $MAIN_SPACE;
  }
  &__image {
    background-size: contain;
    background-position: right;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')}{
.action-card {
  &__image {
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 50% !important;
  }
}
}
</style>
