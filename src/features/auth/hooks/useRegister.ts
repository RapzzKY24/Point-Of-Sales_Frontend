"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApi } from "../api/auth.api";
import { FormDataRegister } from "../types/auth.types";

export const useRegister = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: FormDataRegister) => {
      return await AuthApi.register(data);
    },
    onSuccess: (data) => {
      // TODO: Replace alert with proper toast notification
      alert("Registrasi berhasil! Silakan login.");
      router.replace("/auth/login");
    },
    onError: (error) => {
      console.error("Register error:", error);
      // TODO: Replace alert with proper toast notification
      alert("Registrasi gagal. Silakan coba lagi.");
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
