"use client";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface AuthFormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const AuthFormField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "h-12",
}: AuthFormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} ${error ? "border-red-500" : ""}`}
        required={required}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
