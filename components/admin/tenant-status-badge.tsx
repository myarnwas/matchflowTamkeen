import { Badge } from "@/components/ui/badge";
import type { TenantStatus } from "@/lib/types/database.types";

const statusConfig: Record<
  TenantStatus,
  { label: string; variant: "secondary" | "success" | "warning" | "destructive" }
> = {
  trial: { label: "تجريبي", variant: "secondary" },
  active: { label: "نشط", variant: "success" },
  suspended: { label: "موقوف", variant: "warning" },
  cancelled: { label: "ملغى", variant: "destructive" },
};

export function TenantStatusBadge({ status }: { status: TenantStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
