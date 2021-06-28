
import { ProjectStatus, UserRole, PersonType, FileType, TaskStatus } from '@/enums'

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

export function formatPhone (phone: string): string {
  if (phone.length === 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return phone.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
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

export const UserPersonText: Record<PersonType, string> = {
  [PersonType.COMPANY]: 'Pessoa Jurídica',
  [PersonType.PERSON]: 'Pessoa Física'
}

export const TaskStatusIcon: Record<TaskStatus, string> = {
  [TaskStatus.PLANNED]: 'fas fa-clipboard-list',
  [TaskStatus.CANCELLED]: 'fas fa-clipboard-list',
  [TaskStatus.DOING]: 'fas fa-clipboard-list',
  [TaskStatus.DONE]: 'fas fa-clipboard-list',
  [TaskStatus.STOPPED]: 'fas fa-clipboard-list',
  [TaskStatus.TODO]: 'fas fa-clipboard-list'
}

export const TaskStatusText: Record<TaskStatus, string> = {
  [TaskStatus.PLANNED]: 'Planejado',
  [TaskStatus.CANCELLED]: 'Cancelado',
  [TaskStatus.DOING]: 'Em andamento',
  [TaskStatus.DONE]: 'Feito',
  [TaskStatus.STOPPED]: 'Pausado',
  [TaskStatus.TODO]: 'A fazer'
}

export function formatCpf (cpf: string): string {
  if (!cpf) { return '' }
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatCnpj (cnpj: string): string {
  if (!cnpj) { return '' }
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export const FileText: Record<FileType, string> = {
  [FileType.LOGO]: 'Logo',
  [FileType.REQUIREMENTS_DOCUMENT]: 'Requerimentos'
}

export const clone = <T extends Object>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
