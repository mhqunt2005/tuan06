
import type { Phone, ColorKey } from "../types";

export const PHONE_COLORS: Record<
  ColorKey,
  { label: string; hex: string; image: number }
> = {
  silver: {
    label: "bạc",
    hex: "#C9EEFA",
    image: require("../../assets/phones/silver.jpg"),
  },
  red: {
    label: "đỏ",
    hex: "#E53A2F",
    image: require("../../assets/phones/red.jpg"),
  },
  black: {
    label: "đen",
    hex: "#000000",
    image: require("../../assets/phones/black.jpg"),
  },
  blue: {
    label: "xanh",
    hex: "#2A4494",
    image: require("../../assets/phones/blue.jpg"),
  },
};

export const COLOR_ORDER: ColorKey[] = [
  "silver",
  "red",
  "black",
  "blue",
];

export const PHONES: Phone[] = [
  {
    id: "1",
    name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: 1790000,
    oldPrice: 1790000,
    rating: 5,
    reviewCount: 828,
    supplier: "Tiki Trading",
    badge: "Ở ĐÂU RẺ HƠN HOÀN TIỀN",
    colors: COLOR_ORDER,
    defaultColor: "blue",
  },
  {
    id: "2",
    name: "Vsmart Live 4 - Hàng chính hãng",
    price: 3990000,
    oldPrice: 4290000,
    rating: 5,
    reviewCount: 250,
    supplier: "Tiki Trading",
    badge: "GIÁ TỐT",
    colors: COLOR_ORDER,
    defaultColor: "red",
  },
];
