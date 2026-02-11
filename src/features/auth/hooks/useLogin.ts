"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApi } from "../api/auth.api";
import { FormDataLogin, AuthSession } from "../types/auth.types";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async (data: FormDataLogin) => {
      return await AuthApi.login(data);
    },
    onSuccess: (userData) => {
      const mockSession: AuthSession = {
        id: `session_${Date.now()}`,
        token: `token_${Date.now()}`,
        expiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(), // 30 days
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: userData.id,
      };

      // Store user in context and cookies
      setAuthUser(userData, mockSession);
      router.replace("/");
      // TODO: Replace alert with proper toast notification
      alert("Login berhasil");
    },
    onError: (error) => {
      console.error("Login error:", error);
      // TODO: Replace alert with proper toast notification
      alert("Login gagal. Silakan coba lagi.");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isError: loginMutation.isError,
    data: loginMutation.data,
  };
};
