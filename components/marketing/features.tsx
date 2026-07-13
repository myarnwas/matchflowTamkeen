import {
  GitCompareArrows,
  ShieldCheck,
  Bell,
  FileSpreadsheet,
  LineChart,
  Workflow,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: GitCompareArrows,
    title: "Automated matching engine",
    description:
      "A source-agnostic engine pairs external transactions against your internal ledger, scoring each match by confidence.",
  },
  {
    icon: Bell,
    title: "Real-time discrepancy alerts",
    description:
      "Mismatched amounts, missing entries, and duplicates surface the moment they appear — no month-end surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Strict tenant isolation",
    description:
      "Row Level Security enforced at the database. Your data is provably invisible to every other tenant on the platform.",
  },
  {
    icon: FileSpreadsheet,
    title: "Flexible ingestion",
    description:
      "Connect live APIs or drop in CSV and Excel files. Every record lands in one unified, queryable ledger.",
  },
  {
    icon: LineChart,
    title: "Reconciliation dashboards",
    description:
      "Track match rates, discrepancy trends, and outstanding items across every account from a single calm overview.",
  },
  {
    icon: Workflow,
    title: "Full audit trail",
    description:
      "Every match, override, and manual adjustment is recorded in an append-only log built for financial compliance.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to close the books with confidence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built for finance teams that reconcile across many sources
            and can&apos;t afford a single missed entry.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/60 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <feature.icon className="h-5 w-5" />
                </span>
                <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
