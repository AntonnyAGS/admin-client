import { ProjectStatus, PersonType, UserRole, FileType, ScoreType } from '@/enums'

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
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
}

export type Project = {
  createdAt: Date | string;
  name: string;
  _id: string;
  status: ProjectStatus;
  groups: string[] | Group[];
  description: string;
  updateAt: Date;
  client: User;
  clientId?: string;
  groupsId?: string[] | Group[];
}

export type File = {
  _id: string;
  projectId: string;
  fileName: string;
  fileType: FileType;
  fileUrl: string;
  createdAt: Date;
}

export type Score = {
  _id?: string;
  score: number;
  studentId: User | string;
  scoresType: ScoreType[];
  projectId: Project | string;
  groupId: Group | string;
}

export type Task = {
  _id?: string;
  name: string;
  description: string;
  group: Group;
  projectId: string;
  dateStart: Date;
  dateEnd: Date | null;
}
