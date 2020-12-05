import axios from '@/config/axios'
import { User } from '@/types'
import Cookie from 'js-cookie'

export class UserService {
  async users (): Promise<User[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<User[]>('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async createStudent (student: User): Promise<User> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<User>('/user', student, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async createAdmin (admin: User): Promise<User> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.post<User>('/user/create-admin', admin, {
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

export default UserService
