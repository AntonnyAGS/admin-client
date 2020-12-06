<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create__title">
        Adicionar notas
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
            v-model="group"
            :items="items"
            label="Grupos"
            item-text="name"
            item-value="_id"
            type="text"
            hide-details
            return-object
            placeholder="Digite o nome do grupo"
          />
        </div>
        <div v-if="group" class="create__students">
          Alunos
          <v-list class="pa-0" style="overflow: auto; max-height: 122px;">
            <v-list-item v-for="student in group.usersIds" :key="student._id" class="pa-0">
              <v-list-item-content>
                <v-list-item-title>
                  {{ student.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ student.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>
                        fas fa-star
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Desenvolvimento
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>
                        fas fa-star
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Apresentação
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>
                        fas fa-star
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Nota final
                  </span>
                </v-tooltip>
              </div>
            </v-list-item>
          </v-list>
        </div>
        <v-divider />
        <div class="create__footer">
          <v-spacer />
          <v-btn
            type="submit"
            rounded
            class="text-capitalize"
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
    }
  },

  directives: {
    mask
  },

  setup (_, { emit, root: { $notify } }) {
    const group = ref()

    const scores = ref()

    const handleSubmit = () => {
      try {
        emit('handle-submit', group.value)
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
      group,
      scores
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
  // font-family: Montserrat;
  &__title {
    padding: $MAIN_SPACE;
    font-size: 1.4rem;
    font-family: Montserrat;
    display: flex;
  }
  &__body {
    padding: $MAIN_SPACE;
  }
  &__students {
    padding: 0 $MAIN_SPACE $MAIN_SPACE $MAIN_SPACE;
    font-size: 0.8rem;
    color: grey;
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
