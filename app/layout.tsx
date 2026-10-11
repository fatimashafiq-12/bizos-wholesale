import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: { default: "BizOS E-commerce Wholesale", template: "%s | BizOS" },
  description: "Premium B2B wholesale marketplace for business buyers.",
  openGraph: { title: "BizOS E-commerce Wholesale", description: "Wholesale Shopping Made Simple", type: "website" },
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="min-h-screen antialiased"><Header/><main>{children}</main><Footer/><Toaster richColors position="top-right"/></body></html>}
