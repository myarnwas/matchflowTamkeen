import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import type { PlatformRole } from "@/lib/types/database.types";

const roleLabels: Record<PlatformRole, string> = {
  super_admin: "مسؤول عام",
  support: "دعم فني",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware guards this route too, but never render the admin shell
  // without a verified platform administrator.
  if (!user) {
    redirect("/admin-portal/login");
  }

  const { data: admin } = await supabase
    .from("platform_admins")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/admin-portal/login");
  }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden w-64 shrink-0 flex-col border-l border-slate-800 bg-slate-900 md:flex">
        <Link
          href="/admin-portal"
          className="flex h-16 items-center gap-2 border-b border-slate-800 px-5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-900">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-slate-50">
              MatchFlow
            </span>
            <span className="block text-xs text-slate-400">لوحة الإدارة</span>
          </div>
        </Link>
        <div className="flex-1 overflow-y-auto">
          <AdminSidebarNav />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar
          fullName={admin.full_name}
          roleLabel={roleLabels[admin.role]}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
