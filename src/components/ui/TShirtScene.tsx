"use client";

import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean | "";
          "auto-rotate-delay"?: string | number;
          "rotation-per-second"?: string;
          "camera-controls"?: boolean | "";
          "disable-zoom"?: boolean | "";
          "disable-pan"?: boolean | "";
          "shadow-intensity"?: string;
          "shadow-softness"?: string;
          exposure?: string;
          "environment-image"?: string;
          "tone-mapping"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "interpolation-decay"?: string;
          loading?: string;
          reveal?: string;
          style?: React.CSSProperties;
          onLoad?: (e: Event) => void;
        },
        HTMLElement
      >;
    }
  }
}

interface MvPbr {
  setBaseColorFactor: (c: [number, number, number, number]) => void;
  setRoughnessFactor: (v: number) => void;
  setMetallicFactor:  (v: number) => void;
}
interface MvMaterial { name: string; pbrMetallicRoughness: MvPbr; }
interface MvElement extends HTMLElement {
  model?: { materials?: MvMaterial[] };
  setAttribute: (name: string, value: string) => void;
  resetTurntableRotation: (deg?: number) => void;
}

export default function TShirtScene({ mouse }: { mouse?: { x: number; y: number } }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const mvRef    = useRef<MvElement | null>(null);
  const rafRef   = useRef<number>(0);
  const angleRef = useRef(180);  // current azimuth deg (starts at front)
  const dirRef   = useRef(1);    // +1 forward, -1 backward
  const userRef  = useRef(false);// true while user is dragging

  /* ── Mouse parallax — only tilts the wrapper div, not the 3D camera ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !mouse || userRef.current) return;
    const rx = mouse.y * 3;    // subtle X tilt
    const ry = mouse.x * -3;   // subtle Y tilt
    el.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${mouse.x * 4}px, ${mouse.y * 3}px)`;
  }, [mouse]);

  /* ── 180° horizontal oscillation ────────────────────────────────────
     We drive camera-orbit theta (azimuth) via rAF.
     phi is LOCKED at 90deg = perfectly horizontal camera (eye-level).
     This means rotation is purely left-right, never up/down.
     Speed: ~3 deg/frame at 60fps = ~3 seconds for half-turn.
  ─────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    let mv: MvElement | null = null;

    const tick = () => {
      if (mv && !userRef.current) {
        angleRef.current += dirRef.current * 0.5;   // 0.5°/frame ≈ 6s half-turn

        if (angleRef.current >= 270) {
          angleRef.current = 270;
          dirRef.current = -1;
        }
        if (angleRef.current <= 90) {
          angleRef.current = 90;
          dirRef.current = 1;
        }

        /*
          phi = 90deg  → camera sits exactly at the equator (horizontal, eye-level)
          This is the key fix — previously 75deg was tilting the view from above,
          making it look like a "vertical" rotation.
        */
        mv.setAttribute("camera-orbit", `${angleRef.current}deg 90deg auto`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    /* Wait for model-viewer custom element to upgrade */
    const timer = setTimeout(() => {
      mv = mvRef.current;
      if (mv) {
        /* Sync min/max so user drag is also horizontal-only */
        mv.setAttribute("min-camera-orbit", "auto 85deg auto");
        mv.setAttribute("max-camera-orbit", "auto 95deg auto");
        mv.setAttribute("camera-orbit", "180deg 90deg auto");
        rafRef.current = requestAnimationFrame(tick);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: "100%",
        transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {/* Float wrapper */}
      <div
        style={{
          width: "100%",
          height: "100%",
          animation: "modelFloat 5s ease-in-out infinite",
          willChange: "transform",
          filter: "sepia(0.04) brightness(1.04) contrast(0.96)",
          position: "relative",
        }}
      >
        {/* @ts-ignore */}
        <model-viewer
          ref={(el: MvElement | null) => { mvRef.current = el; }}
          src="/oversized_t-shirt-printed-test-front.glb"
          alt="Pacific Dust oversized cream t-shirt"
          camera-controls
          disable-zoom
          disable-pan
          shadow-intensity="1.4"
          shadow-softness="1"
          exposure="1.3"
          tone-mapping="commerce"
          environment-image="legacy"
          /* Start front-facing, eye-level (phi=90deg) */
          camera-orbit="180deg 90deg auto"
          field-of-view="26deg"
          /* Vertical locked at 85–95deg — prevents tilting up/down */
          min-camera-orbit="auto 85deg auto"
          max-camera-orbit="auto 95deg auto"
          /* Low decay = immediate camera response (no smoothing fighting rAF) */
          interpolation-decay="500"
          loading="eager"
          reveal="auto"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            backgroundColor: "transparent",
            "--poster-color":       "transparent",
            "--progress-bar-color": "transparent",
            "--progress-mask":      "transparent",
          } as React.CSSProperties}
          /* Pause auto-rotation while user drags */
          onMouseDown={() => { userRef.current = true;  }}
          onMouseUp={()   => { userRef.current = false; }}
          onTouchStart={() => { userRef.current = true;  }}
          onTouchEnd={()   => { userRef.current = false; }}
          onLoad={(e: Event) => {
            const mv = e.target as MvElement;
            mv?.model?.materials?.forEach((mat) => {
              const pbr = mat.pbrMetallicRoughness;
              pbr.setRoughnessFactor(0.85);
              pbr.setMetallicFactor(0.0);
            });
          }}
        />
      </div>
    </div>
  );
}
