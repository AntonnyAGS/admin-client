<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create__title">
        Vincular grupos
        <v-spacer />
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <v-form @submit.prevent>
        <div class="create__body">
          <v-autocomplete
            v-model="groups"
            multiple
            :items="items"
            label="Grupos *"
            item-text="name"
            no-data-text="Ainda não há nada aqui..."
            item-value="_id"
            type="text"
            chips
            deletable-chips
            return-object
            placeholder="Digite o nome do grupo"
          />
        </div>
        <v-divider />
        <div class="create__footer">
          <v-spacer />
          <v-btn
            type="submit"
            class="text-none"
            color="secondary"
            :loading="loading"
            @click="handleSubmit"
          >
            Salvar
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { mask } from 'vue-the-mask'

// Types/enums
import { Group } from '@/types'

export default defineComponent({
  props: {
    value: Boolean,
    loading: Boolean,
    items: {
      type: Array as () => Group[],
      default: () => []
    },
    selectedItems: {
      type: Array as () => Group[],
      default: () => []
    }
  },

  directives: {
    mask
  },

  setup ({ selectedItems }, { emit, root: { $notify } }) {
    const groups = ref(selectedItems.map(_id => _id))

    const handleSubmit = () => {
      try {
        emit('handle-submit', groups.value)
      } catch (error) {
        console.log(error)
        let title = ''
        if (error.name === 'ValidationError') {
          title = 'Erro de validação'
        }
        $notify({
          title,
          type: 'error',
          text: error.errors[0]
        })
        console.log(error.errors)
      }
    }

    return {
      handleSubmit,
      groups
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';
@import '~vuetify/src/styles/styles.sass';

*:not(.v-icon) {
  font-family: Montserrat;
}
.create {
  &__title {
    padding: $MAIN_SPACE;
    font-size: 1.4rem;
    font-family: Montserrat;
    display: flex;
  }
  &__body {
    padding: $MAIN_SPACE;
  }
  &__footer {
    padding: $MAIN_SPACE;
    display: flex;
  }
  &__password-obs {
    text-align: center;
    opacity: 0.5;
  }
}
</style>
