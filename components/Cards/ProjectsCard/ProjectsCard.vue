<template>
  <v-card class="projects-card">
    <div class="projects-card__header">
      Projetos
    </div>
    <v-list class="projects-card__list">
      <v-list-item>
        <v-list-item-icon>
          fas fa-user
        </v-list-item-icon>
        <v-list-item-title>
          oi
        </v-list-item-title>
        <v-list-item-action>
          oi
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({

})

</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';
.projects-card {
  background-color: $MAIN_GREY;
  &__list {
    background-color: $MAIN_GREY;
  }
  &__header {
    margin-top: 15px;
    padding: 0 16px;
  }
}
</style>
