import reviewsEn from "@/content/reviews.en.json";

export type ReviewItem = {
  quote: string;
  author: string;
  role?: string;
  source?: string;
};

export type ReviewsFile = {
  items: ReviewItem[];
};

const byLocale: Record<string, ReviewsFile> = {
  en: reviewsEn as ReviewsFile,
};

export function getReviews(locale: string): ReviewsFile {
  return byLocale[locale] ?? byLocale.en;
}
