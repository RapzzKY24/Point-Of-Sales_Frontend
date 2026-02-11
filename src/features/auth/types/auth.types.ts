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
  emailVerified: boolean;
  image?: string | null;
  role: "ADMIN" | "CASHIER" | "MANAGER";
  createdAt: string;
  updatedAt: string;
};

export type AuthSession = {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
};

export type AuthResponse = {
  user: AuthUser;
  session: AuthSession;
  token?: string;
  message?: string;
};

export type AuthError = {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
};
