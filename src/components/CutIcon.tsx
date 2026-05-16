import type { Cut } from "@/data/products";

type Props = { cut: Cut; className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

export function CutIcon({ cut, className }: Props) {
  const props = { viewBox: "0 0 64 64", className, ...common };
  switch (cut) {
    case "Round":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="14" />
          <path d="M10 32 L54 32 M32 10 L32 54 M16 16 L48 48 M48 16 L16 48" />
        </svg>
      );
    case "Oval":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="32" rx="16" ry="24" />
          <ellipse cx="32" cy="32" rx="10" ry="16" />
          <path d="M32 8 L32 56 M16 32 L48 32" />
        </svg>
      );
    case "Emerald":
      return (
        <svg {...props}>
          <path d="M22 10 H42 L54 22 V42 L42 54 H22 L10 42 V22 Z" />
          <path d="M24 18 H40 L46 24 V40 L40 46 H24 L18 40 V24 Z" />
          <path d="M22 10 L24 18 M42 10 L40 18 M54 22 L46 24 M54 42 L46 40 M42 54 L40 46 M22 54 L24 46 M10 42 L18 40 M10 22 L18 24" />
        </svg>
      );
    case "Princess":
      return (
        <svg {...props}>
          <rect x="10" y="10" width="44" height="44" />
          <path d="M10 10 L54 54 M54 10 L10 54" />
          <rect x="22" y="22" width="20" height="20" />
        </svg>
      );
    case "Pear":
      return (
        <svg {...props}>
          <path d="M32 8 C20 22 14 32 14 42 C14 51 22 56 32 56 C42 56 50 51 50 42 C50 32 44 22 32 8 Z" />
          <path d="M32 16 C24 26 20 34 20 42 C20 49 26 52 32 52 C38 52 44 49 44 42 C44 34 40 26 32 16 Z" />
          <path d="M32 8 L32 56" />
        </svg>
      );
    case "Cushion":
      return (
        <svg {...props}>
          <path d="M20 10 H44 Q54 10 54 20 V44 Q54 54 44 54 H20 Q10 54 10 44 V20 Q10 10 20 10 Z" />
          <path d="M24 18 H40 Q46 18 46 24 V40 Q46 46 40 46 H24 Q18 46 18 40 V24 Q18 18 24 18 Z" />
          <path d="M10 10 L18 18 M54 10 L46 18 M54 54 L46 46 M10 54 L18 46" />
        </svg>
      );
    case "Radiant":
      return (
        <svg {...props}>
          <path d="M20 10 H44 L54 20 V44 L44 54 H20 L10 44 V20 Z" />
          <path d="M24 18 H40 L46 24 V40 L40 46 H24 L18 40 V24 Z" />
          <path d="M10 20 L18 24 M54 20 L46 24 M54 44 L46 40 M10 44 L18 40 M20 10 L24 18 M44 10 L40 18 M44 54 L40 46 M20 54 L24 46" />
        </svg>
      );
    case "Heart":
      return (
        <svg {...props}>
          <path d="M32 54 C12 40 8 28 12 20 C16 12 26 12 32 22 C38 12 48 12 52 20 C56 28 52 40 32 54 Z" />
          <path d="M32 22 L32 50" />
        </svg>
      );
    case "Marquise":
      return (
        <svg {...props}>
          <path d="M8 32 C20 18 44 18 56 32 C44 46 20 46 8 32 Z" />
          <path d="M16 32 C24 24 40 24 48 32 C40 40 24 40 16 32 Z" />
          <path d="M8 32 L56 32" />
        </svg>
      );
  }
}
