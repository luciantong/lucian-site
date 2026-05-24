"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const pos = useRef({ x: -500, y: -500 });
  const ringPos = useRef({ x: -500, y: -500 });
  const bgPos = useRef({ x: -500, y: -500 });
  const raf = useRef<number>(0);
  const TRAIL_COUNT = 14;
  const HOLD_MS = 500;
  const holdTimers = useRef<Map<HTMLElement, { timer: ReturnType<typeof setTimeout>; progress: HTMLElement; overlay: HTMLElement; moveSvg: () => void }>>(new Map());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      bgPos.current.x += (pos.current.x - bgPos.current.x) * 0.04;
      bgPos.current.y += (pos.current.y - bgPos.current.y) * 0.04;
      if (bgGlowRef.current) {
        bgGlowRef.current.style.transform = `translate(${bgPos.current.x}px, ${bgPos.current.y}px)`;
      }
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const t = (i + 1) / TRAIL_COUNT;
        const tx = ringPos.current.x + (pos.current.x - ringPos.current.x) * (1 - t) * 0.5;
        const ty = ringPos.current.y + (pos.current.y - ringPos.current.y) * (1 - t) * 0.5;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        el.style.opacity = String((1 - t) * 0.55);
        const size = 3.5 * (1 - t * 0.65);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.marginLeft = `${-size / 2}px`;
        el.style.marginTop = `${-size / 2}px`;
      });
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);
    document.body.style.cursor = "none";

    if (!document.getElementById("osu-ripple-style")) {
      const s = document.createElement("style");
      s.id = "osu-ripple-style";
      s.textContent = `
        @keyframes rippleOut {
          from { transform: scale(1); opacity: 1; }
          to   { transform: scale(6); opacity: 0; }
        }
      `;
      document.head.appendChild(s);
    }

    function spawnRipple(x: number, y: number) {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:8px; height:8px;
        margin-left:-4px; margin-top:-4px;
        border-radius:50%;
        border:1.5px solid rgba(180,190,255,0.7);
        pointer-events:none; z-index:9998;
        animation: rippleOut 0.5s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 500);
    }

    function createProgressRing() {
      const size = 44;
      const r = 18;
      const circ = 2 * Math.PI * r;

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed; inset:0;
        pointer-events:none; z-index:9997;
      `;
      document.body.appendChild(overlay);

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      svg.style.cssText = `
        position:fixed;
        left:${pos.current.x - size / 2}px;
        top:${pos.current.y - size / 2}px;
        pointer-events:none; z-index:9999;
      `;

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(size / 2));
      circle.setAttribute("cy", String(size / 2));
      circle.setAttribute("r", String(r));
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "rgba(180,190,255,0.9)");
      circle.setAttribute("stroke-width", "1.5");
      circle.setAttribute("stroke-dasharray", String(circ));
      circle.setAttribute("stroke-dashoffset", String(circ));
      circle.setAttribute("stroke-linecap", "round");
      circle.style.transformOrigin = "center";
      circle.style.transform = "rotate(-90deg)";
      circle.style.transition = `stroke-dashoffset ${HOLD_MS}ms linear`;
      svg.appendChild(circle);
      document.body.appendChild(svg);

      const moveSvg = () => {
        svg.style.left = `${pos.current.x - size / 2}px`;
        svg.style.top = `${pos.current.y - size / 2}px`;
      };
      window.addEventListener("mousemove", moveSvg);

      requestAnimationFrame(() => {
        circle.style.strokeDashoffset = "0";
      });

      return { overlay, progress: svg as unknown as HTMLElement, moveSvg };
    }

    function isInstant(target: HTMLElement) {
      // Skip hold for theme toggle and any data-instant elements
      return target.title === "Toggle theme" || target.hasAttribute("data-instant");
    }

    function onMouseDown(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a, button, [role=button]") as HTMLElement | null;
      if (!target) return;
      if (isInstant(target)) return;
      if (holdTimers.current.has(target)) return;

      const { overlay, progress, moveSvg } = createProgressRing();

      const timer = setTimeout(() => {
        spawnRipple(pos.current.x, pos.current.y);
        overlay.remove();
        progress.remove();
        window.removeEventListener("mousemove", moveSvg);
        holdTimers.current.delete(target);
        target.click();
      }, HOLD_MS);

      holdTimers.current.set(target, { timer, progress, overlay, moveSvg });
    }

    function onMouseUp(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a, button, [role=button]") as HTMLElement | null;
      if (!target) return;
      const entry = holdTimers.current.get(target);
      if (!entry) return;
      clearTimeout(entry.timer);
      entry.overlay.remove();
      entry.progress.remove();
      window.removeEventListener("mousemove", entry.moveSvg);
      holdTimers.current.delete(target);
    }

    function onClickCapture(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a, button, [role=button]") as HTMLElement | null;
      if (!target) return;
      if (isInstant(target)) return;
      e.stopPropagation();
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      document.body.style.cursor = "";
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      <div
        ref={bgGlowRef}
        style={{
          position: "absolute", top: 0, left: 0,
          width: 700, height: 700,
          marginLeft: -350, marginTop: -350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(140,120,255,0.055) 0%, rgba(100,140,255,0.03) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el; }}
          style={{
            position: "absolute", top: 0, left: 0,
            width: 3.5, height: 3.5,
            marginLeft: -1.75, marginTop: -1.75,
            borderRadius: "50%",
            background: "rgba(200, 210, 255, 0.9)",
            willChange: "transform",
          }}
        />
      ))}
      <div
        ref={ringRef}
        style={{
          position: "absolute", top: 0, left: 0,
          width: 32, height: 32,
          marginLeft: -16, marginTop: -16,
          borderRadius: "50%",
          border: "1px solid rgba(180, 190, 255, 0.5)",
          boxShadow: "0 0 8px rgba(140, 120, 255, 0.25), inset 0 0 8px rgba(140,120,255,0.08)",
          willChange: "transform",
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: "absolute", top: 0, left: 0,
          width: 5, height: 5,
          marginLeft: -2.5, marginTop: -2.5,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 6px rgba(200,210,255,0.8)",
          willChange: "transform",
        }}
      />
    </div>
  );
}