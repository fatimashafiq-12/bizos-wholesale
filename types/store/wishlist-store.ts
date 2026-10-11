"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  toggle: (product: Product) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(persist((set) => ({
  items: [],
  toggle: (product) => set((state) => state.items.some((item) => item.product.id === product.id)
    ? { items: state.items.filter((item) => item.product.id !== product.id) }
    : { items: [...state.items, { product, addedAt: new Date().toISOString() }] }),
  remove: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  clear: () => set({ items: [] }),
}), { name: "bizos-wishlist" }));
