"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

// Error boundary so a broken model-viewer never whites out the page
class Boundary extends Component<{ children: ReactNode }, { err: string | null }> {
  state = { err: null };
  static getDerivedStateFromError(e: Error) { return { err: e.message }; }
  render() {
    if (this.state.err) return null; // silent fail — hero still visible
    return this.props.children;
  }
}

/*
  ssr: false ensures <model-viewer> only mounts on the client, AFTER the
  model-viewer script tag has run and registered the custom element.
  If we SSR the element it renders as an unknown tag and never upgrades.
*/
const TShirtScene = dynamic(() => import("@/components/ui/TShirtScene"), {
  ssr: false,
  loading: () => null,
});

export default function TShirtSceneLoader({
  mouse,
}: {
  mouse?: { x: number; y: number };
}) {
  return (
    <Boundary>
      <div style={{ width: "100%", height: "100%" }}>
        <TShirtScene mouse={mouse} />
      </div>
    </Boundary>
  );
}
