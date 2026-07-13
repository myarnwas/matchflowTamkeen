import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MatchFlow — Financial Reconciliation Platform",
  description:
    "Multi-tenant SaaS for automated financial reconciliation across banks, payment providers, and ERP systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
