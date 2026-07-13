"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  ArrowLeftRight,
  AlertTriangle,
  Activity,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { href: "/admin-portal", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin-portal/tenants", label: "الشركات المستضافة", icon: Building2 },
  { href: "/admin-portal/users", label: "المستخدمون", icon: Users },
  {
    href: "/admin-portal/transactions",
    label: "سجل المعاملات",
    icon: ArrowLeftRight,
  },
  {
    href: "/admin-portal/system-logs",
    label: "سجل الأخطاء",
    icon: AlertTriangle,
  },
  { href: "/admin-portal/health", label: "صحة المنصة", icon: Activity },
  { href: "/admin-portal/settings", label: "الإعدادات", icon: Settings },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin-portal"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-700 text-slate-50"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
