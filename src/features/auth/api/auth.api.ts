/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiInstace } from "@/lib/apiInstance";
import {
  FormDataLogin,
  FormDataRegister,
  AuthResponse,
  AuthUser,
} from "../types/auth.types";

export const AuthApi = {
  login: async ({ email, password }: FormDataLogin): Promise<AuthUser> => {
    try {
      const res = await ApiInstace.post<AuthResponse>("/auth/sign-in/email", {
        email,
        password,
      });
      return res.data.user;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
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
      const res = await ApiInstace.post<AuthResponse>("/auth/sign-up/email", {
        email,
        name,
        password,
      });
      return res.data.user;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Registrasi gagal. Silakan coba lagi.");
    }
  },
};
