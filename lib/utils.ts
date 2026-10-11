import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceTier, Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function getTierPrice(tiers: PriceTier[], quantity: number) {
  return tiers.find((tier) => quantity >= tier.min && (tier.max === undefined || quantity <= tier.max))?.unitPrice ?? tiers[0]?.unitPrice ?? 0;
}

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => [p.name, p.departmentName, p.brand, p.sku].some((value) => value.toLowerCase().includes(q)));
}
