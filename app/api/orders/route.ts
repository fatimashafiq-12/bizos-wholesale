import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validations";
import { products } from "@/data/products";
import { coupons } from "@/data/content";
import { getTierPrice } from "@/lib/utils";

type OrderLine = { productId: number; quantity: number };
type Payload = { customer: unknown; items: OrderLine[]; couponCode?: string | null };
export async function POST(req: Request) {
  const body = await req.json() as Payload; const customer = checkoutSchema.safeParse(body.customer);
  if (!customer.success || !Array.isArray(body.items) || body.items.length === 0) return NextResponse.json({error:"Invalid order"},{status:400});
  let subtotal=0; for (const line of body.items) { const product=products.find(p=>p.id===line.productId); if(!product || !Number.isInteger(line.quantity) || line.quantity<product.minimumOrderQuantity) return NextResponse.json({error:"Invalid product or quantity"},{status:400}); subtotal += getTierPrice(product.pricingTiers,line.quantity)*line.quantity; }
  const coupon=coupons.find(c=>c.code===body.couponCode&&c.active&&new Date(c.expiryDate)>new Date()); const discount=coupon&&subtotal>=coupon.minimumOrder?Math.min(coupon.discountType==="percentage"?subtotal*coupon.discountValue/100:coupon.discountValue,coupon.maximumDiscount??Infinity):0;
  const shipping=customer.data.shippingMethod==="express"?85:subtotal>=1000?0:45; const tax=(subtotal-discount)*.05; const total=Number((subtotal-discount+shipping+tax).toFixed(2));
  return NextResponse.json({id:`BIZ-${Date.now().toString().slice(-6)}`,total,status:"Pending"},{status:201});
}
