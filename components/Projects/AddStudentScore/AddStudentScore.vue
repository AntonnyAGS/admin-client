<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <div class="create__title">
        Gerenciar notas
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
            no-data-text="Ainda não há grupos."
            type="text"
            hide-details
            return-object
            placeholder="Digite o nome do grupo"
          />
        </div>
        <div v-if="group" class="create__students">
          Alunos
          <v-list class="pa-0" style="overflow: auto; max-height: 244px;">
            <v-list-item v-for="student in group.usersIds || group.users" :key="student._id" class="pa-0">
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
                    <v-btn icon v-on="on" @click="handleAddScore(ScoreType.DEVELOPMENT, student._id)">
                      <v-icon v-if="isActiveScore(student._id, ScoreType.DEVELOPMENT)">
                        fas fa-star
                      </v-icon>
                      <v-icon v-else>
                        far fa-star
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Desenvolvimento
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="handleAddScore(ScoreType.PRESENTATION, student._id)">
                      <v-icon v-if="isActiveScore(student._id, ScoreType.PRESENTATION)">
                        fas fa-star
                      </v-icon>
                      <v-icon v-else>
                        far fa-star
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    Apresentação
                  </span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="handleAddScore(ScoreType.FINAL, student._id)">
                      <v-icon v-if="isActiveScore(student._id, ScoreType.FINAL)">
                        fas fa-star
                      </v-icon>
                      <v-icon v-else>
                        far fa-star
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
            class="text-none"
            color="secondary"
            :loading="loading"
            @click="handleSubmit"
          >
            Concluir
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
import { Group, Project, Score } from '@/types'
import { ScoreType } from '@/enums'

export default defineComponent({
  props: {
    value: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as () => Group[],
      default: () => []
    },
    scores: {
      type: Array as () => Score[],
      default: () => []
    },
    project: {
      type: Object as () => Project,
      required: true
    }
  },

  directives: {
    mask
  },

  setup ({ scores, project }, { emit, root: { $notify } }) {
    const group = ref()

    const scoresToSend = ref([...scores])

    const getScoresIndex = (studentId: string, projectId: string, groupId: string) => {
      return scoresToSend.value.findIndex(s => (s.studentId === studentId) && (s.projectId === projectId) && (s.groupId === groupId))
    }

    const handleAddScore = (scoreType: ScoreType, studentId: string) => {
      const scoreIndex = getScoresIndex(studentId, project._id, group.value._id)
      if (scoreIndex < 0) {
        const obj: Score = {
          score: 1,
          studentId,
          scoresType: [scoreType],
          projectId: project._id,
          groupId: group.value._id
        }
        scoresToSend.value.push(obj)
        return
      }
      const score = scoresToSend.value[scoreIndex]
      const hasThisType = score.scoresType.includes(scoreType)
      hasThisType ? score.scoresType = score.scoresType.filter(s => s !== scoreType) : score.scoresType.push(scoreType)
      score.score = hasThisType ? score.score - 1 : score.score + 1
      scoresToSend.value.splice(scoreIndex, 1, score)
    }

    const handleSubmit = () => {
      try {
        emit('handle-submit', scoresToSend.value)
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

    const isActiveScore = (studentId: string, scoreType: ScoreType) => {
      const scoreIndex = getScoresIndex(studentId, project._id, group.value._id)

      if (scoreIndex < 0) {
        return false
      }

      return scoresToSend.value[scoreIndex].scoresType.includes(scoreType)
    }

    return {
      handleSubmit,
      group,
      scoresToSend,
      handleAddScore,
      ScoreType,
      isActiveScore
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
