import type { Metadata } from "next";
import { Building2 } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { TenantStatusBadge } from "@/components/admin/tenant-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { TenantStatus } from "@/lib/types/database.types";

export const metadata: Metadata = {
  title: "الشركات المستضافة — بوابة الإدارة",
};

type TenantRow = {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  plan: string;
  created_at: string;
};

async function getTenants(): Promise<TenantRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tenants")
    .select("id, name, slug, status, plan, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function TenantsManagementPage() {
  const tenants = await getTenants();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            الشركات المستضافة
          </h1>
          <p className="text-sm text-muted-foreground">
            مراقبة وإدارة جميع حسابات الشركات على المنصة
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <Building2 className="h-3.5 w-3.5" />
          {tenants.length} شركة
        </Badge>
      </div>

      <Card className="border-border/60">
        <CardContent className="p-0">
          {tenants.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              لا توجد شركات مُسجَّلة بعد.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-start text-xs text-muted-foreground">
                    <th className="px-6 py-3 text-start font-medium">الشركة</th>
                    <th className="px-6 py-3 text-start font-medium">
                      المعرّف
                    </th>
                    <th className="px-6 py-3 text-start font-medium">الحالة</th>
                    <th className="px-6 py-3 text-start font-medium">الباقة</th>
                    <th className="px-6 py-3 text-start font-medium">
                      تاريخ الإنشاء
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map((tenant) => (
                    <tr
                      key={tenant.id}
                      className="border-b border-border/40 transition-colors last:border-0 hover:bg-secondary/40"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {tenant.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span dir="ltr" className="inline-block">
                          {tenant.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <TenantStatusBadge status={tenant.status} />
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {tenant.plan}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {formatDate(tenant.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
