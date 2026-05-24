"use client";
import { useState } from "react";

export default function InterestsClient() {
  const [scLoaded, setScLoaded] = useState(false);

  return (
    <div style={{ paddingTop: "72px", paddingBottom: "80px" }}>

      <h1 style={{ fontSize: "13px", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "56px", fontWeight: 500 }}>
        Interests
      </h1>

      {/* Music */}
      <section style={{ marginBottom: "72px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text)" }}>Music</h2>
          <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, letterSpacing: "0.06em" }}>luxx</span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.8, marginBottom: "24px", maxWidth: "480px" }}>
          Experimenting with different sounds and genres since 2018.
        </p>

        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--bg-2)", position: "relative" }}>
          {!scLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)", zIndex: 1 }}>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>Loading player...</span>
            </div>
          )}
          <iframe
            width="100%"
            height="300"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/914503648&color=%23c9a84c&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            style={{ border: "none", display: "block" }}
            onLoad={() => setScLoaded(true)}
          />
        </div>

        {/* FIXED: Added the missing <a tag here */}
        <a
          href="https://soundcloud.com/luciant-10008123"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: "14px", fontSize: "12px", color: "var(--muted)", borderBottom: "1px solid var(--border)", paddingBottom: "2px" }}
        >
          soundcloud.com/luciant-10008123 ↗
        </a>
      </section>

      {/* Interests */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text)" }}>Interests</h2>
        </div>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.8, marginBottom: "28px", maxWidth: "480px" }}>
          Things I spend time on outside of work.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {[
            { label: "Bouldering", note: "V-0 climber" },
            { label: "Toronto Raptors", note: "Scottie Barnes" },
            { label: "Basketball", note: "Playing and watching" },
            { label: "Anime", note: "Selectively" },
            { label: "Music Production", note: "See above" },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px",
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}>
              <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{item.note}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}