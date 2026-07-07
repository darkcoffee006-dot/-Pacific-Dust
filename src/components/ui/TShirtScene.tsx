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

/* ── Types for model-viewer's material API ──────────────────── */
interface MvPbr {
  setBaseColorFactor: (c: [number, number, number, number]) => void;
  setRoughnessFactor: (v: number) => void;
  setMetallicFactor:  (v: number) => void;
}

interface MvMaterial {
  name: string;
  pbrMetallicRoughness: MvPbr;
}

interface MvElement extends HTMLElement {
  model?: { materials?: MvMaterial[] };
}

/* ── Component ──────────────────────────────────────────────── */
export default function TShirtScene({
  mouse,
}: {
  mouse?: { x: number; y: number };
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !mouse) return;
    const rx = mouse.y *  6;
    const ry = mouse.x * -6;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${mouse.x * 6}px, ${mouse.y * 4}px)`;
  }, [mouse]);

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
          min-camera-orbit="-30deg 65deg auto"
          max-camera-orbit="30deg 88deg auto"
          interpolation-decay="120"
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
