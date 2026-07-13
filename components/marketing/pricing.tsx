import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    cadence: "/month",
    description: "For small teams reconciling a handful of accounts.",
    featured: false,
    features: [
      "Up to 3 data sources",
      "5,000 transactions / month",
      "CSV & Excel uploads",
      "2 team members",
      "Email support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$149",
    cadence: "/month",
    description: "For finance teams scaling across multiple providers.",
    featured: true,
    features: [
      "Up to 10 data sources",
      "50,000 transactions / month",
      "All API integrations",
      "10 team members",
      "Real-time discrepancy alerts",
      "Priority support",
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For organizations with advanced compliance needs.",
    featured: false,
    features: [
      "Unlimited data sources",
      "Unlimited transactions",
      "Custom ERP integrations",
      "Unlimited team members",
      "Dedicated success manager",
      "SLA & audit support",
    ],
    cta: "Contact sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border/60 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free for 14 days. Upgrade only when you&apos;re ready.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex h-full flex-col border-border/60",
                tier.featured &&
                  "border-primary shadow-lg ring-1 ring-primary/20",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  {tier.featured && <Badge>Most popular</Badge>}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.cadence}
                  </span>
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.featured ? "default" : "outline"}
                  asChild
                >
                  <Link
                    href={
                      tier.name === "Enterprise" ? "#contact" : "/register"
                    }
                  >
                    {tier.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
