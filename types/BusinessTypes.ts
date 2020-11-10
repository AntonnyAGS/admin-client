import { ProjectStatus } from '@/enums'

export type User = {
  createdAt: Date;
  email: string;
  name: string;
  _id: string;
  isAdmin: boolean;
  ra?: string
}

export type Project = {
  createdAt: Date;
  name: string;
  _id: string;
  status: ProjectStatus;
}
