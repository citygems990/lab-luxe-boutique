import roundImg from "@/assets/diamond-round.jpg";
import ovalImg from "@/assets/diamond-oval.jpg";
import emeraldImg from "@/assets/diamond-emerald.jpg";
import princessImg from "@/assets/diamond-princess.jpg";
import pearImg from "@/assets/diamond-pear.jpg";
import cushionImg from "@/assets/diamond-cushion.jpg";
import radiantImg from "@/assets/diamond-radiant.jpg";
import heartImg from "@/assets/diamond-heart.jpg";
import marquiseImg from "@/assets/diamond-marquise.jpg";

export type Cut =
  | "Round"
  | "Oval"
  | "Emerald"
  | "Princess"
  | "Pear"
  | "Cushion"
  | "Radiant"
  | "Heart"
  | "Marquise";

export type Color = "D" | "E" | "F" | "G" | "H" | "I";
export type Clarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1";

export type Product = {
  id: string;
  name: string;
  cut: Cut;
  cutRu: string;
  carat: number;
  color: Color;
  clarity: Clarity;
  cutGrade: "Excellent" | "Very Good" | "Good";
  price: number;
  cert: "IGI" | "GIA";
  certNumber: string;
  image: string;
  description: string;
};

export const CUT_RU: Record<Cut, string> = {
  Round: "Круг",
  Oval: "Овал",
  Emerald: "Изумруд",
  Princess: "Принцесса",
  Pear: "Груша",
  Cushion: "Кушон",
  Radiant: "Радиант",
  Heart: "Сердце",
  Marquise: "Маркиз",
};

const SHAPE_IMG: Record<Cut, string> = {
  Round: roundImg,
  Oval: ovalImg,
  Emerald: emeraldImg,
  Princess: princessImg,
  Pear: pearImg,
  Cushion: cushionImg,
  Radiant: radiantImg,
  Heart: heartImg,
  Marquise: marquiseImg,
};

export const cuts: Cut[] = [
  "Round","Oval","Emerald","Princess","Pear","Cushion","Radiant","Heart","Marquise",
];
export const colors: Color[] = ["D","E","F","G","H","I"];
export const clarities: Clarity[] = ["FL","IF","VVS1","VVS2","VS1","VS2","SI1"];
const grades: Product["cutGrade"][] = ["Excellent","Very Good","Good"];
const certs: Product["cert"][] = ["IGI"];

function rng(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export const products: Product[] = Array.from({ length: 24 }).map((_, i) => {
  const r = rng(i + 7);
  const cut = cuts[Math.floor(r() * cuts.length)];
  const carat = Math.round((0.5 + r() * 3.5) * 100) / 100;
  const color = colors[Math.floor(r() * colors.length)];
  const clarity = clarities[Math.floor(r() * clarities.length)];
  const grade = grades[Math.floor(r() * grades.length)];
  const cert = certs[Math.floor(r() * certs.length)];
  const base = carat * carat * 180000 + 60000;
  const price = Math.round(base / 1000) * 1000;
  const id = `lg-${1000 + i}`;
  return {
    id,
    name: `${CUT_RU[cut]} ${carat.toFixed(2)} ct`,
    cut,
    cutRu: CUT_RU[cut],
    carat,
    color,
    clarity,
    cutGrade: grade,
    price,
    cert,
    certNumber: `${cert}-${2440000 + i * 137}`,
    image: SHAPE_IMG[cut],
    description: `Выращенный бриллиант огранки «${CUT_RU[cut]}» — ${carat.toFixed(2)} карата, цвет ${color}, чистота ${clarity}. Идентичен природному по химии и оптике, с лазерной маркировкой и сертификатом ${cert}.`,
  };
});

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";
