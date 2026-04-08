export type AuditCategory = "aeo" | "geo";

export type AuditStatus = "pass" | "fail" | "warn";

export type ScoreBand = "excellent" | "good" | "needs-improvement" | "poor";

export type RecommendationPriority = "high" | "medium" | "low";

export type AuditRecommendation = {
  priority: RecommendationPriority;
  score_impact: number;
  instruction: string;
  code_snippet?: string;
};

export type AuditResult = {
  id: string;
  category: AuditCategory;
  title: string;
  status: AuditStatus;
  weight: number;
  score: number;
  evidence: string;
  recommendation?: AuditRecommendation;
};

export type SiteOpsScores = {
  aeo: number;
  geo: number;
  composite: number;
  band: ScoreBand;
  percentile: null;
};

export type SiteOpsReport = {
  url: string;
  timestamp: string;
  scores: SiteOpsScores;
  audits: AuditResult[];
  probe: {
    enabled: boolean;
    results: unknown[];
  };
};

export type SiteOpsDownloads = {
  json: string;
  html: string;
  csv: string;
};

export type PlaygroundAuditResponse = {
  report: SiteOpsReport;
  downloads: SiteOpsDownloads;
};

export type CompetitorSummary = {
  name: string;
  url: string;
  reason: string;
};

export type CompetitorReport = {
  competitor: CompetitorSummary;
  report: SiteOpsReport;
};

export type CompetitorAnalysis = {
  summary: string;
  overallVerdict: string;
  targetPositioning: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  competitorRankings: Array<{
    name: string;
    url: string;
    composite: number;
    aeo: number;
    geo: number;
    takeaway: string;
  }>;
};

export type CompetitorAnalysisResponse = {
  target: SiteOpsReport;
  competitors: CompetitorReport[];
  analysis: CompetitorAnalysis;
};
