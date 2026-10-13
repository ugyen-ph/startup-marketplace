"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DropdownItem = { icon: string; title: string; desc: string; href: string };
type NavGroup = { label: string; items: DropdownItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "For Startups",
    items: [
      { icon: "lightbulb", title: "Submit Idea", desc: "Share your startup concept and get investor feedback.", href: "/startups/new" },
      { icon: "extension", title: "Startup Tools", desc: "Resources to validate and grow your idea.", href: "#startup-tools" },
      { icon: "school", title: "Mentorship", desc: "Connect with experienced entrepreneurs.", href: "#mentorship" },
      { icon: "groups", title: "Startup Community", desc: "Join fellow founders and build connections.", href: "#community" },
    ],
  },
  {
    label: "For Investors",
    items: [
      { icon: "search", title: "Discover Startups", desc: "Find promising startup ideas to invest in.", href: "/startups" },
      { icon: "business", title: "Angel Network", desc: "Connect with accredited investors.", href: "#angel-network" },
      { icon: "contract", title: "Deal Flow", desc: "Manage your startup investments efficiently.", href: "#deal-flow" },
      { icon: "analytics", title: "Analytics", desc: "Track portfolio performance and metrics.", href: "#analytics" },
    ],
  },
  {
    label: "Resources",
    items: [
      { icon: "school", title: "Documentation", desc: "Learn how to use StartupHub effectively.", href: "#docs" },
      { icon: "article", title: "Blog", desc: "Startup insights, funding tips, and success stories.", href: "#blog" },
      { icon: "people", title: "Community", desc: "Join the startup community forums.", href: "#community" },
      { icon: "help", title: "Support", desc: "Get help from the StartupHub team.", href: "#support" },
    ],
  },
];

function DropdownLink({ item }: { item: DropdownItem }) {
  const inner = (
    <>
      <span className="dd-icon material-symbols">{item.icon}</span>
      <span>
        <span className="dd-title">{item.title}</span>
        <span className="dd-desc">{item.desc}</span>
      </span>
    </>
  );

  return item.href.startsWith("/") ? (
    <Link href={item.href}>{inner}</Link>
  ) : (
    <a href={item.href}>{inner}</a>
  );
}

export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="nav" ref={navRef}>
      <div className="nav-inner">
        <Link className="brand" href="/">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 34c-7.7 0-14-6.3-14-14S16.3 10 24 10s14 6.3 14 14-6.3 14-14 14z" />
            <path fill="#EA4335" d="M24 10c7.7 0 14 6.3 14 14 0 2.4-.6 4.7-1.6 6.7L17.3 11.6C19.3 10.6 21.6 10 24 10z" />
            <path fill="#FBBC05" d="M10 24c0-7.7 6.3-14 14-14 2.4 0 4.7.6 6.7 1.6L11.6 30.7C10.6 28.7 10 26.4 10 24z" />
            <path fill="#34A853" d="M38 24c0 7.7-6.3 14-14 14-2.4 0-4.7-.6-6.7-1.6l11.8-19.1c2 1 3.3 3.2 3.3 5.7 0 2.8-1.2 5.3-3.1 7.1l8.2 6.5C36.9 35.4 38 30 38 24z" />
          </svg>
          <span>StartupHub</span>
        </Link>
        <nav className="nav-links">
          {NAV_GROUPS.slice(0, 2).map((group, i) => (
            <div
              key={group.label}
              className={`nav-item${open === i ? " open" : ""}`}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen((cur) => (cur === i ? null : cur))}
            >
              <button
                className="nav-btn"
                aria-haspopup="true"
                aria-expanded={open === i}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(open === i ? null : i);
                }}
              >
                {group.label} <span className="material-symbols">expand_more</span>
              </button>
              <div className="dropdown">
                {group.items.map((item) => (
                  <DropdownLink key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
          <div className="nav-item">
            <a className="nav-btn" href="#use-cases">Success Stories</a>
          </div>
          <div className="nav-item">
            <a className="nav-btn" href="#pricing">Pricing</a>
          </div>
          <div
            className={`nav-item${open === 2 ? " open" : ""}`}
            onMouseEnter={() => setOpen(2)}
            onMouseLeave={() => setOpen((cur) => (cur === 2 ? null : cur))}
          >
            <button
              className="nav-btn"
              aria-haspopup="true"
              aria-expanded={open === 2}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(open === 2 ? null : 2);
              }}
            >
              {NAV_GROUPS[2].label} <span className="material-symbols">expand_more</span>
            </button>
            <div className="dropdown">
              {NAV_GROUPS[2].items.map((item) => (
                <DropdownLink key={item.title} item={item} />
              ))}
            </div>
          </div>
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-primary" href="/signup">
            <span className="material-symbols filled">person_add</span> Create Account
          </Link>
        </div>
      </div>
    </header>
  );
}
