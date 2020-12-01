import { ProjectStatus, PersonType, UserRole } from '@/enums'

export type User = {
  createdAt: Date;
  email: string;
  name: string;
  _id: string;
  isAdmin: boolean;
  ra?: string;
  cpf?: string;
  cnpj?: string;
  personType?: PersonType;
  role: UserRole;
  phone: string;
}

export type Group = {
  _id: string;
  groupName: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
}

export type Project = {
  createdAt: Date | string;
  name: string;
  _id: string;
  status: ProjectStatus;
  groupsId: string[];
  description: string;
  updateAt: Date;
}
