export type LookbookShot = {
  src: string;
  alt: string;
  aspect: string;
  caption: string;
  products: string[];
};

export type LookbookChapter = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote?: string;
  shots: LookbookShot[];
};

/** Multi-person & collection editorial shots only — solo product shots live in product folders. */
export const lookbookHero: LookbookShot = {
  src: "/images/pacific/DSCN5501.JPG.jpg.jpeg",
  alt: "Four models wearing City of Angels, Dreams, Gradient Soul, and Unbothered tees",
  aspect: "aspect-[4/5]",
  caption: "Drop 01 — Full Collection",
  products: ["city-of-angels-tee", "dreams-tee", "gradient-soul-tee", "unbothered-tee"],
};

export const lookbookChapters: LookbookChapter[] = [
  {
    id: "collection",
    number: "00",
    title: "The Collection",
    subtitle: "Four tees. One drop.",
    quote: "Every silhouette engineered to fall away from the body — worn together, styled apart.",
    shots: [
      {
        src: "/images/pacific/DSCN5687.JPG.jpg.jpeg",
        alt: "Three models in black Unbothered and white Gradient Soul tees",
        aspect: "aspect-[16/10]",
        caption: "Look 01 — Studio Session",
        products: ["unbothered-tee", "gradient-soul-tee"],
      },
      {
        src: "/images/pacific/DSCN5684.JPG.jpg.jpeg",
        alt: "Two models reading — black Unbothered and white Gradient Soul",
        aspect: "aspect-[4/3]",
        caption: "Look 02 — Quiet Hours",
        products: ["unbothered-tee", "gradient-soul-tee"],
      },
    ],
  },
  {
    id: "black-city",
    number: "I",
    title: "City of Angels",
    subtitle: "Chapter — Black",
    quote: "Vintage athletic jerseys, reimagined through a contemporary streetwear lens.",
    shots: [
      {
        src: "/images/pacific/black/DSCN5642.JPG.jpg.jpeg",
        alt: "Male and female models in City of Angels tee — front and back",
        aspect: "aspect-[16/10]",
        caption: "Look 03 — Front & Back",
        products: ["city-of-angels-tee"],
      },
      {
        src: "/images/pacific/black/DSCN5671.JPG.jpg.jpeg",
        alt: "Two male models — City of Angels and collection styling",
        aspect: "aspect-[4/3]",
        caption: "Look 04 — Jersey Lines",
        products: ["city-of-angels-tee"],
      },
    ],
  },
  {
    id: "black-unbothered",
    number: "II",
    title: "Unbothered",
    subtitle: "Chapter — Black",
    quote: "Quiet confidence. Actions louder than opinions.",
    shots: [
      {
        src: "/images/pacific/black/DSCN5705.JPG.jpg.jpeg",
        alt: "Male and female models in Unbothered tee",
        aspect: "aspect-[3/4]",
        caption: "Look 05 — Unbothered",
        products: ["unbothered-tee"],
      },
      {
        src: "/images/pacific/black/DSCN5715.JPG.jpg.jpeg",
        alt: "Couple in Unbothered tees — studio portrait",
        aspect: "aspect-[4/5]",
        caption: "Look 06 — Studio Portrait",
        products: ["unbothered-tee"],
      },
      {
        src: "/images/pacific/black/DSCN5714.JPG.jpg.jpeg",
        alt: "Male and female models seated in Unbothered tees",
        aspect: "aspect-[16/9]",
        caption: "Look 07 — Still Life",
        products: ["unbothered-tee"],
      },
      {
        src: "/images/pacific/black/DSCN5722.JPG.jpg.jpeg",
        alt: "Unbothered tee front and back on two models",
        aspect: "aspect-[4/3]",
        caption: "Look 08 — North Bound",
        products: ["unbothered-tee"],
      },
    ],
  },
  {
    id: "white",
    number: "III",
    title: "Dreams & Gradient Soul",
    subtitle: "Chapter — White",
    quote: "Desert tones. Higher hopes. Celestial back art. Light holds, light lets go.",
    shots: [
      {
        src: "/images/pacific/white/DSCN5779.JPG.jpg.jpeg",
        alt: "Three models in white Dreams and Gradient Soul tees",
        aspect: "aspect-[16/10]",
        caption: "Look 09 — White Chapter",
        products: ["dreams-tee", "gradient-soul-tee"],
      },
      {
        src: "/images/pacific/white/DSCN5762.JPG.jpg.jpeg",
        alt: "Two models in white Gradient Soul and Pacific tees",
        aspect: "aspect-[16/9]",
        caption: "Look 10 — Pacific Dust",
        products: ["gradient-soul-tee"],
      },
      {
        src: "/images/pacific/white/DSCN5785.JPG.jpg.jpeg",
        alt: "Dreams tee front and back on two models",
        aspect: "aspect-[3/4]",
        caption: "Look 11 — Dreams",
        products: ["dreams-tee"],
      },
      {
        src: "/images/pacific/white/DSCN5784.JPG.jpg.jpeg",
        alt: "Male and female models in Dreams tee",
        aspect: "aspect-[4/3]",
        caption: "Look 12 — ESTD 2025",
        products: ["dreams-tee"],
      },
    ],
  },
];

export const allLookbookShots: LookbookShot[] = [
  lookbookHero,
  ...lookbookChapters.flatMap((c) => c.shots),
];
