import axios from '@/config/axios'
import { File } from '@/types'
import Cookie from 'js-cookie'

export class DocService {
  async doc (projectId: string): Promise<File[]> {
    try {
      const token = Cookie.get(process.env.TOKEN)
      const { data } = await axios.get<File[]>(`/file/${projectId}`, {
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

export default DocService
