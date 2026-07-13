import { Landmark, Smartphone, CreditCard, Server, Database } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    icon: Landmark,
    name: "Bank of Palestine",
    nameAr: "بنك فلسطين",
    description:
      "Ingest bank statements and transaction feeds directly, via API or standard statement files.",
    status: "Available",
  },
  {
    icon: Smartphone,
    name: "Jawwal Pay",
    nameAr: "جوال بي",
    description:
      "Pull mobile wallet settlements and reconcile them against your recorded receipts.",
    status: "Available",
  },
  {
    icon: CreditCard,
    name: "PayPal",
    nameAr: "باي بال",
    description:
      "Sync PayPal transactions and payouts through the official API with automatic currency handling.",
    status: "Available",
  },
  {
    icon: Server,
    name: "ERP Systems",
    nameAr: "أنظمة تخطيط الموارد",
    description:
      "Connect your accounting or ERP platform over its API to keep journal entries in lockstep.",
    status: "API-driven",
  },
  {
    icon: Database,
    name: "Internal Records",
    nameAr: "السجلات المالية الداخلية",
    description:
      "Upload your own internal ledgers as CSV or Excel — the baseline every source is matched against.",
    status: "CSV / Excel",
  },
];

export function Integrations() {
  return (
    <section
      id="integrations"
      className="border-t border-border/60 bg-secondary/40 py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Multi-source integration
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One ledger for every financial source
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Heterogeneous feeds land in a single unified ledger, so the matching
            engine treats every source the same way.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item) => (
            <Card key={item.name} className="border-border/60 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <Badge variant="secondary">{item.status}</Badge>
                </div>
                <CardTitle className="mt-4 flex items-center gap-2 text-lg">
                  {item.name}
                  <span
                    dir="rtl"
                    className="text-sm font-normal text-muted-foreground"
                  >
                    {item.nameAr}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
