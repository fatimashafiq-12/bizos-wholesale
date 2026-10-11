"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  applyCoupon: (code: string | null) => void;
}

export const useCartStore = create<CartState>()(persist((set) => ({
  items: [],
  couponCode: null,
  addItem: (product, quantity = 1) => set((state) => {
    const existing = state.items.find((item) => item.product.id === product.id);
    if (existing) {
      return { items: state.items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) };
    }
    return { items: [...state.items, { product, quantity }] };
  }),
  removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  updateQuantity: (productId, quantity) => set((state) => ({ items: state.items.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item) })),
  clear: () => set({ items: [], couponCode: null }),
  applyCoupon: (couponCode) => set({ couponCode }),
}), { name: "bizos-cart" }));
