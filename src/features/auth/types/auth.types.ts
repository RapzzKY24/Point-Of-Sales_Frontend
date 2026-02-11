export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormDataRegister = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  user: AuthUser;
  token?: string;
  message?: string;
};

export type AuthError = {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};
