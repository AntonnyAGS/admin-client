import axios from '@/config/axios'
import { User } from '@/types'
import Cookie from 'js-cookie'

type UserData = {
  users: User[];
}

export class UserService {
  async users (): Promise<UserData> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<UserData>('/user', {
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

export default UserService
