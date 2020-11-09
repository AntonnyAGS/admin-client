
import { ProjectStatus } from '@/enums'

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
