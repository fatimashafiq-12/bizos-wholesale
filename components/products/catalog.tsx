"use client";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";

export function Catalog({ products, initialCategory = "All" }: { products: Product[]; initialCategory?: string }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("featured");
  const [max, setMax] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [maxMoq, setMaxMoq] = useState(100);
  const [minDiscount, setMinDiscount] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.departmentName)))];
  const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];

  const rows = useMemo(() => {
    const filtered = products.filter((p) =>
      (!q || [p.name, p.brand, p.sku, p.departmentName].some((v) => v.toLowerCase().includes(q.toLowerCase()))) &&
      (category === "All" || p.departmentName === category) &&
      (brand === "All" || p.brand === brand) &&
      p.regularPrice <= max && p.rating >= minRating && p.minimumOrderQuantity <= maxMoq &&
      p.discountPercent >= minDiscount && (!inStock || p.stock > 0));
    return [...filtered].sort((a, b) => sort === "price-asc" ? a.regularPrice - b.regularPrice : sort === "price-desc" ? b.regularPrice - a.regularPrice : sort === "rating" ? b.rating - a.rating : sort === "discount" ? b.discountPercent - a.discountPercent : sort === "newest" ? b.id - a.id : sort === "best-selling" ? b.reviewCount - a.reviewCount : b.id - a.id);
  }, [products, q, category, brand, sort, max, minRating, maxMoq, minDiscount, inStock]);

  useEffect(() => setPage(1), [q, category, brand, sort, max, minRating, maxMoq, minDiscount, inStock]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);

  const filters = <div className="space-y-4">
    <label className="block text-sm font-semibold">Search<input value={q} onChange={(e) => setQ(e.target.value)} className="mt-2 h-10 w-full rounded-lg border px-3" placeholder="Name, brand, SKU" /></label>
    <label className="block text-sm font-semibold">Category<select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 h-10 w-full rounded-lg border px-3">{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
    <label className="block text-sm font-semibold">Brand<select value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-2 h-10 w-full rounded-lg border px-3">{brands.map((b) => <option key={b}>{b}</option>)}</select></label>
    <label className="block text-sm font-semibold">Max price: ${max}<input type="range" min="500" max="1800" step="50" value={max} onChange={(e) => setMax(Number(e.target.value))} className="mt-2 w-full" /></label>
    <label className="block text-sm font-semibold">Rating<select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="mt-2 h-10 w-full rounded-lg border px-3"><option value="0">Any</option><option value="4.5">4.5+</option><option value="4">4+</option></select></label>
    <label className="block text-sm font-semibold">Maximum MOQ<select value={maxMoq} onChange={(e) => setMaxMoq(Number(e.target.value))} className="mt-2 h-10 w-full rounded-lg border px-3"><option value="100">Any</option><option value="5">5 units</option><option value="10">10 units</option></select></label>
    <label className="block text-sm font-semibold">Minimum discount<select value={minDiscount} onChange={(e) => setMinDiscount(Number(e.target.value))} className="mt-2 h-10 w-full rounded-lg border px-3"><option value="0">Any</option><option value="8">8%+</option><option value="12">12%+</option><option value="16">16%+</option></select></label>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />In stock only</label>
  </div>;

  return <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
    <aside className="hidden h-fit rounded-2xl border bg-white p-5 shadow-soft lg:block"><h2 className="mb-5 font-bold text-navy">Filters</h2>{filters}</aside>
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><button onClick={() => setShowFilters((v) => !v)} className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold lg:hidden"><SlidersHorizontal className="h-4 w-4" />Filters</button><p className="text-sm text-black/60">{rows.length} products</p></div><select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-lg border px-3 text-sm"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-asc">Price Low to High</option><option value="price-desc">Price High to Low</option><option value="rating">Highest Rated</option><option value="best-selling">Best Selling</option><option value="discount">Biggest Discount</option></select></div>
      {showFilters && <div className="mb-5 rounded-2xl border bg-white p-5 lg:hidden">{filters}</div>}
      {pageRows.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{pageRows.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="rounded-2xl border border-dashed p-10 text-center">No products match these filters.</div>}
      {rows.length > pageSize && <div className="mt-8 flex justify-center gap-2">{Array.from({length: pageCount}, (_, i) => i + 1).map((n) => <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-lg border text-sm font-bold ${page === n ? "bg-navy text-white" : "bg-white"}`}>{n}</button>)}</div>}
    </section>
  </div>;
}
