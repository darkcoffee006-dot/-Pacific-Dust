/**
 * Suppress known deprecation warnings emitted by @react-three/fiber v9
 * against three.js 0.185.
 *
 * - THREE.Clock       → deprecated in favour of THREE.Timer
 * - PCFSoftShadowMap  → deprecated in favour of PCFShadowMap
 *
 * Both are hardcoded inside r3f's own bundle and cannot be fixed without
 * patching node_modules. We intercept them here before they reach the
 * browser console. All other warnings pass through unchanged.
 *
 * Import this file once at the top of the component that mounts the Canvas.
 * It is intentionally side-effect-only and tree-shaken in production
 * if the import is removed.
 */

const SUPPRESSED = [
  "THREE.Clock",
  "PCFSoftShadowMap has been deprecated",
  "This module has been deprecated",
];

if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === "string" ? args[0] : "";
    if (SUPPRESSED.some((s) => first.includes(s))) return;
    _warn(...args);
  };
}
