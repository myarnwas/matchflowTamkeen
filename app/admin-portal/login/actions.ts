"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { adminLoginSchema } from "@/lib/validators/auth";

export type ActionResult = { error: string } | { success: string };

// ---------------------------------------------------------------------------
// SUPER-ADMIN LOGIN
// Completely separate entry point. Authenticates, then requires membership in
// platform_admins. A tenant user who authenticates here is immediately signed
// back out — no crossover into the admin portal.
// ---------------------------------------------------------------------------
export async function signInAdmin(
  raw: unknown,
): Promise<ActionResult | never> {
  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Please check your credentials." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: "Invalid credentials." };
  }

  const { data: admin } = await supabase
    .from("platform_admins")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!admin) {
    // Not a platform admin — revoke the session and deny access.
    await supabase.auth.signOut();
    return { error: "This account is not authorized for the admin portal." };
  }

  redirect("/admin-portal");
}
