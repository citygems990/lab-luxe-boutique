export type Cut = "Round" | "Princess" | "Emerald" | "Oval" | "Cushion" | "Pear";
export type Color = "D" | "E" | "F" | "G" | "H";
export type Clarity = "FL" | "IF" | "VVS1" | "VVS2" | "VS1" | "VS2";

export type Product = {
  id: string;
  name: string;
  cut: Cut;
  carat: number;
  color: Color;
  clarity: Clarity;
  price: number;
  cert: "IGI" | "GIA";
  certNumber: string;
  image: string;
  description: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  { id: "lg-001", name: "Eclat Round 1.02", cut: "Round", carat: 1.02, color: "E", clarity: "VVS1", price: 2890, cert: "IGI", certNumber: "LG624178301", image: img("photo-1605100804763-247f67b3557e"), description: "Безупречно симметричная огранка Round Brilliant с идеальной игрой света." },
  { id: "lg-002", name: "Royal Princess 1.50", cut: "Princess", carat: 1.50, color: "F", clarity: "VS1", price: 3650, cert: "GIA", certNumber: "GIA2447118293", image: img("photo-1599643478518-a784e5dc4c8f"), description: "Современная квадратная огранка Princess с акцентированными гранями." },
  { id: "lg-003", name: "Manhattan Emerald 2.01", cut: "Emerald", carat: 2.01, color: "D", clarity: "IF", price: 7980, cert: "IGI", certNumber: "LG624901112", image: img("photo-1611652022419-a9419f74343d"), description: "Ступенчатая огранка Emerald с эффектом «зеркального коридора»." },
  { id: "lg-004", name: "Aurora Oval 1.20", cut: "Oval", carat: 1.20, color: "G", clarity: "VS2", price: 2450, cert: "IGI", certNumber: "LG624778820", image: img("photo-1602751584552-8ba73aad10e1"), description: "Удлинённая Oval-огранка визуально увеличивает камень." },
  { id: "lg-005", name: "Velvet Cushion 1.75", cut: "Cushion", carat: 1.75, color: "F", clarity: "VVS2", price: 4280, cert: "GIA", certNumber: "GIA2447118500", image: img("photo-1515562141207-7a88fb7ce338"), description: "Мягкая подушка с богатой дисперсией и винтажным шармом." },
  { id: "lg-006", name: "Drop Pear 1.10", cut: "Pear", carat: 1.10, color: "E", clarity: "VS1", price: 2990, cert: "IGI", certNumber: "LG624900003", image: img("photo-1535632787350-4e68ef0ac584"), description: "Грушевидная огранка — символ изящества и индивидуальности." },
  { id: "lg-007", name: "Solitaire Round 0.75", cut: "Round", carat: 0.75, color: "H", clarity: "VS2", price: 1490, cert: "IGI", certNumber: "LG624111002", image: img("photo-1573408301185-9146fe634ad0"), description: "Классический солитер для повседневной элегантности." },
  { id: "lg-008", name: "Imperial Emerald 3.00", cut: "Emerald", carat: 3.00, color: "D", clarity: "FL", price: 14500, cert: "GIA", certNumber: "GIA2447220001", image: img("photo-1606166187734-a4cb74079037"), description: "Флагманский камень коллекции — Flawless чистоты, цвет D." },
  { id: "lg-009", name: "Azur Princess 1.00", cut: "Princess", carat: 1.00, color: "G", clarity: "VS2", price: 1890, cert: "IGI", certNumber: "LG624330021", image: img("photo-1612730304263-1d4fb2895af4"), description: "Сбалансированный камень для помолвочного кольца." },
];

export const cuts: Cut[] = ["Round", "Princess", "Emerald", "Oval", "Cushion", "Pear"];
export const colors: Color[] = ["D", "E", "F", "G", "H"];
export const clarities: Clarity[] = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2"];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
