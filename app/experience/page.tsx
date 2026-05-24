export const metadata = { title: "Experience — Lucian Tong" };

const jobs = [
  {
    company: "Hang Seng Bank",
    role: "Liabilities and FX Intern",
    location: "Hong Kong",
    period: "Incoming July 2026",
    type: "Incoming",
    bullets: [
      "Joining the Retail Banking & Wealth Management division",
      "Supporting liabilities and foreign exchange product operations",
    ],
  },
  {
    company: "Locoround",
    role: "Strategy and Data Analysis Intern",
    location: "Toronto, ON",
    period: "Sept 2025 – May 2026",
    type: "",
    bullets: [
      "Engineered end-to-end ETL pipelines in Python (Pandas, GeoPandas) to process multi-source datasets into analysis-ready formats",
      "Built KPI dashboards and performed statistical modeling to surface insights supporting go-to-market strategy",
      "Automated reproducible analytical workflows and data visualizations for cross-functional stakeholders",
    ],
  },
  {
    company: "Computershare",
    role: "Corporate Services Intern",
    location: "Hong Kong",
    period: "May 2025 – Aug 2025",
    type: "",
    bullets: [
      "Managed real-time voting data and compliance reporting across 15+ AGM events for HKEX-listed clients including Tencent, HSBC, and CK Hutchison",
      "Coordinated cross-functional data workflows within a global financial services organization under strict regulatory deadlines",
      "Gained exposure to corporate governance processes and shareholder meeting execution for large-cap Hong Kong-listed companies",
    ],
  },
  {
    company: "Kenswick CPA Ltd.",
    role: "Audit and Assurance Intern",
    location: "Hong Kong",
    period: "May 2024 - July 2024",
    type: "",
    bullets: [
      "Assisted in audit engagements including working paper preparation and reconciliation of financial statements",
      "Performed financial analysis and vouching to verify accuracy of reported figures",
      "Supported senior auditors in identifying discrepancies and assessing internal controls",
    ],
  },
  {
    company: "University of Toronto — School of Cities",
    role: "Data Mapping Research Assistant",
    location: "Toronto, ON",
    period: "May 2026 - Present",
    type: "Current",
    bullets: [
      "Mapped urban transit and land use datasets to ontological frameworks (OWL/RDF), enabling semantic interoperability across heterogeneous data sources",
      "Designed ontology-driven data pipelines to structure, validate, and harmonize geospatial datasets for a public research dataset",
      "Maintained data libraries and processing documentation to support reproducible analytical pipelines",
    ],
  },
];

const typeColor: Record<string, string> = {
  "Incoming": "rgba(201,168,76,0.15)",
  "Current": "rgba(201,168,76,0.25)",
};
const typeText: Record<string, string> = {
  "Incoming": "var(--accent-dim)",
  "Current": "var(--accent)",
};

export default function Experience() {
  return (
    <div style={{ paddingTop: 72, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 48, fontWeight: 500 }}>
        Experience
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {jobs.map((job, i) => (
          <div key={i} style={{
            background: "var(--bg-2)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "24px 28px", marginBottom: 8,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{job.company}</h2>
                  {job.type && (
                    <span style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 4,
                      background: typeColor[job.type], color: typeText[job.type],
                      fontWeight: 500, letterSpacing: "0.04em",
                    }}>
                      {job.type}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{job.role}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>{job.period}</p>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>{job.location}</p>
              </div>
            </div>
            <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent)", marginTop: 6, fontSize: 6, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <h2 style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 56, marginBottom: 24, fontWeight: 500 }}>
        Education
      </h2>
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>University of Toronto</h3>
            <p style={{ fontSize: 13, color: "var(--accent)" }}>Bachelor of Commerce — Specialisation in Finance & Economics, Focus in Data Science, Minor in Sociology</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>Started 2023</p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>Toronto, ON</p>
          </div>
        </div>
      </div>
    </div>
  );
}
