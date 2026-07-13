import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/tenant-auth/register-form";

export const metadata: Metadata = {
  title: "Start free trial — MatchFlow",
};

export default function RegisterPage() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Create your workspace</CardTitle>
        <CardDescription>
          Start your 14-day free trial — no credit card required
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
