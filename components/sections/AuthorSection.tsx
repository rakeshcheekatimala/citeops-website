import {
  SITE_LAST_UPDATED_DISPLAY,
  SITE_LAST_UPDATED_ISO,
} from "@/config/content-freshness";

const AUTHOR_PROFILE = "https://github.com/rakeshcheekatimala";

export function AuthorSection() {
  return (
    <section className="border-b border-border bg-paper-muted/65">
      <div className="safe-pad mx-auto max-w-content py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 rounded-[24px] border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Author
            </p>
            <p className="mt-2 text-sm leading-7 text-ink">
              <a
                href={AUTHOR_PROFILE}
                rel="author"
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                Rakesh Cheekatimala
              </a>
              {" "}
              builds CiteOps. llm-citeops is open source on GitHub and npm. He
              helps teams in San Francisco, London, and Singapore.
            </p>
          </div>
          <div className="rounded-2xl bg-paper-muted px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              Last updated
            </p>
            <time
              dateTime={SITE_LAST_UPDATED_ISO}
              className="mt-2 block text-sm font-medium text-ink"
            >
              {SITE_LAST_UPDATED_DISPLAY}
            </time>
          </div>
        </div>
      </div>
    </section>
  );
}
