"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function ProductCard({product}:{product:Product}){
  const add=useCartStore(s=>s.addItem); const toggle=useWishlistStore(s=>s.toggle); const wished=useWishlistStore(s=>s.items.some(i=>i.product.id===product.id));
  return <motion.article initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} whileHover={{y:-4}} className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft">
    <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-surface/50"><Image src={product.productImageUrl} alt={product.name} fill sizes="(max-width:768px) 50vw,25vw" className="object-contain p-5 transition duration-300 group-hover:scale-105"/><span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-1 text-xs font-bold text-navy">-{product.discountPercent}%</span></Link>
    <div className="p-4"><div className="text-xs font-semibold uppercase tracking-wide text-black/45">{product.brand} · {product.departmentName}</div><Link href={`/products/${product.slug}`} className="mt-1 block min-h-12 font-bold text-navy hover:underline">{product.name}</Link><div className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-accent text-accent"/><span>{product.rating}</span><span className="text-black/40">({product.reviewCount})</span></div><div className="mt-3 flex items-end justify-between"><div><div className="text-xl font-black text-navy">{formatCurrency(product.regularPrice)}</div><div className="text-xs text-black/50">MOQ {product.minimumOrderQuantity} · {product.stock} in stock</div></div><button aria-label="Wishlist" onClick={()=>{toggle(product);toast.success(wished?"Removed from wishlist":"Wishlist updated")}} className="focus-ring rounded-xl border p-2"><Heart className={`h-4 w-4 ${wished?"fill-accent text-accent":""}`}/></button></div><button onClick={()=>{add(product,product.minimumOrderQuantity);toast.success(`${product.name} added to cart`)}} className="focus-ring mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-black"><ShoppingCart className="h-4 w-4"/>Add MOQ to Cart</button></div>
  </motion.article>
}
