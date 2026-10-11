import type { Metadata } from "next";
import { Catalog } from "@/components/products/catalog";
import { getProducts } from "@/lib/services/catalog-service";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Wholesale Products", description: "Browse BizOS wholesale products with tiered business pricing." };
export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) { const { category = "All" } = await searchParams; const products = await getProducts(); return <div className="container-page py-10"><div className="mb-8"><p className="text-sm font-bold uppercase tracking-wider text-accent">Wholesale catalog</p><h1 className="mt-2 text-4xl font-black text-navy">Products</h1><p className="mt-2 text-black/55">Server-rendered product data with interactive client-side filtering.</p></div><Catalog products={products} initialCategory={category} /></div> }