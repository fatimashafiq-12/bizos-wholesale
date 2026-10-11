"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="container-page py-20 text-center"><h1 className="text-3xl font-black text-navy">Something went wrong</h1><p className="mt-3 text-black/60">The request could not be completed.</p><Button className="mt-6" onClick={reset}>Try again</Button></div>}
