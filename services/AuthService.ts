import axios from '@/config/axios'
import { Auth, User } from '@/types'
import Cookie from 'js-cookie'

type AuthData = {
  token: string;
  user: User;
}

export class AuthService {
  async auth (auth: Auth): Promise<AuthData> {
    try {
      const { data } = await axios.post<AuthData>('/auth', auth)
      Cookie.set(process.env.TOKEN, data.token, { expires: 30 })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default AuthService
