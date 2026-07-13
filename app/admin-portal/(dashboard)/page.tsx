import type { Metadata } from "next";
import { Building2, Users, Landmark, AlertTriangle } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/dashboard/metric-card";
import { TenantStatusBadge } from "@/components/admin/tenant-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber, formatCurrency, formatDate } from "@/lib/format";
import type { TenantStatus } from "@/lib/types/database.types";

export const metadata: Metadata = {
  title: "نظرة عامة — بوابة الإدارة",
};

type RecentTenant = {
  id: string;
  name: string;
  status: TenantStatus;
  created_at: string;
};

type GlobalStats = {
  totalTenants: number;
  activeUsers: number;
  transactionVolume: number;
  systemErrors: number;
  recentTenants: RecentTenant[];
};

/**
 * Aggregates platform-wide figures. Reads run through the super-admin's session
 * (RLS grants platform admins cross-tenant visibility). Every query degrades
 * gracefully to a zero/empty default so the dashboard renders even before the
 * schema is migrated or when a table is empty.
 *
 * NOTE: transactionVolume sums a bounded page of rows for now. Replace with a
 * database-side aggregate (RPC or a materialized view) before high volume.
 */
async function getGlobalStats(): Promise<GlobalStats> {
  const supabase = await createClient();

  const [tenantsRes, usersRes, amountsRes, errorsRes, recentRes] =
    await Promise.all([
      supabase.from("tenants").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("transactions").select("amount").limit(5000),
      supabase
        .from("audit_logs")
        .select("id", { count: "exact", head: true })
        .ilike("action", "%error%"),
      supabase
        .from("tenants")
        .select("id, name, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const transactionVolume = (amountsRes.data ?? []).reduce(
    (sum, row) => sum + Number(row.amount),
    0,
  );

  return {
    totalTenants: tenantsRes.count ?? 0,
    activeUsers: usersRes.count ?? 0,
    transactionVolume,
    systemErrors: errorsRes.count ?? 0,
    recentTenants: recentRes.data ?? [],
  };
}

export default async function AdminOverviewPage() {
  const stats = await getGlobalStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          نظرة عامة على المنصة
        </h1>
        <p className="text-sm text-muted-foreground">
          مؤشرات الأداء العالمية عبر جميع الشركات المستضافة
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="إجمالي الشركات المستضافة"
          value={formatNumber(stats.totalTenants)}
          icon={Building2}
        />
        <MetricCard
          title="عدد المستخدمين النشطين"
          value={formatNumber(stats.activeUsers)}
          icon={Users}
        />
        <MetricCard
          title="حجم المعاملات الإجمالي"
          value={formatCurrency(stats.transactionVolume)}
          icon={Landmark}
        />
        <MetricCard
          title="سجل الأخطاء للنظام"
          value={formatNumber(stats.systemErrors)}
          icon={AlertTriangle}
        />
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">أحدث الشركات المنضمّة</CardTitle>
          <CardDescription>آخر الحسابات المُسجَّلة على المنصة</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentTenants.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              لا توجد شركات مُسجَّلة بعد.
            </p>
          ) : (
            <ul className="divide-y divide-border/40">
              {stats.recentTenants.map((tenant) => (
                <li
                  key={tenant.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {tenant.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      انضمّت في {formatDate(tenant.created_at)}
                    </p>
                  </div>
                  <TenantStatusBadge status={tenant.status} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
