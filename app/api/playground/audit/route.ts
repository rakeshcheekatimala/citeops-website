import { NextResponse } from "next/server";

import { auditUrl, createDownloads } from "@/lib/siteops/audit";
import type { PlaygroundAuditResponse } from "@/lib/siteops/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    if (!body.url?.trim()) {
      return NextResponse.json({ error: "A URL is required." }, { status: 400 });
    }

    const report = await auditUrl(body.url);
    const payload: PlaygroundAuditResponse = {
      report,
      downloads: createDownloads(report),
    };

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed." },
      { status: 500 },
    );
  }
}
