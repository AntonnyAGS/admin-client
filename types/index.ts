export type Form = {
  reset: () => void;
  validate: () => boolean;
  resetValidation: () => void;
}

export type Auth = {
  email: string;
  password: string;
}

export type User = {
  createdAt: string;
  email: string;
  name: string;
  _id: string;
  isAdmin: boolean;
  ra?: string
}
