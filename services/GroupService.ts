import { Group } from '@/types'
import axios from '@/config/axios'
import Cookie from 'js-cookie'

export type CreateGroupVars = {
  name: string;
  usersIds: string[];
}

export type UpdateGroupVars = {
  _id: string;
  name: string;
  usersIds: string[];
}
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

  async create (group: CreateGroupVars): Promise<Group> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<Group>('/group', group, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async update (group: UpdateGroupVars): Promise<Group> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.put<Group>('/group', group, {
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
