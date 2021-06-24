import moment from 'moment'
import { TaskInput } from '~/services/TaskService'
import { Task } from '~/types'

export class TaskInputFactory {
  static build (task: Task, projectId: string): TaskInput {
    const model: TaskInput = {
      name: task.name,
      dateEnd: moment(task.dateEnd, 'DD/MM/YYYY').toDate() || new Date(),
      dateStart: task.dateStart ? moment(task.dateStart, 'DD/MM/YYYY').toDate() : moment().parseZone().toDate(),
      groupId: task.group._id,
      description: task.description,
      projectId
    }

    if (task.status) {
      model.status = task.status
    }

    return model
  }
}

export class TaskFactory {
  static build (task: Task): Task {
    const model: Task = {
      ...task,
      dateEnd: moment(task.dateEnd).format('DD/MM/YYYY'),
      dateStart: moment(task.dateStart).format('DD/MM/YYYY')
    }

    return model
  }
}
