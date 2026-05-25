"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
    { href: "/hobbies", label: "Hobbies" },
];

export default function Nav() {
  const path = usePathname();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved !== "light";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  function applyTheme(isDark: boolean) {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty("--bg", "#0d0d0d");
      root.style.setProperty("--bg-2", "#141414");
      root.style.setProperty("--bg-3", "#1a1a1a");
      root.style.setProperty("--border", "#2a2a2a");
      root.style.setProperty("--text", "#e8e3d8");
      root.style.setProperty("--muted", "#6b6560");
      root.style.setProperty("--accent", "#c9a84c");
      root.style.setProperty("--accent-dim", "#a8893d");
      document.body.style.background = "#0d0d0d";
    } else {
      root.style.setProperty("--bg", "#f5f3ef");
      root.style.setProperty("--bg-2", "#eceae4");
      root.style.setProperty("--bg-3", "#e2e0d8");
      root.style.setProperty("--border", "#d4d0c8");
      root.style.setProperty("--text", "#1a1814");
      root.style.setProperty("--muted", "#7a7670");
      root.style.setProperty("--accent", "#a07830");
      root.style.setProperty("--accent-dim", "#8a6628");
      document.body.style.background = "#f5f3ef";
    }
  }

  function toggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "var(--bg)",
      borderBottom: "1px solid var(--border)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        maxWidth: 720, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 56,
      }}>
        <Link href="/" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", color: "var(--accent)" }}>
          LT
        </Link>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 13,
              color: path === l.href ? "var(--accent)" : "var(--muted)",
              letterSpacing: "0.02em",
            }}>
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              cursor: "pointer",
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}