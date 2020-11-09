<template>
  <v-card class="projects-card">
    <div class="projects-card__header">
      <div class="projects-card__title">
        Projetos
      </div>
      <v-spacer />
      <nuxt-link to="/projects" class="projects-card__link">
        Ver todos
      </nuxt-link>
    </div>
    <v-list class="projects-card__list pa-0">
      <template v-for="(item, index) in items">
        <v-list-item :key="item._id">
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-action-text>
            <v-chip :color="StatusColor[item.status]" class="white--text">
              {{ StatusText[item.status] }}
            </v-chip>
          </v-list-item-action-text>
        </v-list-item>
        <v-divider
          v-if="index < items.length - 1"
          :key="item._id"
        />
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { StatusText, StatusColor } from '@/helpers'
import { Project } from '@/types'

export default defineComponent({
  props: {
    items: {
      type: Array as () => Project[],
      required: true
    }
  },

  setup () {
    return {
      StatusColor,
      StatusText
    }
  }
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
    font-family: Baloo2;
    display: flex;
    align-items: center;
  }
  &__title {
    font-weight: 600;
    font-size: 2rem;
  }
  &__link {
    text-decoration: none;
    font-family: Baloo;
    font-weight: 600;
    color: $STATUS_FINISHED;
  }
}
</style>
