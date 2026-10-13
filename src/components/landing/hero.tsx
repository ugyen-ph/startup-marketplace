"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const PHRASES = [
  "Turn ideas into reality with investor support.",
  "Get funded for your innovative startup concept.",
  "Connect with the right investors for your startup.",
  "Transform your vision into a funded venture.",
];

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const typedEl = typedRef.current;
    if (!typedEl) return;
    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timer: number;

    const type = () => {
      const text = PHRASES[pi];
      typedEl.textContent = text.slice(0, ci);
      if (!deleting) {
        if (ci < text.length) {
          ci += 2;
          timer = window.setTimeout(type, 28);
        } else {
          deleting = true;
          timer = window.setTimeout(type, 4000);
        }
      } else if (ci > 0) {
        ci -= 4;
        timer = window.setTimeout(type, 12);
      } else {
        deleting = false;
        pi = (pi + 1) % PHRASES.length;
        timer = window.setTimeout(type, 400);
      }
    };
    type();
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth * dpr;
      H = canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const parts = Array.from({ length: Math.min(90, Math.floor(window.innerWidth / 14)) }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.6,
      hue: Math.random() < 0.75 ? 215 : 260,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx * dpr;
        p.y += p.vy * dpr;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 160 * dpr && d > 0) {
          p.x += (dx / d) * 0.8;
          p.y += (dy / d) * 0.8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 72%, ${0.35 + (d < 200 * dpr ? 0.3 : 0)})`;
        ctx.fill();
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const max = 130 * dpr;
          if (d < max) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(138,180,248,${(1 - d / max) * 0.14})`;
            ctx.lineWidth = dpr;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero">
      <canvas id="particles" ref={canvasRef} />
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" /> Connecting startups with investors
        </div>
        <h1>
          <span className="typed-line" ref={typedRef} />
          <span className="typed-cursor" aria-hidden="true" />
        </h1>
        <p className="sub">
          StartupHub is your platform to share startup ideas and connect with angel investors,
          venture capitalists, and startup mentors.
        </p>
        <div className="hero-cta">
          <Link className="btn btn-primary" href="/startups/new">
            <span className="material-symbols filled">lightbulb</span> Submit Your Idea
          </Link>
          <Link className="btn btn-secondary-inverse" href="/startups">
            <span className="material-symbols">search</span> Find Startups
          </Link>
        </div>
        <div className="hero-meta">
          <span className="material-symbols">people</span>
          <span>500+ startups and investors already on board</span>
          <span aria-hidden="true">&middot;</span>
          <a href="#products">How it works</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span className="material-symbols">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
