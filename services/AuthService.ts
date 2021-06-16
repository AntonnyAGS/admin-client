import axios from '@/config/axios'
import { Auth, User } from '@/types'
import Cookie from 'js-cookie'
import { UserRole } from '~/enums'

type AuthData = {
  token: string;
  refreshToken: string;
  user: User;
}

type LogoutData = {
  logout: Boolean;
}

type RefreshTokenData = {
  token: string;
  refreshToken: string;
}

class CustomError {
  private response = {
    data: {
      message: ''
    }
  }

  constructor (message: string) {
    this.response.data.message = message
  }
}

export class AuthService {
  async auth (auth: Auth): Promise<AuthData> {
    try {
      const { data } = await axios.post<AuthData>('/auth', auth)
      if (data.user.role === UserRole.CLIENT) {
        throw new CustomError('Não é possível logar como cliente.')
      }
      Cookie.set(process.env.TOKEN, data.token, { expires: 1 / 24 })
      Cookie.set(process.env.REFRESH_TOKEN, data.refreshToken, { expires: 7 })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async refreshToken (refreshToken: string): Promise<RefreshTokenData> {
    try {
      const { data } = await axios.post<AuthData>('/auth/refresh-token', { refreshToken })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async logout (refreshToken: string): Promise<LogoutData> {
    try {
      const { data } = await axios.post<LogoutData>('auth/logout', { refreshToken })
      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
}

export default AuthService
