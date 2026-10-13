import Link from "next/link";
import "./landing.css";
import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { RevealObserver } from "@/components/landing/reveal-observer";

const BLOGS = [
  { t: "How to pitch your startup idea to investors", d: "Sep 28, 2026", cats: [["Guides", ""]], c1: "#1a2f52", c2: "#0e1626" },
  { t: "Seed round closed: GreenLoop raises $2.4M via StartupHub", d: "Sep 1, 2026", cats: [["Success", "alt"]], c1: "#0f3326", c2: "#0c1a14" },
  { t: "What investors actually look for in 2026", d: "Aug 27, 2026", cats: [["Insights", "alt2"], ["Investors", ""]], c1: "#2a1a3a", c2: "#141024" },
  { t: "Valuing an early-stage startup: a founder guide", d: "Aug 26, 2026", cats: [["Guides", ""]], c1: "#3a2a12", c2: "#1c1408" },
  { t: "From idea to term sheet in 30 days", d: "Aug 24, 2026", cats: [["Success", ""]], c1: "#12303a", c2: "#0a1a20" },
  { t: "Building an investor-ready pitch deck", d: "Aug 21, 2026", cats: [["Guides", ""]], c1: "#331420", c2: "#1a0a10" },
  { t: "Angel investing 101: backing your first startup", d: "Aug 20, 2026", cats: [["Investors", "alt"]], c1: "#1c2a3a", c2: "#0e1620" },
  { t: "Meet the founders who got funded this month", d: "Aug 20, 2026", cats: [["Community", ""]], c1: "#241a30", c2: "#120c18" },
  { t: "Due diligence checklist for first-time investors", d: "Aug 13, 2026", cats: [["Investors", "alt2"]], c1: "#102a1f", c2: "#081811" },
];

const NAV_MENU = [
  { label: "For Startups", links: [["Submit Idea", "/startups/new"], ["Startup Tools", "#startup-tools"], ["Mentorship", "#mentorship"], ["Community", "#community"], ["Success Stories", "#use-cases"]] },
  { label: "For Investors", links: [["Discover Startups", "/startups"], ["Angel Network", "#angel-network"], ["Deal Flow", "#deal-flow"], ["Analytics", "#analytics"], ["Pricing", "#pricing"]] },
  { label: "Company", links: [["Documentation", "#docs"], ["Support", "#support"], ["Blog", "#blog"], ["Community", "#community"], ["Sign Up", "/signup"]] },
];

export default function Home() {
  return (
    <div className="sh-landing">
      <SiteNav />
      <Hero />

      <section className="intro" id="products">
        <div className="section">
          <p className="intro-statement reveal">
            StartupHub is your <b>trusted platform to share startup ideas</b> and get backed by
            investors who believe in your vision.
          </p>
          <div className="product-grid">
            <div className="product-card reveal">
              <div className="pc-top">
                <span className="pc-icon blue material-symbols">lightbulb</span>
                <span className="pc-title">Submit Idea</span>
              </div>
              <p className="pc-desc">
                Create a complete startup profile with your idea, team, market opportunity, and ask.
                Get feedback from investors and mentors instantly.
              </p>
              <div className="pc-visual">
                <div className="fake-window">
                  <div className="fake-bar accent" />
                  <div className="fake-bar" />
                  <div className="fake-bar mid" />
                  <div className="fake-bar short" />
                </div>
              </div>
              <Link className="pc-link" href="/startups/new">
                Submit your idea <span className="material-symbols">arrow_forward</span>
              </Link>
            </div>
            <div className="product-card reveal">
              <div className="pc-top">
                <span className="pc-icon green material-symbols">search</span>
                <span className="pc-title">Investor Discovery</span>
              </div>
              <p className="pc-desc">
                Browse through vetted startups with detailed profiles, pitch decks, and investor
                interest levels. Connect directly with founders.
              </p>
              <div className="pc-visual terminal">
                <div className="fake-window">
                  <div className="fake-bar">
                    <span className="prompt">search</span> --sector technology --stage seed
                  </div>
                  <div className="fake-bar">✓ 47 matches found</div>
                  <div className="fake-bar">
                    <span className="prompt">view</span> bio-tech startup
                  </div>
                  <div className="fake-bar">✓ 2 investors interested</div>
                </div>
              </div>
              <Link className="pc-link" href="/startups">
                Discover startups <span className="material-symbols">arrow_forward</span>
              </Link>
            </div>
            <div className="product-card reveal">
              <div className="pc-top">
                <span className="pc-icon yellow material-symbols">groups</span>
                <span className="pc-title">Investor Network</span>
              </div>
              <p className="pc-desc">
                Connect with accredited investors, angel groups, and venture capitalists. Build
                relationships and secure meetings with your target investors.
              </p>
              <div className="pc-visual">
                <div className="fake-window">
                  <div className="fake-bar accent" />
                  <div className="fake-bar" />
                  <div className="fake-bar mid" />
                  <div className="fake-bar" />
                  <div className="fake-bar short" />
                </div>
              </div>
              <Link className="pc-link" href="/startups">
                Build network <span className="material-symbols">arrow_forward</span>
              </Link>
            </div>
            <div className="product-card reveal">
              <div className="pc-top">
                <span className="pc-icon red material-symbols">contract</span>
                <span className="pc-title">Deal Management</span>
              </div>
              <p className="pc-desc">
                Manage the entire deal flow from initial contact to closing. Track conversations,
                documents, and deal progress in one place.
              </p>
              <div className="pc-visual terminal">
                <div className="fake-window">
                  <div className="fake-bar">
                    <span className="prompt">deal</span> track --deal-id ABC-123
                  </div>
                  <div className="fake-bar">✓ 3/5 terms negotiated</div>
                  <div className="fake-bar">
                    <span className="prompt">meeting</span> scheduled --next week
                  </div>
                  <div className="fake-bar">✓ 85% complete</div>
                </div>
              </div>
              <Link className="pc-link" href="/dashboard">
                Manage deals <span className="material-symbols">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases">
        <div className="section">
          <div className="section-head reveal">
            <span className="eyebrow">Success stories</span>
            <h2>Real founders getting funded</h2>
            <p>
              Discover how startups on StartupHub are turning ideas into successful ventures with
              investor support.
            </p>
          </div>
          <div className="persona-grid">
            <div className="persona-card reveal">
              <div className="persona-media">
                <div className="bt-art" style={{ background: "linear-gradient(135deg,#1a2f52,#0e1626)" }}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect x="10" y="14" width="44" height="36" rx="4" stroke="#8ab4f8" strokeWidth="2.5" />
                    <path d="M22 26l-8 6 8 6M42 26l8 6-8 6" stroke="#8ab4f8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="34" y1="24" x2="30" y2="40" stroke="#fdd663" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pm-grad" />
                <span className="pm-cursor material-symbols filled">lightbulb</span>
              </div>
              <div className="persona-body">
                <h3>Startup Founder</h3>
                <p>
                  Share your innovative idea, get feedback from investors, and secure funding. Track
                  all investor interest and connections in one place.
                </p>
                <a className="persona-link" href="#use-cases">
                  Submit idea <span className="material-symbols">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-media">
                <div className="bt-art" style={{ background: "linear-gradient(135deg,#2a1a3a,#141024)" }}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect x="12" y="10" width="40" height="44" rx="4" stroke="#c58af9" strokeWidth="2.5" />
                    <rect x="20" y="18" width="24" height="5" rx="2.5" fill="#c58af9" />
                    <rect x="20" y="28" width="24" height="5" rx="2.5" fill="#8ab4f8" />
                    <rect x="20" y="38" width="14" height="5" rx="2.5" fill="#fdd663" />
                  </svg>
                </div>
                <div className="pm-grad" />
                <span className="pm-cursor material-symbols filled">business</span>
              </div>
              <div className="persona-body">
                <h3>Angel Investor</h3>
                <p>
                  Discover promising startups, evaluate ideas, and invest in the next big thing.
                  Manage your portfolio and track returns.
                </p>
                <a className="persona-link" href="#use-cases">
                  Find startups <span className="material-symbols">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-media">
                <div className="bt-art" style={{ background: "linear-gradient(135deg,#0f3326,#0c1a14)" }}>
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect x="10" y="12" width="44" height="34" rx="4" stroke="#81c995" strokeWidth="2.5" />
                    <circle cx="32" cy="29" r="8" stroke="#81c995" strokeWidth="2.5" />
                    <line x1="32" y1="46" x2="32" y2="54" stroke="#81c995" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="22" y1="54" x2="42" y2="54" stroke="#81c995" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="pm-grad" />
                <span className="pm-cursor material-symbols filled">web</span>
              </div>
              <div className="persona-body">
                <h3>Venture Capitalist</h3>
                <p>
                  Evaluate startup submissions, syndicate deals, and scale investments. Access
                  detailed analytics and team profiles.
                </p>
                <a className="persona-link" href="#use-cases">
                  Invest now <span className="material-symbols">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="section" style={{ paddingTop: 40 }}>
          <div className="cta-grid">
            <div className="cta-card dev reveal">
              <span className="cc-tag">Free for startups</span>
              <h3>For startups</h3>
              <p>
                Share your idea, build your profile, and connect with investors who believe in your
                vision.
              </p>
              <Link className="btn btn-primary" href="/startups/new">
                <span className="material-symbols filled">lightbulb</span> Submit Idea
              </Link>
            </div>
            <div className="cta-card org reveal">
              <span className="cc-tag">Verified investors</span>
              <h3>For investors</h3>
              <p>
                Discover vetted startups, evaluate opportunities, and manage your deal flow in one
                place.
              </p>
              <Link className="btn btn-secondary-inverse" href="/startups">
                Browse startups <span className="material-symbols">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="blog">
        <div className="section" style={{ paddingTop: 40 }}>
          <div
            className="section-head reveal"
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", maxWidth: "none", gap: 24, flexWrap: "wrap" }}
          >
            <div>
              <span className="eyebrow">From the blog</span>
              <h2>Startup Insights &amp; Success Stories</h2>
            </div>
            <a className="pc-link" href="#blog" style={{ marginBottom: 8 }}>
              View blog <span className="material-symbols">arrow_forward</span>
            </a>
          </div>
          <div className="blog-grid">
            {BLOGS.map((b) => (
              <a className="blog-card reveal" href="#blog" key={b.t}>
                <div className="blog-thumb">
                  <div className="bt-art" style={{ background: `linear-gradient(135deg,${b.c1},${b.c2})` }}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="blog-body">
                  <div className="blog-cats">
                    {b.cats.map((c) => (
                      <span className={`blog-cat ${c[1]}`} key={c[0]}>
                        {c[0]}
                      </span>
                    ))}
                  </div>
                  <h3>{b.t}</h3>
                  <div className="blog-meta">
                    <span>{b.d}</span>
                    <span className="read">
                      Read blog <span className="material-symbols">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="download-banner" id="signup">
        <div className="download-inner reveal">
          <h2>Join StartupHub today</h2>
          <p>Create your free account and start connecting startups with investors.</p>
          <div className="download-btns">
            <Link className="btn btn-primary" href="/signup?role=founder">
              <span className="material-symbols filled">lightbulb</span> I&apos;m a Founder
            </Link>
            <Link className="btn btn-secondary-inverse" href="/signup?role=investor">
              <span className="material-symbols filled">savings</span> I&apos;m an Investor
            </Link>
          </div>
          <div className="dl-note">
            <span className="material-symbols">verified</span> Free to join &mdash; no credit card
            required
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link className="brand" href="/">
                <div className="brand-logo-wrapper">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <defs>
                      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4285F4" />
                        <stop offset="25%" stopColor="#EA4335" />
                        <stop offset="50%" stopColor="#FBBC05" />
                        <stop offset="75%" stopColor="#34A853" />
                        <stop offset="100%" stopColor="#4285F4" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#logo-gradient)" d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 34c-7.7 0-14-6.3-14-14S16.3 10 24 10s14 6.3 14 14-6.3 14-14 14z" className="logo-main-path" />
                    <path fill="#FFFFFF" d="M24 10c7.7 0 14 6.3 14 14 0 2.4-.6 4.7-1.6 6.7L17.3 11.6C19.3 10.6 21.6 10 24 10z" className="logo-path" />
                    <path fill="#FFFFFF" d="M38 24c0 7.7-6.3 14-14 14-2.4 0-4.7-.6-6.7-1.6l11.8-19.1c2 1 3.3 3.2 3.3 5.7 0 2.8-1.2 5.3-3.1 7.1l8.2 6.5C36.9 35.4 38 30 38 24z" className="logo-path" />
                    <path fill="#FFFFFF" d="M10 24c0-7.7 6.3-14 14-14 2.4 0 4.7.6 6.7 1.6L11.6 30.7C10.6 28.7 10 26.4 10 24z" className="logo-path" />
                  </svg>
                  <div className="brand-glow" />
                </div>
                <span>StartupHub</span>
              </Link>
              <p>
                The platform where startups share ideas and connect with investors. Turn your vision
                into a funded venture.
              </p>
            </div>
            {NAV_MENU.map((col) => (
              <div className="footer-col" key={col.label}>
                <h4>{col.label}</h4>
                {col.links.map(([label, href]) =>
                  href.startsWith("/") ? (
                    <Link href={href} key={label}>
                      {label}
                    </Link>
                  ) : (
                    <a href={href} key={label}>
                      {label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <a className="g-logo" href="#">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              StartupHub
            </a>
            <div className="legal">
              <a href="#">About StartupHub</a>
              <a href="#">Careers</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Manage cookies</a>
            </div>
            <span className="copy">&copy; 2026 StartupHub Inc.</span>
          </div>
        </div>
      </footer>

      <RevealObserver />
    </div>
  );
}
