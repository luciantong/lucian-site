"use client";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date: string;
};

const SAMPLE: Project[] = [
  {
    id: "1",
    title: "UTTRI Transit Data Challenge - ForeTransit",
    description: "Transit forecasting application with machine learning algorithms XGBoost, and academic backing from Chen et. al. A 'weather forecast' for Toronto transit, providing actionable insights for commuters and transit planners.",
    tags: ["Python", "Pandas", "XGBoost", "GTFS-Data", "Datathon", "Exploratory Data Analysis"],
    link: "http://foretransit.vercel.app", //
    date: "2026",
  },
  {
    id: "2",
    title: "MAGI Supercomputer - UI Inspired by Neon Genesis Evangelion",
    description: "Interactive UI for MAGI, a 'supercomputer' that tells you facts about the best anime in the world.",
    tags: [ "HTML", "JavaScript", "CSS", "Anime"],
    link: "https://magi-supercomputer.vercel.app/",
    date: "2026",
  },
  {
    id: "3",
    title: "Irrationale Magazine",
    description: "Co-founder and editor of a student-run publication at the University of Toronto dedicated to exploring the intersection of behavioral economics and finance. Defying 'rationality'",
    tags: [ "Finance", "Behavioral Economics", "Creative Writing", "Student-led Initiative"],
    link: "https://irrationale.wixsite.com/homepage",
    date: "2025 - Present",
  },
  {
    id: "4",
    title: "Data Mapping for Locoround's GTM Strategy",
    description: "Geospatial analysis of Toronto using Python and Jupyter notebooks. Processed and visualised location data to support go-to-market strategy at Locoround, mapping neighbourhood-level insights across the city.",
    tags: [ "Python", "Jupyter", "GeoPandas", "GTM Strategy", "Geospatial Analysis"],
    link: "https://github.com/luciantong/mapping-toronto-for-gtm",
    date: "2025",
  },
    {
    id: "5",
    title: "Alphabet Inc. Equity Research Report",
    description: "DCF analysis of Alphabet Inc. stock.",
    tags: [ "Financial Modelling", "DCF", "Equity Research", "Excel"],
    link: "https://docs.google.com/document/d/1H0Huz9PVMlVtCKDeNGeEOMxAo4tpC_ETatIlXO4vTzY/edit?usp=sharing",
    date: "2025",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Python: { bg: "rgba(201,168,76,0.1)", text: "var(--accent)" },
  Research: { bg: "rgba(100,120,200,0.1)", text: "#8899dd" },
  ETL: { bg: "rgba(80,180,120,0.1)", text: "#6bbf8a" },
  GeoSpatial: { bg: "rgba(180,100,100,0.1)", text: "#cc7777" },
  default: { bg: "rgba(255,255,255,0.05)", text: "var(--muted)" },
};

function tagStyle(tag: string) {
  const c = TAG_COLORS[tag] || TAG_COLORS.default;
  return { background: c.bg, color: c.text, fontSize: 11, padding: "3px 9px", borderRadius: 4, fontWeight: 500, letterSpacing: "0.03em" };
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>(SAMPLE);

  return (
    <div style={{ paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
          Projects
        </h1>
      </div>

      

      {/* Project grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {projects.map(p => (
          <div key={p.id} style={{
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "22px 28px",
            transition: "border-color 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{p.title}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{p.date}</span>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "var(--accent)", borderBottom: "1px solid rgba(201,168,76,0.3)" }}>
                    View ↗
                  </a>
                )}
              </div>
            </div>
            {p.description && (
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 14 }}>{p.description}</p>
            )}
            {p.tags.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tags.map(t => <span key={t} style={tagStyle(t)}>{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
