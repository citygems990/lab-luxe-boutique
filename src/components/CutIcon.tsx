import type { Cut } from "@/data/products";

type Props = { cut: Cut; className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.9,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

export function CutIcon({ cut, className }: Props) {
  const props = { viewBox: "0 0 64 64", className, ...common };
  switch (cut) {
    // Круг — бриллиантовая огранка сверху: круг, вписанный 8-угольник, "звезда"
    case "Round":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="24" />
          {/* outer octagon */}
          <polygon points="32,8 49,15 56,32 49,49 32,56 15,49 8,32 15,15" />
          {/* inner table (square rotated 45) */}
          <polygon points="32,18 46,32 32,46 18,32" />
          {/* star facets connecting table corners to octagon vertices */}
          <path d="M32,18 L32,8 M46,32 L56,32 M32,46 L32,56 M18,32 L8,32" />
          <path d="M32,18 L49,15 M32,18 L15,15 M46,32 L49,49 M46,32 L49,15 M32,46 L49,49 M32,46 L15,49 M18,32 L15,49 M18,32 L15,15" />
        </svg>
      );

    // Овал
    case "Oval":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="32" rx="16" ry="24" />
          <polygon points="32,10 44,20 46,32 44,44 32,54 20,44 18,32 20,20" />
          <polygon points="32,18 42,32 32,46 22,32" />
          <path d="M32,18 L32,10 M42,32 L46,32 M32,46 L32,54 M22,32 L18,32" />
          <path d="M32,18 L44,20 M32,18 L20,20 M42,32 L44,44 M42,32 L44,20 M32,46 L44,44 M32,46 L20,44 M22,32 L20,44 M22,32 L20,20" />
        </svg>
      );

    // Маркиз
    case "Marquise":
      return (
        <svg {...props}>
          <path d="M32 8 C40 22 44 28 44 32 C44 36 40 42 32 56 C24 42 20 36 20 32 C20 28 24 22 32 8 Z" />
          <path d="M32 14 L40 28 L40 36 L32 50 L24 36 L24 28 Z" />
          <path d="M32 14 L32 50 M24 28 L40 28 M24 36 L40 36" />
          <path d="M20 32 L24 28 M20 32 L24 36 M44 32 L40 28 M44 32 L40 36" />
        </svg>
      );

    // Сердце
    case "Heart":
      return (
        <svg {...props}>
          <path d="M32 56 C12 42 8 30 12 22 C16 14 26 14 32 24 C38 14 48 14 52 22 C56 30 52 42 32 56 Z" />
          <path d="M32 24 L20 22 L16 32 L24 44 L32 50 L40 44 L48 32 L44 22 Z" />
          <path d="M32 24 L32 50 M20 22 L24 44 M44 22 L40 44 M16 32 L48 32" />
        </svg>
      );

    // Груша
    case "Pear":
      return (
        <svg {...props}>
          <path d="M32 8 C22 22 16 32 16 42 C16 51 23 56 32 56 C41 56 48 51 48 42 C48 32 42 22 32 8 Z" />
          <path d="M32 16 L24 28 L22 42 L32 50 L42 42 L40 28 Z" />
          <path d="M32 16 L32 50 M22 42 L42 42 M24 28 L40 28" />
          <path d="M16 42 L22 42 M48 42 L42 42" />
        </svg>
      );

    // Изумруд (emerald — step cut)
    case "Emerald":
      return (
        <svg {...props}>
          <path d="M22 8 H42 L54 20 V44 L42 56 H22 L10 44 V20 Z" />
          <path d="M24 14 H40 L48 22 V42 L40 50 H24 L16 42 V22 Z" />
          <path d="M27 20 H37 L42 25 V39 L37 44 H27 L22 39 V25 Z" />
          <path d="M22 8 L24 14 M42 8 L40 14 M54 20 L48 22 M54 44 L48 42 M42 56 L40 50 M22 56 L24 50 M10 44 L16 42 M10 20 L16 22" />
        </svg>
      );

    // Радиант
    case "Radiant":
      return (
        <svg {...props}>
          <path d="M20 8 H44 L56 20 V44 L44 56 H20 L8 44 V20 Z" />
          <path d="M22 14 L32 18 L42 14 L50 22 L46 32 L50 42 L42 50 L32 46 L22 50 L14 42 L18 32 L14 22 Z" />
          <path d="M32 18 L32 46 M14 22 L50 22 M14 42 L50 42 M18 32 L46 32" />
          <path d="M20 8 L22 14 M44 8 L42 14 M56 20 L50 22 M56 44 L50 42 M44 56 L42 50 M20 56 L22 50 M8 44 L14 42 M8 20 L14 22" />
        </svg>
      );

    // Кушон
    case "Cushion":
      return (
        <svg {...props}>
          <path d="M20 8 H44 Q56 8 56 20 V44 Q56 56 44 56 H20 Q8 56 8 44 V20 Q8 8 20 8 Z" />
          <path d="M22 16 H42 Q48 16 48 22 V42 Q48 48 42 48 H22 Q16 48 16 42 V22 Q16 16 22 16 Z" />
          <polygon points="32,20 44,32 32,44 20,32" />
          <path d="M32,20 L32,16 M44,32 L48,32 M32,44 L32,48 M20,32 L16,32" />
          <path d="M20,32 L16,22 M20,32 L16,42 M44,32 L48,22 M44,32 L48,42 M32,20 L22,16 M32,20 L42,16 M32,44 L22,48 M32,44 L42,48" />
        </svg>
      );

    // Принцесса
    case "Princess":
      return (
        <svg {...props}>
          <rect x="8" y="8" width="48" height="48" />
          <rect x="14" y="14" width="36" height="36" />
          <path d="M8 8 L32 32 L56 8 M8 56 L32 32 L56 56" />
          <path d="M8 8 L56 56 M56 8 L8 56" />
          <rect x="22" y="22" width="20" height="20" />
        </svg>
      );
  }
}
