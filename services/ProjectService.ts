import axios from '@/config/axios'
import { Project } from '@/types'
import Cookie from 'js-cookie'

export class ProjectService {
  async projects (): Promise<Project[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Project[]>('/project', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async project (id: string): Promise<Project> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Project>(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async updateProject (project: Project): Promise<Project> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.put<Project>('/project', project, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default ProjectService
