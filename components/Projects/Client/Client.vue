<template>
  <div class="project__client">
    <div class="project__client-title">
      Dados do cliente
    </div>
    <div class="project__client-info">
      {{ project.client.name }} ({{ project.client.email }}) - {{ UserPersonText[project.client.personType] }}
      -
      {{ project.client.personType === PersonType.COMPANY ? formatCnpj(project.client.cnpj) : formatCpf(project.client.cpf) }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { Project } from '@/types'

import { PersonType } from '@/enums'

import { formatCpf, formatCnpj, UserPersonText } from '@/helpers'

export default defineComponent({
  props: {
    project: {
      type: Object as () => Project,
      required: true
    }
  },

  setup () {
    return {
      formatCpf,
      formatCnpj,
      PersonType,
      UserPersonText
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

.project {
  font-family: Montserrat;
  &__client {
    padding: $MAIN_SPACE;
  }
  &__client-title {
    font-weight: 500;
  }
  &__client-info{
    margin-top: $MAIN_SPACE;
    color: grey;
  }
}
</style>
