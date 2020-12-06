import axios from '@/config/axios'
import { Score } from '@/types'
import Cookie from 'js-cookie'

export class ScoreService {
  async scores (projectId: string): Promise<Score[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Score[]>(`/project/${projectId}`, {
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

export default ScoreService
