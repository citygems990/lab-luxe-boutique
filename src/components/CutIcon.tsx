import type { Cut } from "@/data/products";

type Shape = {
  outer: string;
  inner: string;
  facets: string[];
};

const SHAPES: Record<Cut, Shape> = {
  Round: {
    outer: "M50 7 A43 43 0 1 1 49.99 7",
    inner: "M50 20 L71 28 L80 50 L71 72 L50 80 L29 72 L20 50 L29 28 Z",
    facets: ["M50 7V20 M80 13L71 28 M93 50H80 M80 87L71 72 M50 93V80 M20 87L29 72 M7 50H20 M20 13L29 28", "M20 50L50 20L80 50L50 80Z"],
  },
  Oval: {
    outer: "M50 5 C73 5 87 24 87 50 C87 76 73 95 50 95 C27 95 13 76 13 50 C13 24 27 5 50 5 Z",
    inner: "M50 17 L68 26 L76 50 L68 74 L50 83 L32 74 L24 50 L32 26 Z",
    facets: ["M50 5V17 M73 12L68 26 M87 35L76 50 M87 65L68 74 M73 88L50 83 M27 88L32 74 M13 65L24 50 M13 35L32 26 M27 12L50 17", "M24 50L50 17L76 50L50 83Z"],
  },
  Emerald: {
    outer: "M24 7 H76 L93 24 V76 L76 93 H24 L7 76 V24 Z",
    inner: "M31 22 H69 L78 31 V69 L69 78 H31 L22 69 V31 Z",
    facets: ["M24 7L31 22 M76 7L69 22 M93 24L78 31 M93 76L78 69 M76 93L69 78 M24 93L31 78 M7 76L22 69 M7 24L22 31", "M31 22L69 78 M69 22L31 78"],
  },
  Princess: {
    outer: "M8 8 H92 V92 H8 Z",
    inner: "M24 24 H76 V76 H24 Z",
    facets: ["M8 8L24 24 M92 8L76 24 M92 92L76 76 M8 92L24 76", "M50 8L76 24L92 50L76 76L50 92L24 76L8 50L24 24Z", "M24 24L76 76 M76 24L24 76"],
  },
  Pear: {
    outer: "M50 5 C58 22 83 34 84 59 C85 81 70 95 50 95 C30 95 15 81 16 59 C17 34 42 22 50 5 Z",
    inner: "M50 20 L68 43 L72 66 L61 81 L50 86 L39 81 L28 66 L32 43 Z",
    facets: ["M50 5V20 M69 30L68 43 M84 59L72 66 M76 84L61 81 M50 95V86 M24 84L39 81 M16 59L28 66 M31 30L32 43", "M32 43L50 20L68 43L50 86L28 66Z M72 66L50 86"],
  },
  Cushion: {
    outer: "M24 8 C13 8 8 14 8 25 V75 C8 86 14 92 25 92 H75 C86 92 92 86 92 75 V25 C92 14 86 8 75 8 Z",
    inner: "M31 22 H69 L78 31 V69 L69 78 H31 L22 69 V31 Z",
    facets: ["M24 8L31 22 M76 8L69 22 M92 24L78 31 M92 76L78 69 M76 92L69 78 M24 92L31 78 M8 76L22 69 M8 24L22 31", "M31 22L69 78 M69 22L31 78"],
  },
  Radiant: {
    outer: "M20 7 H80 L93 20 V80 L80 93 H20 L7 80 V20 Z",
    inner: "M29 22 H71 L78 29 V71 L71 78 H29 L22 71 V29 Z",
    facets: ["M20 7L29 22 M80 7L71 22 M93 20L78 29 M93 80L78 71 M80 93L71 78 M20 93L29 78 M7 80L22 71 M7 20L22 29", "M29 22L71 78 M71 22L29 78 M50 7V22 M93 50H78 M50 93V78 M7 50H22"],
  },
  Heart: {
    outer: "M50 92 C42 83 12 65 10 37 C8 18 20 8 35 8 C43 8 48 12 50 19 C52 12 57 8 65 8 C80 8 92 18 90 37 C88 65 58 83 50 92 Z",
    inner: "M50 76 C42 67 26 56 24 38 C23 27 31 22 39 24 L50 38 L61 24 C69 22 77 27 76 38 C74 56 58 67 50 76 Z",
    facets: ["M35 8L39 24 M10 37L24 38 M20 63L36 60 M50 92V76 M80 63L64 60 M90 37L76 38 M65 8L61 24", "M50 19V38 M24 38L50 76L76 38 M36 60L50 38L64 60"],
  },
  Marquise: {
    outer: "M50 4 C67 20 82 36 82 50 C82 64 67 80 50 96 C33 80 18 64 18 50 C18 36 33 20 50 4 Z",
    inner: "M50 18 L67 38 L71 50 L67 62 L50 82 L33 62 L29 50 L33 38 Z",
    facets: ["M50 4V18 M67 20V38 M82 50H71 M67 80V62 M50 96V82 M33 80V62 M18 50H29 M33 20V38", "M29 50L50 18L71 50L50 82Z"],
  },
};

export function CutIcon({ cut, className = "" }: { cut: Cut; className?: string }) {
  const shape = SHAPES[cut];
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={shape.outer} />
      <path d={shape.inner} />
      {shape.facets.map((facet) => <path key={facet} d={facet} />)}
    </svg>
  );
}