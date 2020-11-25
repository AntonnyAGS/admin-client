
import { ProjectStatus, UserRole } from '@/enums'

export const validateEmail = (email: string): boolean => {
  const pattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)
  return !!pattern.exec(email)
}

export const StatusColor: Record<ProjectStatus, string> = {
  [ProjectStatus.APPROVED]: '#29CC97',
  [ProjectStatus.DOING]: '#FF9C33',
  [ProjectStatus.WAITING]: '#FEC400',
  [ProjectStatus.FINISHED]: '#2696E8',
  [ProjectStatus.REPROVED]: '#FF4C33'
}

export const StatusText: Record<ProjectStatus, string> = {
  [ProjectStatus.APPROVED]: 'Aprovado',
  [ProjectStatus.DOING]: 'Em andamento',
  [ProjectStatus.WAITING]: 'Em espera',
  [ProjectStatus.FINISHED]: 'Finalizado',
  [ProjectStatus.REPROVED]: 'Reprovado'
}

export const formatNumber = (number: number, length: number): string => {
  let result = '' + number.toString()
  while (result.length < length) {
    result = '0' + result
  }
  return result
}

export const UserRoleText: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.CLIENT]: 'Cliente',
  [UserRole.STUDENT]: 'Aluno'
}

export const UserRoleColor: Record<UserRole, string> = {
  [UserRole.ADMIN]: '#2696E8',
  [UserRole.CLIENT]: '#29CC97',
  [UserRole.STUDENT]: '#FEC400'
}
