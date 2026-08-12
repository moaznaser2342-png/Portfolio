import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Award,
  Code2,
  BarChart3,
  Brain,
  GitBranch,
  Database,
  Users,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getHeroPhoto } from "@/lib/site.functions";
import portrait from "@/assets/moaz-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  loader: () => getHeroPhoto(),
  head: () => ({
    meta: [
      { title: "Moaz Naser — AI & Computer Science Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Moaz Naser Khalaf Allah, Computer Science & AI student specializing in machine learning, Python, and data analysis.",
      },
      { property: "og:title", content: "Moaz Naser — AI & Computer Science Portfolio" },
      {
        property: "og:description",
        content:
          "Machine learning projects, certifications, and technical skills from a Computer Science & AI student at South Valley University.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://moaz-naser.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moaz-naser.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Moaz Naser Khalaf Allah",
          alternateName: "Moaz Naser",
          jobTitle: "AI & Machine Learning Engineer",
          url: "https://moaz-naser.lovable.app/",
          email: "mailto:moaznaser2342@gmail.com",
          sameAs: [
            "https://github.com/moaznaser2342-png",
            "https://www.linkedin.com/in/moaz-naser-63a059348",
          ],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "South Valley University",
          },
          knowsAbout: [
            "Artificial Intelligence",
            "Machine Learning",
            "Python",
            "Data Analysis",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    icon: Code2,
    title: "Programming",
    items: ["Python", "C++", "HTML", "CSS"],
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    items: ["Scikit-learn", "XGBoost", "Feature Engineering"],
  },
  {
    icon: GitBranch,
    title: "Version Control",
    items: ["Git", "GitHub"],
  },
  {
    icon: Database,
    title: "Data & Tools",
    items: ["SQL", "Microsoft Excel", "Gradio"],
  },
  {
    icon: Users,
    title: "Soft Skills",
    items: ["Teamwork", "Communication", "Creativity", "Attention to detail"],
  },
];

const CERTS = [
  {
    title: "AI For Business — ITIDA / NTI Summer Training",
    meta: "Jul 2026 · 120 hours (90 technical + 30 freelancing) · Score 79%",
  },
  {
    title: "Artificial Intelligence — NTI / Huawei Egyptian Talent Academy",
    meta: "Aug–Sep 2025 · 80 hours · Score 89.5%",
  },
  {
    title: "Artificial Intelligence — Certificate of Achievement, IMPACT",
    meta: "Feb 2025 · 15 hours · ISO 21001 & IAO accredited",
  },
  {
    title: "Applications of Artificial Intelligence — British University in Egypt / SCE",
    meta: "Feb 2025 · 15 hours",
  },
  { title: "AI Job Readiness Program — IBDA / TLEC / Creativa", meta: "2025" },
  { title: "AI for Beginners — Certificate of Completion", meta: "Feb 2025" },
  { title: "Egypt Mobile Application Competition — Participant", meta: "2021" },
];

const METRICS = [
  { value: "0.927", label: "R² score" },
  { value: "121.53", label: "MAE" },
  { value: "288.38", label: "RMSE" },
  { value: "4.40%", label: "MAPE" },
];



function Portfolio() {
  const heroPhoto = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-sm font-semibold tracking-[0.2em]">
            MOAZ<span className="text-gradient-gold"> NASER</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-md border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <div className="hero-bloom absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-32 pb-20 md:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <p className="eyebrow text-primary">
                Computer Science &amp; Artificial Intelligence
              </p>
              <h1 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-6xl">
                Moaz Naser
                <span className="mt-2 block text-3xl sm:text-4xl">
                  AI &amp; <span className="text-gradient-gold">ML</span>{" "}
                  Student
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Fourth-year student at South Valley University building intelligent systems
                with machine learning, data analysis, and clean engineering practice.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                >
                  View my work <ArrowRight className="size-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Mail className="size-4" /> Work with me
                </a>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="portrait-halo" aria-hidden />
                <div className="portrait-frame">
                  <img
                    src={
                      heroPhoto?.path
                        ? `/api/public/hero-photo?v=${heroPhoto.updatedAt ?? ""}`
                        : portrait.url
                    }
                    alt="Portrait of Moaz Naser Khalaf Allah"
                    className="aspect-square w-full rounded-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="eyebrow">About me</h2>
            <div className="mt-6 grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Dedicated Computer Science and Artificial Intelligence student with a strong
                passion for intelligent systems, robotics, and modern programming.
                Experienced in AI, Python, C++, data analysis, and machine learning, with
                multiple certified AI courses. Actively seeking opportunities to apply
                technical skills to innovative, real-world projects.
              </p>
              <div className="surface-card p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-1 size-5 text-primary" />
                  <div>
                    <h3 className="text-base font-semibold">
                      Faculty of Computer Science &amp; AI
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      South Valley University — Qena, Egypt
                    </p>
                    <p className="mt-3 text-sm text-primary">
                      2023 – 2027 (expected) · Fourth year
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section id="skills" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="eyebrow">Capabilities</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Technical skill set</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((skill, i) => (
                <Reveal key={skill.title} delay={i * 70}>
                  <article className="surface-card h-full p-6">
                    <skill.icon className="size-5 text-primary" />
                    <h3 className="mt-4 text-lg font-semibold">{skill.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Projects &amp; achievements</h2>
          </Reveal>
          <Reveal delay={100}>
            <article className="surface-card mt-12 p-8 sm:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  SuperKart Sales Prediction
                </h3>
                <span className="text-sm text-primary">2025</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Machine learning regression model
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Built an end-to-end regression pipeline — EDA, feature engineering, and label
                encoding — on an 8,763-record retail sales dataset, then trained an XGBoost
                regressor. Feature-importance analysis identified store location and store
                size as the top sales drivers, and the model was deployed behind an
                interactive Gradio interface for real-time prediction.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {METRICS.map((m) => (
                  <div key={m.label} className="rounded-lg border border-border p-4">
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      {m.label}
                    </dt>
                    <dd className="text-gradient-gold mt-1 font-mono text-xl font-semibold">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </section>

        {/* Credentials */}
        <section id="credentials" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="eyebrow">Credentials</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Certifications &amp; courses
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {CERTS.map((cert, i) => (
                <li key={cert.title}>
                  <Reveal delay={i * 60}>
                    <div className="surface-card flex h-full items-start gap-4 p-5">
                      <Award className="mt-0.5 size-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">{cert.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{cert.meta}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={120}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="surface-card p-5">
                  <h3 className="text-base font-semibold">Languages</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Arabic — Native · English — Good (reading, writing)
                  </p>
                </div>
                <div className="surface-card p-5">
                  <h3 className="text-base font-semibold">Volunteer work</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Volunteer at Resala Association — 2019
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
              Open to internships, research, and AI engineering roles.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <a href="mailto:moaznaser2342@gmail.com" className="surface-card block p-6">
                <Mail className="size-5 text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">Email</p>
                <p className="mt-1 text-sm break-all">moaznaser2342@gmail.com</p>
              </a>
              <a
                href="https://github.com/moaznaser2342-png"
                target="_blank"
                rel="noreferrer noopener"
                className="surface-card block p-6"
              >
                <Github className="size-5 text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">GitHub</p>
                <p className="mt-1 text-sm break-all">github.com/moaznaser2342-png</p>
              </a>
              <a
                href="https://www.linkedin.com/in/moaz-naser-63a059348"
                target="_blank"
                rel="noreferrer noopener"
                className="surface-card block p-6"
              >
                <Linkedin className="size-5 text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">LinkedIn</p>
                <p className="mt-1 text-sm break-all">linkedin.com/in/moaz-naser</p>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Moaz Naser Khalaf Allah</p>
          <div className="flex items-center gap-3">
            <a
              href="mailto:moaznaser2342@gmail.com"
              aria-label="Email"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Mail className="size-4" />
            </a>
            <a
              href="https://github.com/moaznaser2342-png"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/moaz-naser-63a059348"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2 transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="size-4" />
            </a>
            <Link to="/admin" className="transition-colors hover:text-foreground">
              Owner login
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
