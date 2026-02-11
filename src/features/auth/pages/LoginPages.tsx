"use client";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { useLogin, useAuthForm } from "../hooks";
import { FormDataLogin } from "../types/auth.types";
import { AuthLayout, AuthFormField } from "../components";

const LoginPages = () => {
  const { login, isLoading, error } = useLogin();

  const { values, errors, handleChange, handleSubmit } =
    useAuthForm<FormDataLogin>({
      initialValues: { email: "", password: "" },
      onSubmit: (data) => login(data),
    });

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your POS dashboard."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Password
              </span>
              <Link
                href="#"
                className="text-sm font-medium text-teal-600 hover:text-teal-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <AuthFormField
              id="password"
              label=""
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={(value) => handleChange("password", value)}
              error={errors.password}
              required
            />
          </div>
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
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 lg:bg-white px-2 text-slate-500">
            Or continue with
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
        <span>Login with GitHub</span>
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-teal-600 hover:text-teal-500 hover:underline"
        >
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPages;
