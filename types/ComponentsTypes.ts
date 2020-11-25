import { UserRole } from '@/enums'

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
}

export type UsersFilter = {
  role: UserRole[]
}
