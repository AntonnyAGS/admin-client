import axios from '@/config/axios'
import { Score } from '@/types'
import Cookie from 'js-cookie'

export class ScoreService {
  async scores (projectId: string): Promise<Score[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Score[]>(`/score/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async create (scores: Score[]): Promise<Score[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<Score[]>('/score', scores, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async update (scores: Score[]): Promise<Score[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.put<Score[]>('/score', scores, {
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
