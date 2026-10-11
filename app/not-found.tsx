import Link from "next/link";
export default function NotFound(){return <div className="container-page py-20 text-center"><h1 className="text-5xl font-black text-navy">404</h1><p className="mt-3">This page could not be found.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-accent px-5 py-3 font-semibold text-navy">Back home</Link></div>}
