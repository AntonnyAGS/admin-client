import axios from '@/config/axios'
import { User } from '@/types'
import Cookie from 'js-cookie'

type UpdateUserParams = {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  name?: string;
  phone?: string;
}

type UserInput = {
  email: string;
  name: string;
  ra: string;
  phone: string;
  password: string;
}
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

  async user (id: string): Promise<User> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<User>(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async updateLoggedUser (params: UpdateUserParams): Promise<User> {
    const token = Cookie.get(process.env.TOKEN)
    const { data } = await axios.put<User>('/user', params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }

  async createUsers (params: UserInput[]) {
    const token = Cookie.get(process.env.TOKEN)
    const { data } = await axios.post<User[]>('/user/register-many', params, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data
  }
}

export default UserService
