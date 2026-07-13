"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

import { signInAdmin } from "@/app/admin-portal/login/actions";
import { adminLoginSchema, type AdminLoginInput } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: AdminLoginInput) => {
    setFormError(null);
    startTransition(async () => {
      const result = await signInAdmin(values);
      if (result && "error" in result) {
        setFormError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {formError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300">
          Administrator email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="admin@matchflow.io"
          aria-invalid={!!errors.email}
          className="border-slate-700 bg-slate-900/60 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-400"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-300">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          className="border-slate-700 bg-slate-900/60 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-400"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-slate-100 text-slate-900 hover:bg-white"
      >
        {isPending ? "Authenticating…" : "Access admin portal"}
      </Button>
    </form>
  );
}
