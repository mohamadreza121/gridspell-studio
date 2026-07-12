export type PulseFlavorKey = "citrus" | "berry" | "arctic" | "mango";

export type PulseFlavor = {
  key: PulseFlavorKey;
  number: string;
  name: string;
  shortName: string;
  tastingNote: string;
  base: string;
  secondary: string;
  accent: string;
  glow: string;
  ink: string;
};

export const pulseFlavors: readonly PulseFlavor[] = [
  {
    key: "citrus",
    number: "01",
    name: "Citrus Surge",
    shortName: "Citrus",
    tastingNote: "Yuzu · lime · bright finish",
    base: "#c8ff22",
    secondary: "#f4ff7a",
    accent: "#10150b",
    glow: "#d8ff45",
    ink: "#10150b"
  },
  {
    key: "berry",
    number: "02",
    name: "Berry Voltage",
    shortName: "Berry",
    tastingNote: "Blackberry · cherry · tart finish",
    base: "#7b2cff",
    secondary: "#ff3da9",
    accent: "#18062d",
    glow: "#c743ff",
    ink: "#ffffff"
  },
  {
    key: "arctic",
    number: "03",
    name: "Arctic Rush",
    shortName: "Arctic",
    tastingNote: "White grape · mint · ice finish",
    base: "#37dfff",
    secondary: "#d9fbff",
    accent: "#062532",
    glow: "#62eaff",
    ink: "#062532"
  },
  {
    key: "mango",
    number: "04",
    name: "Mango Blaze",
    shortName: "Mango",
    tastingNote: "Mango · orange · warm finish",
    base: "#ff7a1a",
    secondary: "#ffd12f",
    accent: "#3a1004",
    glow: "#ff8a2c",
    ink: "#2b0c03"
  }
] as const;
