import type { Cut } from "@/data/products";
import Round from "@/assets/cuts/Round.png";
import Oval from "@/assets/cuts/Oval.png";
import Marquise from "@/assets/cuts/Marquise.png";
import Heart from "@/assets/cuts/Heart.png";
import Pear from "@/assets/cuts/Pear.png";
import Emerald from "@/assets/cuts/Emerald.png";
import Radiant from "@/assets/cuts/Radiant.png";
import Cushion from "@/assets/cuts/Cushion.png";
import Princess from "@/assets/cuts/Princess.png";

const map: Record<Cut, string> = {
  Round, Oval, Marquise, Heart, Pear, Emerald, Radiant, Cushion, Princess,
} as Record<Cut, string>;

type Props = { cut: Cut; className?: string };

export function CutIcon({ cut, className }: Props) {
  const src = map[cut];
  if (!src) return null;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
