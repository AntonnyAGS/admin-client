import { ProjectStatus } from '@/enums'

export type User = {
  createdAt: string;
  email: string;
  name: string;
  _id: string;
  isAdmin: boolean;
  ra?: string
}

export type Project = {
  createdAt: string;
  name: string;
  _id: string;
  status: ProjectStatus;
}
