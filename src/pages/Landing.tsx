import { motion } from "framer-motion";
import { BookOpen, Clapperboard, CloudUpload, Images, Languages, Library, ScrollText, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { api } from "../convex/_generated/api";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import {
  catalogCategories,
  catalogEntries,
} from "@/lib/catalog";
import type { CatalogCategory } from "@/lib/catalog";
import type { Lang } from "@/lib/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Ornament() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3 py-2 text-primary/60">
      <span className="h-px w-16 bg-border sm:w-24" />
      <span className="text-lg leading-none">❦</span>
      <span className="h-px w-16 bg-border sm:w-24" />
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
      <p className="smallcaps-label text-muted-foreground">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-base italic text-muted-foreground">{lead}</p> : null}
    </motion.div>
  );
}

function TranslatorToggle() {
  const { lang, setLang, t } = useLanguage();
  const options: { key: Lang; label: string }[] = [
    { key: "en", label: t.nav.en },
    { key: "fil", label: t.nav.fil },
  ];
  return (
    <div className="flex items-center gap-2">
      <Languages className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">
        {t.nav.translatorLabel}
      </span>
      <div className="flex overflow-hidden rounded-sm border border-border bg-card">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setLang(opt.key)}
            aria-pressed={lang === opt.key}
            className={
              "px-3 py-1.5 font-serif text-xs font-semibold tracking-wide transition-colors sm:text-sm " +
              (lang === opt.key
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-secondary")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SiteHeader() {
  const { t } = useLanguage();
  const links = [
    { href: "#biography", label: t.nav.biography, icon: BookOpen },
    { href: "#timeline", label: t.nav.timeline, icon: ScrollText },
    { href: "#catalog", label: t.nav.catalog, icon: Library },
    { href: "#movie", label: t.nav.movie, icon: Clapperboard },
    { href: "#gallery", label: t.nav.gallery, icon: Images },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
        <a href="#top" className="font-serif text-lg font-bold tracking-tight">
          Mascardo Legacy
          <span className="ml-2 hidden text-xs font-normal uppercase tracking-[0.25em] text-muted-foreground md:inline">
            1871–1932
          </span>
        </a>
        <nav className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-1 sm:order-none sm:w-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-1.5 font-serif text-sm text-foreground/75 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </a>
          ))}
        </nav>
        <TranslatorToggle />
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="vintage-frame mx-auto w-full max-w-xs p-3 sm:max-w-sm"
        >
          <img
            src={t.gallery.items[0].src}
            alt={t.gallery.items[0].caption}
            loading="eager"
            className="aspect-[4/5] w-full object-cover sepia-photo grayscale-[35%]"
          />
          <figcaption className="mt-3 border-t border-border pt-2 text-center font-serif text-xs italic text-muted-foreground">
            {t.hero.photoCaption}
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <p className="smallcaps-label text-muted-foreground">{t.hero.kicker}</p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.name}
          </h1>
          <p className="mt-4 max-w-xl font-serif text-lg italic text-primary/90 sm:text-xl">
            {t.hero.subtitle}
          </p>
          <p className="mt-5 max-w-xl leading-relaxed text-foreground/80">{t.hero.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#biography"
              className="rounded-sm border border-primary bg-primary px-5 py-2.5 font-serif text-sm font-semibold tracking-wide text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {t.hero.ctaBio}
            </a>
            <a
              href="#movie"
              className="rounded-sm border border-border bg-card px-5 py-2.5 font-serif text-sm font-semibold tracking-wide text-foreground transition-colors hover:bg-secondary"
            >
              {t.hero.ctaMovie}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickFacts() {
  const { t } = useLanguage();
  return (
    <motion.section {...fadeUp} className="mx-auto max-w-4xl px-4 pt-12">
      <div className="vintage-frame p-6 sm:p-8">
        <h2 className="text-center font-serif text-xl font-bold tracking-wide">
          {t.quickFacts.title}
        </h2>
        <Ornament />
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {t.quickFacts.facts.map((f) => (
            <div key={f.label} className="border-b border-dashed border-border pb-3">
              <dt className="smallcaps-label text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 font-serif text-sm leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}

function Biography() {
  const { t } = useLanguage();
  const chapters = [t.bio.early, t.bio.revolution, t.bio.war, t.bio.later];
  return (
    <section id="biography" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 pt-20">
        <SectionHeading kicker={t.bio.kicker} title={t.bio.title} lead={t.bio.lead} />
        <div className="mt-10 space-y-10">
          {chapters.map((ch) => (
            <motion.article key={ch.title} {...fadeUp} className="relative pl-6 sm:pl-8">
              <span
                aria-hidden
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
              />
              <h3 className="font-serif text-2xl font-bold tracking-tight">{ch.title}</h3>
              <div className="mt-3 space-y-4 leading-relaxed text-foreground/85">
                {ch.paras.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const { t } = useLanguage();
  return (
    <section id="timeline" className="mt-20 scroll-mt-20 border-y border-border bg-card/60">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeading kicker={t.timeline.kicker} title={t.timeline.title} />
        <ol className="relative mt-10 space-y-0">
          {t.timeline.items.map((item, i) => (
            <motion.li
              key={item.year + i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative grid grid-cols-[5.5rem_1fr] gap-4 border-b border-dashed border-border py-4 last:border-0 sm:grid-cols-[7rem_1fr]"
            >
              <span className="font-serif text-sm font-bold uppercase tracking-wider text-primary">
                {item.year}
              </span>
              <p className="leading-relaxed text-foreground/85">{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type ActiveCategory = CatalogCategory | "all";

function CatalogSection() {
  const { lang, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ActiveCategory>("all");

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return catalogEntries.filter((entry) => {
      if (active !== "all" && entry.category !== active) return false;
      if (terms.length === 0) return true;
      const haystack = [
        entry.title,
        entry.years ?? "",
        entry.summary.en,
        entry.summary.fil,
        ...entry.tags,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [query, active]);

  const chips: { key: ActiveCategory; label: string }[] = [
    { key: "all", label: t.catalog.categories.all },
    ...catalogCategories.map((c) => ({
      key: c as ActiveCategory,
      label: t.catalog.categories[c],
    })),
  ];

  return (
    <section id="catalog" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 pt-20">
        <SectionHeading kicker={t.catalog.kicker} title={t.catalog.title} lead={t.catalog.lead} />

        <motion.div {...fadeUp} className="mt-10">
          <div className="relative mx-auto max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              aria-label={t.catalog.searchPlaceholder}
              className="w-full rounded-sm border border-border bg-card py-2.5 pl-9 pr-9 font-serif text-sm text-foreground placeholder:italic placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.catalog.clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => setActive(chip.key)}
                aria-pressed={active === chip.key}
                className={
                  "rounded-full border px-4 py-1.5 font-serif text-xs tracking-wide transition-colors sm:text-sm " +
                  (active === chip.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground")
                }
              >
                {chip.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
            {t.catalog.entryCount(results.length)}
          </p>
        </motion.div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {results.map((entry) => (
              <motion.article
                key={entry.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="group border-b border-dashed border-border py-4"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold leading-snug">{entry.title}</h3>
                  {entry.years ? (
                    <span className="shrink-0 font-serif text-xs italic text-muted-foreground">
                      {entry.years}
                    </span>
                  ) : null}
                </div>
                <p className="smallcaps-label mt-0.5 text-primary/80">
                  {t.catalog.categories[entry.category]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {entry.summary[lang]}
                </p>
                <p className="mt-2 text-xs italic text-muted-foreground">{entry.tags.join(" · ")}</p>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div {...fadeUp} className="mx-auto mt-8 max-w-md py-12 text-center">
            <p className="font-serif text-lg font-semibold">{t.catalog.noResultsTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.catalog.noResultsBody}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="mt-5 rounded-sm border border-border bg-card px-4 py-2 font-serif text-sm text-foreground transition-colors hover:bg-secondary"
            >
              {t.catalog.clearSearch}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MovieSection() {
  const { t } = useLanguage();
  return (
    <section id="movie" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 pt-20">
        <SectionHeading kicker={t.movie.kicker} title={t.movie.title} lead={t.movie.lead} />

        <motion.h3
          {...fadeUp}
          className="mt-12 text-center font-serif text-xl font-bold tracking-wide"
        >
          {t.movie.scenesTitle}
        </motion.h3>
        <Ornament />

        <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.movie.clips.map((clip) => (
            <motion.figure key={clip.id} {...fadeUp} className="vintage-frame flex flex-col p-3">
              <div className="relative aspect-video w-full overflow-hidden border border-border bg-black/90">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${clip.id}?rel=0`}
                  title={clip.situation}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <figcaption className="flex grow flex-col pt-4">
                <p className="smallcaps-label text-primary">{clip.source}</p>
                <blockquote className="mt-2 font-serif text-lg font-semibold italic leading-snug">
                  “{clip.situation}”
                </blockquote>
                <p className="mt-2 grow text-sm leading-relaxed text-muted-foreground">
                  {clip.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div {...fadeUp} className="vintage-frame mx-auto mt-12 max-w-3xl p-6 sm:p-8">
          <h3 className="text-center font-serif text-xl font-bold">{t.movie.triviaTitle}</h3>
          <ul className="mt-5 space-y-3">
            {t.movie.trivia.map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-foreground/85">
                <span aria-hidden className="mt-1 font-serif text-primary">❧</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-dashed border-border pt-4 text-center text-xs italic text-muted-foreground">
            {t.movie.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useLanguage();
  return (
    <section id="gallery" className="mt-20 scroll-mt-20 border-y border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading kicker={t.gallery.kicker} title={t.gallery.title} />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.gallery.items.map((item, i) => (
            <motion.figure key={i} {...fadeUp} className="vintage-frame p-3">
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="aspect-square w-full border border-border object-cover sepia-photo"
              />
              <figcaption className="pt-3 text-center font-serif text-xs italic leading-snug text-muted-foreground">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubBackup() {
  const { lang } = useLanguage();
  const pushFiles = useAction(api.github.pushFiles);
  const [owner, setOwner] = useState("rojadwev");
  const [repo, setRepo] = useState("mascardo-legacy");
  const [busy, setBusy] = useState(false);

  const handleBackup = async () => {
    if (!owner.trim() || !repo.trim()) return;
    setBusy(true);
    try {
      const catalogJson = JSON.stringify(
        {
          archive: "Mascardo Legacy",
          exportedAt: new Date().toISOString(),
          language: lang,
          entries: catalogEntries,
        },
        null,
        2,
      );
      const readme = [
        "# Mascardo Legacy",
        "",
        "A personal bilingual archive on General Tomás Mascardo y Echenique",
        "(1871–1932): his life in the Philippine Revolution and the",
        "Philippine–American War, and his portrayal in Heneral Luna (2015).",
        "",
        "## Contents",
        "",
        "- `catalog/mascardo-legacy.json` — the full searchable catalog:",
        "  people, places, events, and screen appearances.",
        "",
        "_Exported automatically from the Mascardo Legacy app._",
      ].join("\n");

      const results = await pushFiles({
        owner: owner.trim(),
        repo: repo.trim(),
        commitMessage: `Archive backup — ${new Date().toISOString().slice(0, 10)}`,
        files: [
          { path: "catalog/mascardo-legacy.json", content: catalogJson },
          { path: "README.md", content: readme },
        ],
      });
      toast.success(`GitHub updated: ${results.map((r) => `${r.path} (${r.status})`).join(", ")}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "GitHub backup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div {...fadeUp} className="vintage-frame mx-auto mt-12 max-w-xl p-5 sm:p-6">
      <h3 className="text-center font-serif text-lg font-bold">GitHub Backup</h3>
      <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
        Commits a JSON snapshot of the catalog to your repository via the GitHub API.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="owner"
          aria-label="GitHub owner"
          className="min-w-0 flex-1 rounded-sm border border-border bg-card px-3 py-2 font-serif text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="repository"
          aria-label="GitHub repository"
          className="min-w-0 flex-1 rounded-sm border border-border bg-card px-3 py-2 font-serif text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <button
          type="button"
          onClick={handleBackup}
          disabled={busy || !owner.trim() || !repo.trim()}
          className="flex items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-4 py-2 font-serif text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CloudUpload className="size-4" aria-hidden />
          {busy ? "Backing up…" : "Back up"}
        </button>
      </div>
    </motion.div>
  );
}

function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="py-14">
      <motion.div {...fadeUp} className="mx-auto max-w-2xl px-4 text-center">
        <Ornament />
        <h2 className="font-serif text-xl font-bold tracking-wide">{t.footer.title}</h2>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          {t.footer.sources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
        <GitHubBackup />
        <p className="mt-8 font-serif text-xs italic text-foreground/60">{t.footer.note}</p>
      </motion.div>
    </footer>
  );
}

export default function Landing(): ReactNode {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <SiteHeader />
        <main>
          <Hero />
          <QuickFacts />
          <Biography />
          <Timeline />
          <CatalogSection />
          <MovieSection />
          <Gallery />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
