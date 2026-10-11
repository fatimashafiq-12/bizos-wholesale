"use client";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency, getTierPrice } from "@/lib/utils";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, item) => sum + getTierPrice(item.product.pricingTiers, item.quantity) * item.quantity, 0);
  return <AnimatePresence>{open && <>
    <motion.button aria-label="Close cart" className="fixed inset-0 z-[70] bg-black/35" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>
    <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:28,stiffness:320}} className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b p-5"><h2 className="text-xl font-black text-navy">Cart</h2><button aria-label="Close" onClick={onClose} className="rounded-lg p-2 hover:bg-surface"><X/></button></div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">{items.length ? items.map((item)=><div key={item.product.id} className="flex gap-3 rounded-xl border p-3"><div className="relative h-16 w-16 shrink-0 rounded-lg bg-surface/50"><Image src={item.product.productImageUrl} alt={item.product.name} fill className="object-contain p-1"/></div><div className="min-w-0 flex-1"><div className="truncate font-semibold text-navy">{item.product.name}</div><div className="text-xs text-black/50">Qty {item.quantity}</div><div className="mt-1 font-bold">{formatCurrency(getTierPrice(item.product.pricingTiers,item.quantity)*item.quantity)}</div></div></div>) : <div className="rounded-xl border border-dashed p-8 text-center text-sm text-black/50">Your cart is empty.</div>}</div>
      <div className="border-t p-5"><div className="mb-4 flex justify-between font-black"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div><div className="grid grid-cols-2 gap-3"><Link onClick={onClose} href="/cart" className="rounded-xl border px-4 py-3 text-center font-bold">View Cart</Link><Link onClick={onClose} href="/checkout" className="rounded-xl bg-accent px-4 py-3 text-center font-bold text-navy">Checkout</Link></div></div>
    </motion.aside>
  </>}</AnimatePresence>;
}
