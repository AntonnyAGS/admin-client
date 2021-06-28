import { ParseResult } from 'papaparse'
import { UserRole } from '~/enums'

export interface User {
  email: string;
  ra: string;
  telefone: string;
  nome: string;
}

export class StudentsInputFactory {
  static build (csv: ParseResult<User>) {
    return csv.data.map(({ email, ra, telefone, nome }) => ({
      name: nome,
      email,
      ra,
      phone: telefone,
      password: '123456',
      role: UserRole.STUDENT
    }))
  }
}
