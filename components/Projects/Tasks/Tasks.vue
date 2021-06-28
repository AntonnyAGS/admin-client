<template>
  <div class="tasks">
    <div class="tasks__header">
      Tarefas
    </div>
    <div class="tasks__body mt-4">
      <v-list v-if="tasks.length > 0">
        <v-list-item v-for="task in tasks" :key="task._id">
          <v-list-item-icon>
            <v-icon>
              {{ TaskStatusIcon[task.status] }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ task.name }} - {{ task.group.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ getDate(task) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn small color="primary" @click="$emit('click:task', task)">
              Detalhes
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div v-else style="color: grey;">
        Ainda não há nenhuma tarefa.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import moment from 'moment'
import { TaskStatusIcon } from '@/helpers'
import { Task } from '~/types'

export default defineComponent({
  props: {
    tasks: {
      type: Array as () => Task[],
      default: () => []
    }
  },

  setup () {
    const getDate = (task: Task) => {
      return `${moment(task.dateStart).format('DD/MM/YYYY')} - ${moment(task.dateEnd).format('DD/MM/YYYY')}`
    }

    return {
      getDate,
      TaskStatusIcon
    }
  }

})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .tasks {
    padding: $MAIN_SPACE;

    &__header {
      font-weight: 500;
    }
  }
</style>
