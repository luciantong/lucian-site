"use client";
import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { title: "Vibing in Rosedale Valley 🏃", src: "/song1.mp3" },
  { title: "Fighting through midterms... 🖊", src: "/song2.mp3" },
  { title: "The Phantom of Pulp Fiction 🔫", src: "/song3.mp3" },
];

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [minimized, setMinimized] = useState(false);

  const track = TRACKS[trackIdx];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.src = track.src;
    a.load();
    if (playing) a.play().catch(() => setPlaying(false));
  }, [trackIdx]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  }

  function prev() { setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length); }
  function next() { setTrackIdx((i) => (i + 1) % TRACKS.length); }

  function onTimeUpdate() { setCurrent(audioRef.current?.currentTime || 0); }
  function onLoadedMetadata() { setDuration(audioRef.current?.duration || 0); }
  function onEnded() { next(); }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setCurrent(Number(e.target.value));
  }

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div style={{
        position: "fixed", right: 24, bottom: 24, zIndex: 60,
        width: minimized ? "auto" : 300,
        background: "rgba(18,18,18,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        transition: "width 0.3s",
      }}>
        {minimized ? (
          <button data-instant onClick={() => setMinimized(false)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 16px", background: "none", border: "none",
            cursor: "pointer", color: "var(--accent)",
          }}>
            <span style={{ fontSize: 16 }}>{playing ? "▶" : "⏸"}</span>
            <span style={{ fontSize: 12, color: "#e8e3d8", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {track.title}
            </span>
          </button>
        ) : (
          <div style={{ padding: "16px 18px" }}>

            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e8e3d8", marginBottom: 2 }}>{track.title}</p>
                <p style={{ fontSize: 11, color: "#6b6560" }}>luxx</p>
              </div>
              <button data-instant onClick={() => setMinimized(true)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#6b6560", fontSize: 16, lineHeight: 1,
              }}>−</button>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 10 }}>
              <input
                type="range" min={0} max={duration || 100} step={0.1}
                value={current} onChange={seek} data-instant
                style={{
                  width: "100%", height: 3, cursor: "pointer",
                  appearance: "none",
                  background: `linear-gradient(to right, var(--accent) ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
                  borderRadius: 2, outline: "none", border: "none",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 10, color: "#6b6560" }}>{formatTime(current)}</span>
                <span style={{ fontSize: 10, color: "#6b6560" }}>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 14 }}>
              <button data-instant onClick={prev} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", fontSize: 16 }}>⏮</button>
              <button data-instant onClick={togglePlay} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "var(--accent)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "#0d0d0d", fontWeight: 700,
              }}>
                {playing ? "⏸" : "▶"}
              </button>
              <button data-instant onClick={next} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b6560", fontSize: 16 }}>⏭</button>
            </div>

            {/* Volume */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#6b6560" }}>🔈</span>
              <input
                type="range" min={0} max={1} step={0.01}
                value={volume} onChange={e => setVolume(Number(e.target.value))} data-instant
                style={{
                  flex: 1, height: 3, cursor: "pointer", appearance: "none",
                  background: `linear-gradient(to right, #6b6560 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
                  borderRadius: 2, outline: "none", border: "none",
                }}
              />
              <span style={{ fontSize: 11, color: "#6b6560" }}>🔊</span>
            </div>

            {/* Track dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {TRACKS.map((_, i) => (
                <button data-instant key={i} onClick={() => setTrackIdx(i)} style={{
                  width: i === trackIdx ? 16 : 6, height: 6,
                  borderRadius: 3, border: "none", cursor: "pointer",
                  background: i === trackIdx ? "var(--accent)" : "rgba(255,255,255,0.2)",
                  transition: "width 0.2s, background 0.2s",
                }} />
              ))}
            </div>

            {/* Credit */}
            <p style={{ textAlign: "center", fontSize: 10, color: "#3a3835", marginTop: 10, letterSpacing: "0.06em" }}>
              all tracks produced by luxx
            </p>

          </div>
        )}
      </div>
    </>
  );
}