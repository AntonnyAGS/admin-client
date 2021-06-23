
<template>
  <v-dialog
    :value="value"
    width="600px"
    @input="$emit('input', false)"
  >
    <v-card class="tasks">
      <div class="tasks__header">
        <div class="tasks__title">
          Nova tarefa
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
          :value="task.name"
          placeholder="Nome"
          label="Nome *"
          dense
          @input="$emit('update:task', {...task, name: $event })"
        />
        <v-autocomplete
          :value="task.group"
          :items="groups"
          label="Grupo *"
          item-text="name"
          item-value="_id"
          no-data-text="Ainda não há grupos."
          type="text"
          return-object
          dense
          placeholder="Digite o nome do grupo"
          @input="handleUpdate('group', $event)"
        />
        <div class="tasks__body-line d-flex" style="gap: 16px;">
          <v-text-field
            v-mask="'##/##/####'"
            :value="task.dateStart"
            placeholder="Data de inicio"
            label="Data de inicio *"
            dense
            @input="$emit('update:task', {...task, dateStart: $event })"
          />
          <v-text-field
            v-mask="'##/##/####'"
            :value="task.dateEnd"
            placeholder="Data de entrega"
            label="Data de entrega *"
            dense
            @input="$emit('update:task', {...task, dateEnd: $event })"
          />
        </div>
        <v-textarea
          :value="task.description"
          placeholder="Descrição"
          label="Descrição *"
          dense
          @input="$emit('update:task', {...task, description: $event })"
        />
      </div>
      <v-divider />
      <div class="tasks__actions">
        <v-btn color="secondary" class="white--text" @click="handleSubmit">
          Criar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import * as yup from 'yup'
import { mask } from 'vue-the-mask'
import moment from 'moment'
import { Group, Task } from '~/types'
import { useNotify } from '~/hooks'
import { clone } from '~/helpers'

type TaskForm = {
  name: string,
  description: string,
  group: Object,
  dateStart: string | any,
  dateEnd: string | any
}

const validateSchema = yup.object().shape<TaskForm>({
  name: yup.string().required('Digite o nome'),
  group: yup.object().required('Selecione o grupo'),
  description: yup.string().required('Digite a descrição'),
  dateStart: yup.mixed().test('dateStart', 'Digite uma data de inicio válida', (val) => {
    console.log(moment(val, 'DD/MM/YYYY').isValid(), val)
    return moment(val, 'DD/MM/YYYY').isValid()
  }),
  dateEnd: yup.mixed().test('dateEnd', 'Digite uma data de fim válida', (val) => {
    return moment(val, 'DD/MM/YYYY').isValid()
  })
  //  usersIds: yup.mixed().test('users', 'Informe pelo menos um usuário', (val) => {
  //   if (val.length === 0) {
  //     return false
  //   }
  //   return true
  // })
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
    }
  },

  setup (props, { emit }) {
    const notify = useNotify()

    const handleSubmit = () => {
      try {
        validateSchema.validateSync(props.task, { abortEarly: false })

        emit('handle-submit')
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
      handleUpdate
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
