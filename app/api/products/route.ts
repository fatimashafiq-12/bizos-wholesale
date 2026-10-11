import { NextResponse } from "next/server";
import { getProducts } from "@/lib/services/catalog-service";
export const dynamic = "force-dynamic";
export async function GET() { const data = await getProducts(); return NextResponse.json({ lastId: 0, pageNo: 0, pageSize: data.length, totalCount: data.length, data }); }