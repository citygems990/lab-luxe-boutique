import type { Cut } from "@/data/products";

type Props = { cut: Cut; className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.8,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

export function CutIcon({ cut, className }: Props) {
  const props = { viewBox: "0 0 64 64", className, ...common };
  switch (cut) {
    // Круг — round brilliant top view
    case "Round":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="26" />
          {/* outer octagonal girdle */}
          <polygon points="32,6 50.4,13.6 58,32 50.4,50.4 32,58 13.6,50.4 6,32 13.6,13.6" />
          {/* inner table (octagon) */}
          <polygon points="32,18 41.9,22.1 46,32 41.9,41.9 32,46 22.1,41.9 18,32 22.1,22.1" />
          {/* star facets from table vertices to outer octagon vertices */}
          <line x1="32" y1="18" x2="32" y2="6" />
          <line x1="41.9" y1="22.1" x2="50.4" y2="13.6" />
          <line x1="46" y1="32" x2="58" y2="32" />
          <line x1="41.9" y1="41.9" x2="50.4" y2="50.4" />
          <line x1="32" y1="46" x2="32" y2="58" />
          <line x1="22.1" y1="41.9" x2="13.6" y2="50.4" />
          <line x1="18" y1="32" x2="6" y2="32" />
          <line x1="22.1" y1="22.1" x2="13.6" y2="13.6" />
          {/* upper girdle facets */}
          <line x1="32" y1="18" x2="22.1" y2="22.1" />
          <line x1="32" y1="18" x2="41.9" y2="22.1" />
          <line x1="46" y1="32" x2="41.9" y2="22.1" />
          <line x1="46" y1="32" x2="41.9" y2="41.9" />
          <line x1="32" y1="46" x2="41.9" y2="41.9" />
          <line x1="32" y1="46" x2="22.1" y2="41.9" />
          <line x1="18" y1="32" x2="22.1" y2="41.9" />
          <line x1="18" y1="32" x2="22.1" y2="22.1" />
        </svg>
      );

    // Овал
    case "Oval":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="32" rx="17" ry="26" />
          {/* inner outline */}
          <path d="M32 10 C42 14 47 22 47 32 C47 42 42 50 32 54 C22 50 17 42 17 32 C17 22 22 14 32 10 Z" />
          {/* table */}
          <polygon points="32,20 40,26 40,38 32,44 24,38 24,26" />
          {/* spokes to tips & sides */}
          <line x1="32" y1="20" x2="32" y2="10" />
          <line x1="32" y1="44" x2="32" y2="54" />
          <line x1="40" y1="26" x2="47" y2="22" />
          <line x1="40" y1="38" x2="47" y2="42" />
          <line x1="24" y1="26" x2="17" y2="22" />
          <line x1="24" y1="38" x2="17" y2="42" />
          <line x1="40" y1="32" x2="47" y2="32" />
          <line x1="24" y1="32" x2="17" y2="32" />
          {/* girdle splits */}
          <line x1="32" y1="6" x2="32" y2="10" />
          <line x1="32" y1="54" x2="32" y2="58" />
        </svg>
      );

    // Маркиз
    case "Marquise":
      return (
        <svg {...props}>
          <path d="M32 6 C40 22 46 28 46 32 C46 36 40 42 32 58 C24 42 18 36 18 32 C18 28 24 22 32 6 Z" />
          {/* central spine */}
          <line x1="32" y1="6" x2="32" y2="58" />
          {/* girdle line */}
          <line x1="18" y1="32" x2="46" y2="32" />
          {/* table diamond */}
          <polygon points="32,16 40,32 32,48 24,32" />
          {/* facets */}
          <line x1="32" y1="16" x2="22" y2="22" />
          <line x1="32" y1="16" x2="42" y2="22" />
          <line x1="32" y1="48" x2="22" y2="42" />
          <line x1="32" y1="48" x2="42" y2="42" />
          <line x1="22" y1="22" x2="18" y2="32" />
          <line x1="42" y1="22" x2="46" y2="32" />
          <line x1="22" y1="42" x2="18" y2="32" />
          <line x1="42" y1="42" x2="46" y2="32" />
        </svg>
      );

    // Сердце
    case "Heart":
      return (
        <svg {...props}>
          <path d="M32 56 C12 42 7 30 11 21 C15 13 25 13 32 22 C39 13 49 13 53 21 C57 30 52 42 32 56 Z" />
          {/* cleft & central spine */}
          <line x1="32" y1="22" x2="32" y2="56" />
          {/* lobes */}
          <path d="M32 22 C26 16 18 18 16 26" />
          <path d="M32 22 C38 16 46 18 48 26" />
          {/* facets fanning down */}
          <line x1="32" y1="22" x2="16" y2="26" />
          <line x1="32" y1="22" x2="48" y2="26" />
          <line x1="16" y1="26" x2="22" y2="40" />
          <line x1="48" y1="26" x2="42" y2="40" />
          <line x1="22" y1="40" x2="32" y2="56" />
          <line x1="42" y1="40" x2="32" y2="56" />
          <line x1="22" y1="40" x2="42" y2="40" />
          <line x1="32" y1="34" x2="22" y2="40" />
          <line x1="32" y1="34" x2="42" y2="40" />
          <line x1="32" y1="34" x2="16" y2="26" />
          <line x1="32" y1="34" x2="48" y2="26" />
        </svg>
      );

    // Груша
    case "Pear":
      return (
        <svg {...props}>
          <path d="M32 6 C22 22 15 33 15 43 C15 52 22 58 32 58 C42 58 49 52 49 43 C49 33 42 22 32 6 Z" />
          {/* spine & girdle */}
          <line x1="32" y1="6" x2="32" y2="58" />
          <line x1="15" y1="43" x2="49" y2="43" />
          {/* table */}
          <polygon points="32,16 40,30 40,42 32,50 24,42 24,30" />
          {/* facets */}
          <line x1="32" y1="16" x2="24" y2="30" />
          <line x1="32" y1="16" x2="40" y2="30" />
          <line x1="24" y1="30" x2="15" y2="43" />
          <line x1="40" y1="30" x2="49" y2="43" />
          <line x1="24" y1="42" x2="32" y2="58" />
          <line x1="40" y1="42" x2="32" y2="58" />
        </svg>
      );

    // Изумруд — step cut
    case "Emerald":
      return (
        <svg {...props}>
          <path d="M22 6 H42 L56 20 V44 L42 58 H22 L8 44 V20 Z" />
          <path d="M24 12 H40 L50 22 V42 L40 52 H24 L14 42 V22 Z" />
          <path d="M26 18 H38 L44 24 V40 L38 46 H26 L20 40 V24 Z" />
          <path d="M28 24 H36 L38 26 V38 L36 40 H28 L26 38 V26 Z" />
          {/* corner facets to outer */}
          <line x1="22" y1="6" x2="24" y2="12" />
          <line x1="42" y1="6" x2="40" y2="12" />
          <line x1="56" y1="20" x2="50" y2="22" />
          <line x1="56" y1="44" x2="50" y2="42" />
          <line x1="42" y1="58" x2="40" y2="52" />
          <line x1="22" y1="58" x2="24" y2="52" />
          <line x1="8" y1="44" x2="14" y2="42" />
          <line x1="8" y1="20" x2="14" y2="22" />
        </svg>
      );

    // Радиант
    case "Radiant":
      return (
        <svg {...props}>
          <path d="M20 6 H44 L58 20 V44 L44 58 H20 L6 44 V20 Z" />
          {/* inner cushion-like */}
          <path d="M22 12 L32 14 L42 12 L52 22 L50 32 L52 42 L42 52 L32 50 L22 52 L12 42 L14 32 L12 22 Z" />
          {/* central table diamond */}
          <polygon points="32,20 44,32 32,44 20,32" />
          {/* star spokes */}
          <line x1="32" y1="20" x2="32" y2="14" />
          <line x1="44" y1="32" x2="50" y2="32" />
          <line x1="32" y1="44" x2="32" y2="50" />
          <line x1="20" y1="32" x2="14" y2="32" />
          {/* diagonal facets */}
          <line x1="32" y1="20" x2="22" y2="12" />
          <line x1="32" y1="20" x2="42" y2="12" />
          <line x1="44" y1="32" x2="52" y2="22" />
          <line x1="44" y1="32" x2="52" y2="42" />
          <line x1="32" y1="44" x2="42" y2="52" />
          <line x1="32" y1="44" x2="22" y2="52" />
          <line x1="20" y1="32" x2="12" y2="22" />
          <line x1="20" y1="32" x2="12" y2="42" />
          {/* outer corner cuts */}
          <line x1="20" y1="6" x2="22" y2="12" />
          <line x1="44" y1="6" x2="42" y2="12" />
          <line x1="58" y1="20" x2="52" y2="22" />
          <line x1="58" y1="44" x2="52" y2="42" />
          <line x1="44" y1="58" x2="42" y2="52" />
          <line x1="20" y1="58" x2="22" y2="52" />
          <line x1="6" y1="44" x2="12" y2="42" />
          <line x1="6" y1="20" x2="12" y2="22" />
        </svg>
      );

    // Кушон
    case "Cushion":
      return (
        <svg {...props}>
          <path d="M20 6 H44 Q58 6 58 20 V44 Q58 58 44 58 H20 Q6 58 6 44 V20 Q6 6 20 6 Z" />
          <path d="M22 12 H42 Q52 12 52 22 V42 Q52 52 42 52 H22 Q12 52 12 42 V22 Q12 12 22 12 Z" />
          {/* table diamond */}
          <polygon points="32,18 46,32 32,46 18,32" />
          {/* spokes from table to corners/midpoints */}
          <line x1="32" y1="18" x2="22" y2="12" />
          <line x1="32" y1="18" x2="42" y2="12" />
          <line x1="46" y1="32" x2="52" y2="22" />
          <line x1="46" y1="32" x2="52" y2="42" />
          <line x1="32" y1="46" x2="22" y2="52" />
          <line x1="32" y1="46" x2="42" y2="52" />
          <line x1="18" y1="32" x2="12" y2="22" />
          <line x1="18" y1="32" x2="12" y2="42" />
          {/* mid spokes */}
          <line x1="32" y1="18" x2="32" y2="12" />
          <line x1="46" y1="32" x2="52" y2="32" />
          <line x1="32" y1="46" x2="32" y2="52" />
          <line x1="18" y1="32" x2="12" y2="32" />
        </svg>
      );

    // Принцесса
    case "Princess":
      return (
        <svg {...props}>
          <rect x="6" y="6" width="52" height="52" />
          <rect x="12" y="12" width="40" height="40" />
          {/* X to corners */}
          <line x1="6" y1="6" x2="58" y2="58" />
          <line x1="58" y1="6" x2="6" y2="58" />
          {/* inner table square (smaller) */}
          <rect x="22" y="22" width="20" height="20" />
          {/* chevrons from inner square to outer rect midpoints */}
          <line x1="22" y1="22" x2="12" y2="22" />
          <line x1="42" y1="22" x2="52" y2="22" />
          <line x1="22" y1="42" x2="12" y2="42" />
          <line x1="42" y1="42" x2="52" y2="42" />
          <line x1="22" y1="22" x2="22" y2="12" />
          <line x1="42" y1="22" x2="42" y2="12" />
          <line x1="22" y1="42" x2="22" y2="52" />
          <line x1="42" y1="42" x2="42" y2="52" />
        </svg>
      );
  }
}
