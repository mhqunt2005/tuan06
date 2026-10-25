
import { PHONES } from "../data/phones";
import type { Phone } from "../types";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? ""
).replace(/\/$/, "");

export const USING_API = API_URL !== "";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  // Không cấu hình API thì dùng dữ liệu mẫu.
  if (!USING_API) {
    await sleep(600);

    const phone = PHONES.find((item) => item.id === id);

    if (!phone) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return phone;
  }

  // Gọi API lấy thông tin điện thoại theo ID.
  const response = await fetch(`${API_URL}/phones/${id}`);

  if (!response.ok) {
    throw new Error(`Máy chủ trả về lỗi ${response.status}`);
  }

  const data = (await response.json()) as Phone;

  // Kiểm tra dữ liệu nhận về.
  if (!data.name || data.price === undefined) {
    throw new Error("Dữ liệu điện thoại từ API không hợp lệ");
  }

  return data;
}
