import { cache } from "react";
import { products as fallbackProducts, categories, enrichProduct, type SourceProduct } from "@/data/products";
import { suppliers, coupons } from "@/data/content";
import type { Product, Supplier, Coupon } from "@/types";

const API_URL = (process.env.BIZOS_API_URL ?? "https://erpapi.biz-os.com").replace(/\/+$/, "");
const TENANT_ID = process.env.BIZOS_TENANT_ID ?? "1034";

// Live BizOS ERP API se products laata hai. Agar API fail ho ya timeout ho
// to build/page crash nahi hota, local data par fallback ho jata hai.
export const getProducts = cache(async (): Promise<Product[]> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API_URL}/api/ecommerce/products/search`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        TenantId: TENANT_ID,
      },
      body: JSON.stringify({}),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`BizOS API responded ${res.status}`);
    const json = (await res.json()) as { data?: SourceProduct[] };
    if (!Array.isArray(json.data) || json.data.length === 0) throw new Error("BizOS API returned no products");
    return json.data.map(enrichProduct);
  } catch (error) {
    console.error("[catalog-service] products fetch failed, using fallback data:", error);
    return fallbackProducts;
  } finally {
    clearTimeout(timer);
  }
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((product) => product.slug === slug);
}
export async function getCategories(): Promise<string[]> { return [...categories]; }
export async function getSuppliers(): Promise<Supplier[]> { return suppliers; }
export async function getCoupons(): Promise<Coupon[]> { return coupons; }