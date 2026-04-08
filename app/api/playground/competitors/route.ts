import { NextResponse } from "next/server";

import { auditUrl } from "@/lib/siteops/audit";
import {
  compareReportsWithAi,
  findCompetitorsWithAi,
} from "@/lib/siteops/openai";
import type {
  CompetitorAnalysisResponse,
  SiteOpsReport,
} from "@/lib/siteops/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      url?: string;
      report?: SiteOpsReport;
    };

    if (!body.url?.trim()) {
      return NextResponse.json({ error: "A URL is required." }, { status: 400 });
    }

    if (!body.report) {
      return NextResponse.json(
        { error: "Run the SiteOps audit before competitor analysis." },
        { status: 400 },
      );
    }

    const competitors = await findCompetitorsWithAi(body.url, body.report);
    if (competitors.length === 0) {
      return NextResponse.json(
        { error: "No competitor pages were identified by the AI workflow." },
        { status: 502 },
      );
    }

    const competitorReports = [];
    for (const competitor of competitors) {
      try {
        const report = await auditUrl(competitor.url);
        competitorReports.push({ competitor, report });
      } catch {
        continue;
      }
    }

    if (competitorReports.length === 0) {
      return NextResponse.json(
        { error: "Competitor URLs were found, but none could be audited." },
        { status: 502 },
      );
    }

    const analysis = await compareReportsWithAi({
      target: body.report,
      competitors: competitorReports.map((item) => ({
        name: item.competitor.name,
        url: item.competitor.url,
        report: item.report,
      })),
    });

    const payload: CompetitorAnalysisResponse = {
      target: body.report,
      competitors: competitorReports,
      analysis,
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Competitor analysis failed.",
      },
      { status: 500 },
    );
  }
}
