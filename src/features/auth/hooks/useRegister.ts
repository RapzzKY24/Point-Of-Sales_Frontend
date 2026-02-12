/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApi } from "../api/auth.api";
import { FormDataRegister } from "../types/auth.types";
import { toast } from "react-toastify";

export const useRegister = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: FormDataRegister) => {
      return await AuthApi.register(data);
    },
    onSuccess: () => {
      toast.success("Register Berhasil", { position: "top-center" });
      router.replace("/");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Login gagal. Silakan coba lagi.";
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
