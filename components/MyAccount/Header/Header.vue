<template>
  <div class="header">
    <div class="header__breadcrumbs">
      Você está aqui:
      <v-breadcrumbs
        class="pa-0"
        :items="breadcrumbItems"
        style="margin-left: 15px;"
        divider=">"
      />
    </div>
    <v-divider />
    <div class="header__info">
      <div class="header__title">
        Minha conta
      </div>
      <div class="header__description">
        Gerencia suas informações pessoais
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const breadcrumbItems = computed(() => {
      return [
        { text: 'Configurações', disabled: false, link: true, exact: true },
        { text: 'Minha conta', disabled: false, link: true, exact: true }
      ]
    })

    return {
      breadcrumbItems
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.header {
  display: flex;

  flex-direction: column;

  &__info {
    padding: $MAIN_SPACE;
  }

  &__title {
    font-size: 1.25rem;
  }

  &__description {
    color: grey;
  }

  &__breadcrumbs {
    padding: $MAIN_SPACE;
    display: flex;
    color: grey;
    align-items: center;
  }
}
</style>
