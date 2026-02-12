"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthApi } from "../api/auth.api";
import { FormDataRegister, AuthSession, AuthUser } from "../types/auth.types";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
  const { login: setAuthUser } = useAuth();

  const registerMutation = useMutation({
    mutationFn: async (data: FormDataRegister) => {
      return await AuthApi.register(data);
    },
    onSuccess: async (userData: AuthUser) => {
      const userId = String(userData.id);

      const sessionData: AuthSession = {
        id: `session_${Date.now()}`,
        token: `token_${Date.now()}`,
        expiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId,
      };

      setAuthUser(userData, sessionData);

      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success("Registrasi berhasil", { position: "top-center" });

      window.location.href = "/";
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Registrasi gagal. Silakan coba lagi.";
      toast.error(errorMessage, { position: "top-center" });
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
    isError: registerMutation.isError,
    data: registerMutation.data,
  };
};
