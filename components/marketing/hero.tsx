import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft calm gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background"
      />

      <div className="container flex flex-col items-center py-24 text-center md:py-32">
        <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          Bank-grade multi-tenant isolation
        </Badge>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Financial reconciliation,{" "}
          <span className="text-primary">calm and automated</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          MatchFlow ingests transactions from your banks, payment providers, and
          ERP — then matches them against your internal records automatically,
          flagging every discrepancy in real time.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/register">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">See how it works</Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-success" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-success" />
            14-day free trial
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
