"use client";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useRegister, useAuthForm } from "../hooks";
import { FormDataRegister } from "../types/auth.types";
import { AuthLayout, AuthFormField } from "../components";

const RegisterPages = () => {
  const { register, isLoading, error } = useRegister();

  const { values, errors, handleChange, handleSubmit } =
    useAuthForm<FormDataRegister>({
      initialValues: { name: "", email: "", password: "" },
      onSubmit: (data) => register(data),
    });

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start managing your store efficiently today."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <AuthFormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={values.name}
            onChange={(value) => handleChange("name", value)}
            error={errors.name}
            required
          />

          <AuthFormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={values.email}
            onChange={(value) => handleChange("email", value)}
            error={errors.email}
            required
          />

          <AuthFormField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={values.password}
            onChange={(value) => handleChange("password", value)}
            error={errors.password}
            required
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error.message}
          </div>
        )}

        <Button
          size="lg"
          className="w-full font-bold shadow-md"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Creating Account..." : "Register"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 lg:bg-white px-2 text-slate-500">
            Or sign up with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full gap-3 font-medium"
        type="button"
      >
        <GithubIcon size={20} />
        <span>GitHub</span>
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-teal-600 hover:text-teal-500 hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPages;
