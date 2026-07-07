"use client";

import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
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
  getCameraOrbit?: () => { theta: number; phi: number; radius: number };
  setAttribute: (name: string, value: string) => void;
}

export default function TShirtScene({ mouse }: { mouse?: { x: number; y: number } }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const mvRef     = useRef<MvElement | null>(null);
  const rafRef    = useRef<number>(0);
  const thetaRef  = useRef(0);           // current angle in degrees
  const dirRef    = useRef(1);           // +1 = forward, -1 = backward
  const dragging  = useRef(false);

  /* ── Mouse parallax tilt ─────────────────────────────────── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !mouse) return;
    if (dragging.current) return;
    const rx = mouse.y * 4;
    const ry = mouse.x * -4;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${mouse.x * 5}px, ${mouse.y * 3}px)`;
  }, [mouse]);

  /* ── 180° horizontal oscillation via rAF ────────────────── */
  useEffect(() => {
    let mv: MvElement | null = null;

    const animate = () => {
      if (mv && !dragging.current) {
        // Advance at ~4 deg/s (at 60fps = 0.067°/frame)
        thetaRef.current += dirRef.current * 0.07;

        // Bounce at 0° and 180°
        if (thetaRef.current >= 180) { thetaRef.current = 180; dirRef.current = -1; }
        if (thetaRef.current <= 0)   { thetaRef.current = 0;   dirRef.current =  1; }

        mv.setAttribute(
          "camera-orbit",
          `${thetaRef.current}deg 75deg auto`
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Wait for model-viewer to register as a custom element
    const timer = setTimeout(() => {
      mv = mvRef.current;
      if (mv) rafRef.current = requestAnimationFrame(animate);
    }, 800);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%", height: "100%",
        transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        animation: "modelFloat 5s ease-in-out infinite",
        willChange: "transform",
        filter: "sepia(0.04) brightness(1.04) contrast(0.96)",
        position: "relative",
      }}>
        {/* @ts-ignore */}
        <model-viewer
          ref={(el: MvElement | null) => { mvRef.current = el; }}
          src="/oversized_t-shirt-printed.glb"
          alt="Pacific Dust oversized cream t-shirt"
          camera-controls
          disable-zoom
          disable-pan
          shadow-intensity="1.4"
          shadow-softness="1"
          exposure="1.3"
          tone-mapping="commerce"
          environment-image="legacy"
          camera-orbit="0deg 75deg auto"
          field-of-view="26deg"
          /* No hard limits on azimuth — rAF controls the range */
          min-camera-orbit="auto 65deg auto"
          max-camera-orbit="auto 88deg auto"
          interpolation-decay="200"
          loading="eager"
          reveal="auto"
          style={{
            width: "100%", height: "100%",
            display: "block",
            backgroundColor: "transparent",
            "--poster-color":       "transparent",
            "--progress-bar-color": "transparent",
            "--progress-mask":      "transparent",
          } as React.CSSProperties}
          onMouseDown={() => { dragging.current = true;  }}
          onMouseUp={()   => { dragging.current = false; }}
          onTouchStart={() => { dragging.current = true;  }}
          onTouchEnd={()   => { dragging.current = false; }}
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
