import Link from "next/link";

export default function Home() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 80 }}>

      {/* Hero */}
      <div style={{ marginBottom: 72 }}>
        <p style={{ fontSize: 13, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
          Hong Kong · Toronto
        </p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
          Lucian<br />
          <span style={{ color: "var(--muted)", fontWeight: 300 }}>(Lok Him) Tong</span>
        </h1>
        <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 480, lineHeight: 1.8, marginBottom: 32 }}>
          Finance, Economics & Data Science undergraduate at the University of Toronto. Interested in equity capital markets, investment banking, and the intersection of data and financial decision-making.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/projects" style={{
            display: "inline-block", padding: "10px 22px",
            background: "var(--accent)", color: "#0d0d0d",
            borderRadius: 6, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
            transition: "opacity 0.2s",
          }}>
            View Projects →
          </Link>
          <Link href="/experience" style={{
            display: "inline-block", padding: "10px 22px",
            border: "1px solid var(--border)", color: "var(--text)",
            borderRadius: 6, fontSize: 13, fontWeight: 400,
            transition: "border-color 0.2s",
          }}>
            Experience
          </Link>
        </div>
      </div>

      {/* Bio timeline */}
      <div style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28, fontWeight: 500 }}>
          Bio
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { year: "2005", text: "Born in Hong Kong (香港) 🇭🇰" },
            { year: "2017", text: "Studied in La Salle College, Hong Kong" },
            { year: "2020", text: "Moved to Toronto, Canada 🇨🇦. Started studying at Markville Secondary School" },
            { year: "2023", text: "Enrolled at University of Toronto — Rotman Commerce" },
            { year: "2024", text: "Audit & Assurance Intern at Kenswick CPA, Hong Kong" },
            { year: "2025", text: "Corporate Services Intern at Computershare, Hong Kong" },
            { year: "2025–", text: "Strategy & Data Intern at Locoround, Toronto" },
            { year: "2026", text: "Incoming — Hang Seng Bank, RBW - Liabilities & FX" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 24, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500, minWidth: 44, paddingTop: 2, fontVariantNumeric: "tabular-nums" }}>
                {item.year}
              </span>
              <span style={{ fontSize: 14, color: "var(--text)" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Currently */}
      <div style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28, fontWeight: 500 }}>
          Currently
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { label: "Studying", value: "Finance & Economics, Data Science Focus @ UofT" },
            { label: "Working on", value: "Data pipelines & market research" },
            { label: "Interested in", value: "Data Science · Urban Data Research · ECM · M&A · Macro" },
            { label: "Based in", value: "Toronto & Hong Kong" },
          ].map((item, i) => (
            <div key={i} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</p>
              <p style={{ fontSize: 14, color: "var(--text)" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div>
        <h2 style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>
          Connect
        </h2>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/lucian-tong-3724a8157/" },
            { label: "GitHub", href: "https://github.com/luciantong" },
            { label: "Email", href: "mailto:lucian.tong@mail.utoronto.ca" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: 2, transition: "color 0.2s" }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
