import axios from '@/config/axios'
import { Task } from '@/types'
import Cookie from 'js-cookie'

export type TaskInput = {
  dateStart: Date;
  dateEnd: Date;
  groupId: string;
  projectId: string;
  description?: string;
  name: string;
  status?: string;
}

export class TaskService {
  async create (task: TaskInput): Promise<Task> {
    const token = Cookie.get(process.env.TOKEN)
    const { data } = await axios.post<Task>('/task', task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }

  async get (projectId: string): Promise<Task[]> {
    const token = Cookie.get(process.env.TOKEN)
    const { data } = await axios.get<Task[]>(`/task/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }

  async update (task: TaskInput, taskId: string): Promise<Task> {
    const token = Cookie.get(process.env.TOKEN)
    const { data } = await axios.put<Task>(`/task/${taskId}`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }
}

export default TaskService
