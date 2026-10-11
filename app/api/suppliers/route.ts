import {NextResponse} from "next/server";import {suppliers} from "@/data/content";export async function GET(){return NextResponse.json(suppliers)}
