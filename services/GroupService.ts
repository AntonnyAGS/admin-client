import { Group } from '@/types'
import axios from '@/config/axios'
import Cookie from 'js-cookie'

export class GroupService {
  async groups (): Promise<Group[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<Group[]>('/group', {
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

export default GroupService
