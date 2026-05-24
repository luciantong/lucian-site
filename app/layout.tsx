import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import CursorGlow from "@/components/CursorGlow";
import BackgroundMusic from "@/components/BackgroundMusic";

export const metadata: Metadata = {
  title: "Lucian Tong",
  description: "Finance & Data — University of Toronto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CursorGlow />
        <Nav />
        <BackgroundMusic />
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          {children}
        </main>
        <footer style={{ maxWidth: 720, margin: "80px auto 0", padding: "48px 24px 32px", borderTop: "1px solid var(--border)", color: "var(--muted)", fontSize: 13 }}>
          © {new Date().getFullYear()} Lucian (Lok Him) Tong
        </footer>
      </body>
    </html>
  );
}