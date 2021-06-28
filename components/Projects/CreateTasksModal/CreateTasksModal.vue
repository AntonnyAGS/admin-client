
<template>
  <v-dialog
    :value="value"
    width="600px"
    @input="$emit('input', false)"
  >
    <v-card class="tasks">
      <div class="tasks__header">
        <div class="tasks__title">
          {{ task._id ? 'Editar tarefa' : 'Nova tarefa' }}
        </div>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-divider />
      <div class="tasks__body">
        <v-text-field
          :readonly="!isAdmin"
          :value="task.name"
          placeholder="Nome"
          label="Nome *"
          @input="$emit('update:task', {...task, name: $event })"
        />
        <v-autocomplete
          :readonly="!isAdmin"
          :value="task.group"
          :items="groups"
          label="Grupo *"
          item-text="name"
          item-value="_id"
          no-data-text="Ainda não há grupos."
          type="text"
          return-object
          placeholder="Digite o nome do grupo"
          @input="handleUpdate('group', $event)"
        />
        <div class="tasks__body-line d-flex" style="gap: 16px;">
          <v-text-field
            v-mask="'##/##/####'"
            :readonly="!isAdmin"
            :value="task.dateStart || moment().format('DD/MM/YYYY')"
            placeholder="Data de inicio"
            label="Data de inicio *"
            @input="$emit('update:task', {...task, dateStart: $event })"
          />
          <v-text-field
            v-mask="'##/##/####'"
            :readonly="!isAdmin"
            :value="task.dateEnd"
            placeholder="Data de entrega"
            label="Data de entrega *"
            @input="$emit('update:task', {...task, dateEnd: $event })"
          />
        </div>
        <v-textarea
          :readonly="!isAdmin"
          :value="task.description"
          placeholder="Descrição"
          label="Descrição *"
          @input="$emit('update:task', {...task, description: $event })"
        />
        <v-autocomplete
          v-if="task._id"
          :value="task.status"
          :items="statuses"
          label="Status *"
          item-text="name"
          item-value="value"
          no-data-text="Ainda não há status."
          type="text"
          placeholder="Digite o status"
          @input="$emit('update:task', {...task, status: $event })"
        />
      </div>
      <v-divider />
      <div class="tasks__actions">
        <v-btn color="secondary" class="white--text" @click="handleSubmit">
          Concluir
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import * as yup from 'yup'
import { mask } from 'vue-the-mask'
import moment from 'moment'
import { Group, Task } from '~/types'
import { useNotify } from '~/hooks'
import { clone, TaskStatusText } from '~/helpers'
import { TaskStatus } from '~/enums'

type TaskForm = {
  description: string,
  group: Object,
  dateStart: string | any,
  dateEnd: string | any
}

const validateSchema = yup.object().shape<TaskForm>({
  group: yup.object().required('Selecione o grupo'),
  description: yup.string().required('Digite a descrição'),
  dateStart: yup.mixed().test('dateStart', 'Digite uma data de inicio válida', (val) => {
    const isValid = moment(val, 'DD/MM/YYYY').isValid()
    const isBefore = moment(val, 'DD/MM/YYYY').isBefore(new Date())

    return isValid || !isBefore
  }),
  dateEnd: yup.mixed().test('dateEnd', 'Digite uma data de fim válida', (val) => {
    return moment(val, 'DD/MM/YYYY').isValid()
  })
})

export default defineComponent({
  directives: {
    mask
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    groups: {
      type: Array as () => Group[],
      default: () => []
    },
    task: {
      type: Object as () => Task,
      default: () => ({})
    },
    isAdmin: {
      type: Boolean,
      default: true
    }
  },

  setup (props, { emit }) {
    const notify = useNotify()

    const statuses = computed(() => {
      return [
        { value: TaskStatus.PLANNED, name: TaskStatusText[TaskStatus.PLANNED] },
        { value: TaskStatus.DOING, name: TaskStatusText[TaskStatus.DOING] },
        { value: TaskStatus.TODO, name: TaskStatusText[TaskStatus.TODO] },
        { value: TaskStatus.DONE, name: TaskStatusText[TaskStatus.DONE] },
        { value: TaskStatus.STOPPED, name: TaskStatusText[TaskStatus.STOPPED] },
        { value: TaskStatus.CANCELLED, name: TaskStatusText[TaskStatus.CANCELLED] }
      ]
    })

    const handleSubmit = () => {
      try {
        validateSchema.validateSync(props.task, { abortEarly: false })

        if (props.task._id) {
          emit('handle-edit')
          emit('input', false)
          return
        }

        emit('handle-submit')
        emit('input', false)
      } catch (error) {
        console.log(error)
        let title = ''
        if (error.name === 'ValidationError') {
          title = 'Erro de validação'
        }
        notify({
          title,
          type: 'error',
          text: error.errors[0]
        })
        console.log(error.errors)
      }
    }

    const handleUpdate = (key: keyof Task, value: string | Group | Date) => {
      const obj = clone(props.task)

      if (key === 'group') {
        obj.group = value as Group
      }

      if (key === 'dateStart' || key === 'dateEnd') {
        obj[key] = value as Date
      }

      emit('update:task', obj)
    }

    return {
      handleSubmit,
      handleUpdate,
      moment,
      statuses
    }
  }
})

</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.tasks {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: $MAIN_SPACE;
  }
  &__title {
    font-weight: 500;
    font-size: 1.125rem;
  }
  &__body {
    padding: $MAIN_SPACE;
  }
  &__actions {
    padding: $MAIN_SPACE;

    display: flex;
    justify-content: flex-end;
  }
}

</style>
