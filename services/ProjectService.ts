import axios from '@/config/axios'
import { Project } from '@/types'
import Cookie from 'js-cookie'

export class ProjectService {
  async projects (): Promise<Project[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Project[]>('/project', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default ProjectService
