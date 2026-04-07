/**
 * Central branding and external links. Change here or via NEXT_PUBLIC_* env — not in UI components.
 */
export const branding = {
  productName: "llm-citeops",
  /** Display name for marketing copy (can differ from npm package name). */
  displayName: "CiteOps",
  logo: {
    src: process.env.NEXT_PUBLIC_LOGO_SRC ?? "/brand/logo.svg",
    width: 132,
    height: 36,
  },
  links: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL ??
      "https://github.com/rakeshcheekatimala/llm-citeops",
    npm:
      process.env.NEXT_PUBLIC_NPM_URL ??
      "https://www.npmjs.com/package/llm-citeops",
  },
  installCommand:
    process.env.NEXT_PUBLIC_INSTALL_CMD ?? "npm install -g llm-citeops",
  /** Terminal overview screenshot (README asset). */
  overviewImageUrl:
    process.env.NEXT_PUBLIC_OVERVIEW_IMAGE_URL ??
    "https://raw.githubusercontent.com/rakeshcheekatimala/llm-citeops/main/assets/overview.png",
} as const;

export type Branding = typeof branding;
