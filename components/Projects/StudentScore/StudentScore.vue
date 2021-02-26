<template>
  <div class="student-score">
    <span>
      Sua nota
    </span>
    <div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon v-if="isActiveScore(ScoreType.DEVELOPMENT)">
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
          <v-btn icon v-on="on">
            <v-icon v-if="isActiveScore(ScoreType.PRESENTATION)">
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
          <v-btn icon v-on="on">
            <v-icon v-if="isActiveScore(ScoreType.FINAL)">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ScoreType } from '~/enums'
import { Score } from '~/types'

export default defineComponent({
  props: {
    score: {
      type: Object as () => Score,
      required: true
    }
  },

  setup (props) {
    const isActiveScore = (scoreType: ScoreType): Boolean => {
      if (!props.score || !props.score.scoresType) { return false }

      return props.score.scoresType.includes(scoreType)
    }

    return {
      ScoreType,
      isActiveScore
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
@import '@/assets/colors.scss';

.student-score {
  padding: $MAIN_SPACE;
  span {
    font-weight: 500;
  }
}

</style>
