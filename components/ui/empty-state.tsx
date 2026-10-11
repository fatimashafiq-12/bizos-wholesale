import Link from "next/link";
export function EmptyState({ title, href="/products", action="Start Shopping" }: { title:string; href?:string; action?:string }) {
  return <div className="rounded-2xl border border-dashed border-black/20 bg-surface/30 p-10 text-center"><h2 className="text-xl font-bold text-navy">{title}</h2><Link className="mt-5 inline-flex rounded-xl bg-accent px-5 py-3 font-semibold text-navy" href={href}>{action}</Link></div>;
}
