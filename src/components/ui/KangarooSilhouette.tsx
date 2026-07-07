interface Props {
  className?: string;
  opacity?: number;
  width?: number | string;
  height?: number | string;
}

export default function KangarooSilhouette({
  className = "",
  opacity = 0.55,
  width = "100%",
  height = "100%",
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/kangaro-removebg-preview.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width,
        height,
        opacity,
        display: "block",
        objectFit: "contain",
        objectPosition: "center bottom",
        // No mix-blend-mode needed — background already removed
      }}
    />
  );
}
