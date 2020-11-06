import axios from '@/config/axios'
import { Auth, User } from '@/types'
import Cookie from 'js-cookie'

type AuthData = {
  token: string;
  refreshToken: string;
  user: User;
}

export class AuthService {
  async auth (auth: Auth): Promise<AuthData> {
    try {
      const { data } = await axios.post<AuthData>('/auth', auth)
      Cookie.set(process.env.TOKEN, data.token, { expires: 1 / 24 })
      Cookie.set(process.env.REFRESH_TOKEN, data.refreshToken, { expires: 7 })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default AuthService
