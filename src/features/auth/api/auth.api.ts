import { ApiInstace } from "@/lib/apiInstance";
import { FormDataLogin, FormDataRegister, AuthUser } from "../types/auth.types";

interface BetterAuthResponse {
  user: AuthUser;
  session?: {
    id: string;
    token: string;
    expiresAt: string;
  };
  token?: string;
}

export const AuthApi = {
  login: async ({ email, password }: FormDataLogin): Promise<AuthUser> => {
    try {
      const res = await ApiInstace.post<BetterAuthResponse>(
        "/auth/sign-in/email",
        {
          email,
          password,
        },
      );
      return res.data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Login gagal. Silakan coba lagi.");
    }
  },

  register: async ({
    email,
    name,
    password,
  }: FormDataRegister): Promise<AuthUser> => {
    try {
      const res = await ApiInstace.post<BetterAuthResponse>(
        "/auth/sign-up/email",
        {
          email,
          name,
          password,
        },
      );
      return res.data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Registrasi gagal. Silakan coba lagi.");
    }
  },
};
