import type { Coupon, Order, Supplier } from "@/types";

export const suppliers: Supplier[] = [
  { id: "sup-1", name: "Apex Technology Trading", slug: "apex-technology-trading", category: "Electronics", location: "Dubai, UAE", rating: 4.9, verified: true, minimumOrder: 10, description: "Enterprise electronics distribution and regional fulfillment." },
  { id: "sup-2", name: "Metro Mobility Supply", slug: "metro-mobility-supply", category: "Mobility", location: "Lahore, Pakistan", rating: 4.7, verified: true, minimumOrder: 5, description: "Wholesale mobility devices for retailers and corporate buyers." },
  { id: "sup-3", name: "Northstar Business Goods", slug: "northstar-business-goods", category: "Office Supplies", location: "Singapore", rating: 4.6, verified: true, minimumOrder: 20, description: "Office and business essentials with volume contracts." },
];

export const coupons: Coupon[] = [
  { code: "BIZOS10", discountType: "percentage", discountValue: 10, minimumOrder: 500, maximumDiscount: 500, expiryDate: "2027-12-31", usageLimit: 1000, active: true },
];

export const demoOrders: Order[] = [
  {
    id: "BIZ-10482",
    createdAt: "2026-09-18T09:15:00.000Z",
    items: [{ productId: 28860, name: "MacBook Neo", quantity: 10, unitPrice: 569.05, imageUrl: "https://erpmedia.biz-os.com/media/1034/product/28860/5322ba11-0d86-4474-9cfa-67af01912e12.png" }],
    subtotal: 5690.5,
    discount: 0,
    shipping: 0,
    tax: 284.53,
    total: 5975.03,
    status: "Shipped",
    paymentStatus: "Paid",
    shippingAddress: { fullName: "Demo Buyer", country: "Pakistan", city: "Lahore", state: "Punjab", address: "Business District", postalCode: "54000" },
  },
];
