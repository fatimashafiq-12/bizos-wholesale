import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductBySlug } from "@/lib/services/catalog-service";
export const dynamic = "force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=await getProductBySlug(slug);return p?{title:p.name,description:p.description,openGraph:{title:p.name,description:p.description,images:[p.productImageUrl]}}:{title:"Product"}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await getProductBySlug(slug);if(!p)notFound();return <div className="container-page py-10"><ProductDetail product={p}/></div>}