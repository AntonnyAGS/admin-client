import { UserRole, ProjectStatus } from '@/enums'

export type Form = {
  reset: () => void;
  validate: () => boolean;
  resetValidation: () => void;
}

export type Auth = {
  email: string;
  password: string;
}

export type SidebarItem = {
  to: string;
  title: string;
  disabled?: boolean;
  icon: string;
  isAdminOnly?: boolean;
}

export type UsersFilter = {
  role: UserRole[]
}

export type ProjectsFilter = {
  status: ProjectStatus[]
}
