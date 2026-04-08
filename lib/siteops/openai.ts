import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import type {
  CompetitorAnalysis,
  CompetitorSummary,
  SiteOpsReport,
} from "@/lib/siteops/types";

let triedRepoRootEnv = false;

function tryLoadRepoRootEnv() {
  if (triedRepoRootEnv) return;
  triedRepoRootEnv = true;
  const repoRoot = path.resolve(process.cwd(), "..");
  if (fs.existsSync(path.join(repoRoot, ".env"))) {
    loadEnvConfig(repoRoot);
  }
}

const OPENAI_API_URL = "https://api.openai.com/v1/responses";

export async function findCompetitorsWithAi(
  targetUrl: string,
  report: SiteOpsReport,
): Promise<CompetitorSummary[]> {
  const payload = {
    model: process.env.OPENAI_MODEL || "gpt-5",
    reasoning: { effort: "low" },
    tools: [
      {
        type: "web_search",
        user_location: {
          type: "approximate",
          country: "US",
          timezone: "America/New_York",
        },
      },
    ],
    tool_choice: "auto",
    text: {
      format: {
        type: "json_schema",
        name: "competitor_candidates",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            competitors: {
              type: "array",
              minItems: 1,
              maxItems: 3,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  name: { type: "string" },
                  url: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["name", "url", "reason"],
              },
            },
          },
          required: ["competitors"],
        },
      },
    },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "Return JSON only. Find 1 to 3 direct competitors for the target page. Choose pages that target a similar audience or search intent and are practical to compare for AEO and GEO readiness.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Target URL: ${targetUrl}\n\nCurrent scores:\n${JSON.stringify(report.scores, null, 2)}\n\nUse web search to identify likely competing URLs.`,
          },
        ],
      },
    ],
  };

  const response = await callOpenAi(payload);
  const parsed = safeJsonParse<{ competitors?: CompetitorSummary[] }>(
    extractOutputText(response),
  );
  return (parsed?.competitors ?? []).filter((item) => Boolean(item.url));
}

export async function compareReportsWithAi(input: {
  target: SiteOpsReport;
  competitors: Array<{ name: string; url: string; report: SiteOpsReport }>;
}): Promise<CompetitorAnalysis> {
  const payload = {
    model: process.env.OPENAI_MODEL || "gpt-5",
    reasoning: { effort: "medium" },
    text: {
      format: {
        type: "json_schema",
        name: "competitor_analysis",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            summary: { type: "string" },
            overallVerdict: { type: "string" },
            targetPositioning: { type: "string" },
            strengths: {
              type: "array",
              items: { type: "string" },
            },
            weaknesses: {
              type: "array",
              items: { type: "string" },
            },
            opportunities: {
              type: "array",
              items: { type: "string" },
            },
            competitorRankings: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  name: { type: "string" },
                  url: { type: "string" },
                  composite: { type: "number" },
                  aeo: { type: "number" },
                  geo: { type: "number" },
                  takeaway: { type: "string" },
                },
                required: ["name", "url", "composite", "aeo", "geo", "takeaway"],
              },
            },
          },
          required: [
            "summary",
            "overallVerdict",
            "targetPositioning",
            "strengths",
            "weaknesses",
            "opportunities",
            "competitorRankings",
          ],
        },
      },
    },
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "Return JSON only. You are judging a target page against competitors using AEO and GEO audit outputs. Be specific, practical, and grounded in the provided scores and audit evidence.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify(input, null, 2),
          },
        ],
      },
    ],
  };

  const response = await callOpenAi(payload);
  const parsed = safeJsonParse<CompetitorAnalysis>(extractOutputText(response));
  if (!parsed) {
    throw new Error("OpenAI returned an invalid competitor analysis payload.");
  }
  return parsed;
}

export function assertOpenAiConfigured() {
  if (!process.env.OPENAI_API_KEY) {
    tryLoadRepoRootEnv();
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY. Add it on the server to enable AI competitor analysis.");
  }
}

async function callOpenAi(payload: unknown) {
  assertOpenAiConfigured();

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed with ${response.status}: ${errorText}`);
  }

  return response.json();
}

type OpenAiResponseContent = {
  text?: string;
};

type OpenAiResponseItem = {
  content?: OpenAiResponseContent[];
};

type OpenAiResponse = {
  output_text?: string;
  output?: OpenAiResponseItem[];
};

function extractOutputText(response: OpenAiResponse) {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text;
  }

  const parts =
    response.output
      ?.flatMap((item) => item.content ?? [])
      ?.map((content) => content.text)
      ?.filter(Boolean) ?? [];

  return parts.join("\n");
}

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
