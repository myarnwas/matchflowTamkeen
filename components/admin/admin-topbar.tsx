import { LogOut, ShieldCheck } from "lucide-react";

import { signOutAdmin } from "@/app/admin-portal/(dashboard)/actions";
import { Button } from "@/components/ui/button";

type AdminTopbarProps = {
  fullName: string;
  roleLabel: string;
};

export function AdminTopbar({ fullName, roleLabel }: AdminTopbarProps) {
  const initial = fullName.trim().charAt(0) || "؟";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">بوابة الإدارة</p>
          <p className="text-xs text-muted-foreground">
            التحكم العالمي في منصة MatchFlow
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-50">
            {initial}
          </span>
          <div className="hidden text-start sm:block">
            <p className="text-sm font-medium text-foreground">{fullName}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        </div>

        <form action={signOutAdmin}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
