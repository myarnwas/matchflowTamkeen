import type { Metadata } from "next";
import { ShieldCheck, Lock } from "lucide-react";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Portal — Secure Access",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12">
      {/* Distinct enterprise/secure identity — deliberately unlike the tenant portal */}
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-slate-100">
          MatchFlow Platform Administration
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Restricted access — authorized administrators only
        </p>
      </div>

      <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl">
        <AdminLoginForm />
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Lock className="h-3 w-3" />
        All access attempts are logged and monitored
      </p>
    </div>
  );
}
