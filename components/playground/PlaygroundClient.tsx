"use client";

import { useState, useTransition } from "react";

import type {
  CompetitorAnalysisResponse,
  PlaygroundAuditResponse,
  SiteOpsReport,
} from "@/lib/siteops/types";

type DownloadFormat = "json" | "html" | "csv";

const scoreTone: Record<string, string> = {
  excellent: "bg-emerald-100 text-emerald-800",
  good: "bg-green-100 text-green-800",
  "needs-improvement": "bg-amber-100 text-amber-800",
  poor: "bg-rose-100 text-rose-800",
};

export function PlaygroundClient() {
  const [url, setUrl] = useState("");
  const [auditData, setAuditData] = useState<PlaygroundAuditResponse | null>(null);
  const [competitorData, setCompetitorData] =
    useState<CompetitorAnalysisResponse | null>(null);
  const [auditError, setAuditError] = useState("");
  const [aiError, setAiError] = useState("");
  const [isAuditing, startAudit] = useTransition();
  const [isAnalyzing, startAnalysis] = useTransition();

  const report = auditData?.report ?? null;

  function handleAuditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuditError("");
    setAiError("");
    setCompetitorData(null);

    startAudit(async () => {
      try {
        const response = await fetch("/api/playground/audit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const payload = (await readJsonResponse(response)) as
          | PlaygroundAuditResponse
          | { error?: string };

        if (!response.ok || !("report" in payload)) {
          throw new Error(readApiError(payload, "Audit failed."));
        }

        setAuditData(payload);
      } catch (error) {
        setAuditData(null);
        setAuditError(
          error instanceof Error ? error.message : "Unable to audit this URL.",
        );
      }
    });
  }

  function handleCompetitorAnalysis() {
    if (!report) return;

    setAiError("");
    startAnalysis(async () => {
      try {
        const response = await fetch("/api/playground/competitors", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ url, report }),
        });
        const payload = (await readJsonResponse(response)) as
          | CompetitorAnalysisResponse
          | { error?: string };

        if (!response.ok || !("analysis" in payload)) {
          throw new Error(readApiError(payload, "Competitor analysis could not be completed."));
        }

        setCompetitorData(payload);
      } catch (error) {
        setAiError(
          error instanceof Error
            ? error.message
            : "Competitor analysis could not be completed.",
        );
      }
    });
  }

  function handleDownload(format: DownloadFormat) {
    if (!auditData) return;

    const content = auditData.downloads[format];
    const mimeType =
      format === "json"
        ? "application/json"
        : format === "html"
          ? "text/html"
          : "text/csv";
    const extension = format;
    const fileName = `citeops-playground-report.${extension}`;
    const blob = new Blob([content], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <section
          aria-labelledby="playground-title"
          className="rounded-[28px] border border-border bg-card p-5 shadow-soft sm:p-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Playground
            </p>
            <h1
              id="playground-title"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Run a live SiteOps audit, then compare it with competitors.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Enter a URL to generate AEO and GEO scores with the SiteOps
              heuristics. Then use AI to discover competitor pages, audit them,
              and judge how your page stacks up.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleAuditSubmit} aria-describedby="playground-help">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">
                URL to audit
              </span>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com/blog/aeo-guide"
                inputMode="url"
                autoComplete="url"
                aria-describedby="playground-help"
                className="w-full rounded-2xl border border-border-strong bg-wash px-4 py-3 text-base text-ink outline-none transition focus:border-accent"
              />
            </label>
            <p id="playground-help" className="text-sm text-ink-muted">
              Best results come from public pages with clear headings, authorship, and factual content.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={isAuditing}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAuditing ? "Running SiteOps..." : "Playground"}
              </button>
              <button
                type="button"
                disabled={!report || isAnalyzing}
                onClick={handleCompetitorAnalysis}
                className="inline-flex w-full items-center justify-center rounded-full border border-border-strong bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isAnalyzing ? "Trying with AI..." : "Competitor analysis"}
              </button>
            </div>
          </form>

          {auditError ? (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {auditError}
            </p>
          ) : null}

          {aiError ? (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {aiError}
            </p>
          ) : null}

          {report ? (
            <div className="mt-8 space-y-8">
              <ScoreSummary report={report} />

              <section className="rounded-[24px] border border-border bg-wash p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      Download the generated report
                    </h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      Export the current SiteOps run as JSON, HTML, or CSV.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <DownloadButton
                      label="Download JSON"
                      onClick={() => handleDownload("json")}
                    />
                    <DownloadButton
                      label="Download HTML"
                      onClick={() => handleDownload("html")}
                    />
                    <DownloadButton
                      label="Download CSV"
                      onClick={() => handleDownload("csv")}
                    />
                  </div>
                </div>
              </section>

              <AuditList
                title="Priority fixes"
                subtitle="These are the highest-impact issues from the SiteOps pass."
                audits={report.audits.filter((audit) => audit.status !== "pass")}
              />

              <AuditList
                title="Passing signals"
                subtitle="Signals this page is already doing well."
                audits={report.audits.filter((audit) => audit.status === "pass")}
              />
            </div>
          ) : null}
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-border bg-paper-muted p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Two modes
            </p>
            <div className="mt-4 space-y-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  SiteOps only
                </h2>
                <p className="mt-2 text-sm leading-7 text-ink-muted">
                  Non-AI analysis computes AEO, GEO, composite scoring, and
                  recommendation snippets directly in the app.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Try with AI
                </h2>
                <p className="mt-2 text-sm leading-7 text-ink-muted">
                  AI finds comparable competitors, the app audits them with the
                  same SiteOps pass, and the model explains your relative
                  positioning.
                </p>
              </div>
            </div>
          </div>

          {competitorData ? (
            <CompetitorResults data={competitorData} />
          ) : (
            <div className="rounded-[28px] border border-dashed border-border-strong bg-card p-6">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Competitor analysis output
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                After you run a SiteOps audit, the AI workflow will identify
                comparable pages, score them, and summarize where the target URL
                wins or trails.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function ScoreSummary({ report }: { report: SiteOpsReport }) {
  const scores = [
    { label: "Composite", value: report.scores.composite },
    { label: "AEO", value: report.scores.aeo },
    { label: "GEO", value: report.scores.geo },
  ];

  return (
    <section className="rounded-[24px] border border-border bg-paper-muted p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-subtle">
            Audit result
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            {report.url}
          </h2>
          <p className="mt-2 break-all text-sm text-ink-muted">
            Generated {new Date(report.timestamp).toLocaleString()}
          </p>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
            scoreTone[report.scores.band] || "bg-slate-100 text-slate-700"
          }`}
        >
          {report.scores.band.replace("-", " ")}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {scores.map((score) => (
          <div
            key={score.label}
            className="rounded-[20px] border border-border bg-card px-5 py-4"
          >
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-ink-subtle">
              {score.label}
            </p>
            <p className="mt-3 font-display text-5xl font-semibold text-ink">
              {score.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AuditList({
  title,
  subtitle,
  audits,
}: {
  title: string;
  subtitle: string;
  audits: SiteOpsReport["audits"];
}) {
  if (audits.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-display text-3xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
      <div className="mt-5 space-y-4">
        {audits.map((audit) => (
          <article
            key={audit.id}
            className="rounded-[24px] border border-border bg-card p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {audit.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-muted">
                  {audit.evidence}
                </p>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                  audit.status === "pass"
                    ? "bg-emerald-100 text-emerald-800"
                    : audit.status === "warn"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                }`}
              >
                {audit.status}
              </span>
            </div>

            {audit.recommendation ? (
              <div className="mt-4 rounded-[20px] bg-paper-muted p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                    {audit.recommendation.priority} priority
                  </span>
                  <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
                    +{audit.recommendation.score_impact} impact
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink">
                  {audit.recommendation.instruction}
                </p>
                {audit.recommendation.code_snippet ? (
                  <pre className="mt-4 overflow-x-auto rounded-[18px] bg-ink p-4 text-sm leading-6 text-paper">
                    <code>{audit.recommendation.code_snippet}</code>
                  </pre>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function CompetitorResults({
  data,
}: {
  data: CompetitorAnalysisResponse;
}) {
  return (
    <div className="space-y-6 rounded-[28px] border border-border bg-card p-6 shadow-soft">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          AI verdict
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
          {data.analysis.overallVerdict}
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-muted">
          {data.analysis.summary}
        </p>
      </div>

      <div className="rounded-[22px] bg-paper-muted p-4">
        <h3 className="font-display text-2xl font-semibold text-ink">
          Positioning
        </h3>
        <p className="mt-2 text-sm leading-7 text-ink-muted">
          {data.analysis.targetPositioning}
        </p>
      </div>

      <TextList title="Strengths" items={data.analysis.strengths} />
      <TextList title="Weaknesses" items={data.analysis.weaknesses} />
      <TextList title="Opportunities" items={data.analysis.opportunities} />

      <div>
        <h3 className="font-display text-2xl font-semibold text-ink">
          Competitor scorecard
        </h3>
        <div className="mt-4 space-y-4">
          {data.analysis.competitorRankings.map((item) => (
            <article
              key={item.url}
              className="rounded-[22px] border border-border bg-paper-muted p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-ink">{item.name}</h4>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {item.url}
                  </a>
                </div>
                <div className="grid gap-2 text-center sm:grid-cols-3">
                  <ScoreChip label="Composite" value={item.composite} />
                  <ScoreChip label="AEO" value={item.aeo} />
                  <ScoreChip label="GEO" value={item.geo} />
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-muted">
                {item.takeaway}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold text-ink">
          Audited competitors
        </h3>
        <div className="mt-4 space-y-3">
          {data.competitors.map((item) => (
            <article
              key={item.competitor.url}
              className="rounded-[20px] border border-border bg-paper-muted p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {item.competitor.name}
                  </p>
                  <a
                    href={item.competitor.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all text-sm text-accent underline-offset-4 hover:underline"
                  >
                    {item.competitor.url}
                  </a>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {item.competitor.reason}
                  </p>
                </div>
                <div className="grid gap-2 text-center sm:grid-cols-3">
                  <ScoreChip
                    label="Composite"
                    value={item.report.scores.composite}
                  />
                  <ScoreChip label="AEO" value={item.report.scores.aeo} />
                  <ScoreChip label="GEO" value={item.report.scores.geo} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloadButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-border-strong bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
    >
      {label}
    </button>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <p
            key={`${title}-${item}`}
            className="rounded-[20px] border border-border bg-paper-muted px-4 py-3 text-sm leading-7 text-ink-muted"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

function readApiError(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }

  return fallback;
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(text || `Request failed with status ${response.status}.`);
  }
}
