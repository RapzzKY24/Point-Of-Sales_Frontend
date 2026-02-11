/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";

interface UseAuthFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export const useAuthForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
}: UseAuthFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Basic validation
      const newErrors: Partial<Record<keyof T, string>> = {};

      Object.keys(values).forEach((key) => {
        const value = values[key as keyof T];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          newErrors[key as keyof T] = "Field ini wajib diisi";
        }
      });

      // Email validation
      if ("email" in values && values.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email as string)) {
          newErrors["email" as keyof T] = "Format email tidak valid";
        }
      }

      // Password validation
      if ("password" in values && values.password) {
        if ((values.password as string).length < 6) {
          newErrors["password" as keyof T] = "Password minimal 6 karakter";
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      onSubmit(values);
    },
    [values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setErrors,
  };
};
