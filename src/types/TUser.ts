export type User = {
  handle: string;
  name: string;
  email: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type RegisterForm = Pick<User, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type RegisterResponse = {
  message: string;
  code: number;
};
