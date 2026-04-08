import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function AudienceSection() {
  const t = await getTranslations("Audience");

  const cards = [
    {
      title: t("businessTitle"),
      body: t("businessBody"),
      bullets: [t("businessBullet1"), t("businessBullet2"), t("businessBullet3")],
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      alt: t("businessImageAlt"),
    },
    {
      title: t("developerTitle"),
      body: t("developerBody"),
      bullets: [t("developerBullet1"), t("developerBullet2"), t("developerBullet3")],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      alt: t("developerImageAlt"),
    },
  ];

  return (
    <section className="border-b border-border bg-paper py-16 sm:py-24">
      <div className="safe-pad mx-auto max-w-content sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[28px] border border-border bg-card shadow-soft"
            >
              <div className="relative h-52 sm:h-64">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-paper">
                    {card.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-base leading-relaxed text-ink-muted">
                  {card.body}
                </p>
                <div className="mt-5 space-y-3">
                  {card.bullets.map((bullet) => (
                    <p
                      key={bullet}
                      className="rounded-2xl bg-paper-muted px-4 py-3 text-sm leading-7 text-ink"
                    >
                      {bullet}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
