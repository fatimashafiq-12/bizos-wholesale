export type Product = {
  id: number;
  name: string;
  slug: string;
  regularPrice: number;
  productImageUrl: string;
  departmentId: number;
  departmentName: string;
  productMeasureUnitId: number;
  productMeasureUnitName: string;
  totalCount: number;
  brand: string;
  sku: string;
  rating: number;
  reviewCount: number;
  stock: number;
  minimumOrderQuantity: number;
  discountPercent: number;
  description: string;
  specifications: Record<string, string>;
  pricingTiers: PriceTier[];
  colors: string[];
  sizes: string[];
};

export type PriceTier = {
  min: number;
  max?: number;
  unitPrice: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type WishlistItem = {
  product: Product;
  addedAt: string;
};

export type Address = {
  id?: string;
  fullName: string;
  country: string;
  city: string;
  state: string;
  address: string;
  postalCode: string;
  phone?: string;
};

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export type OrderItem = {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
};

export type Supplier = {
  id: string;
  name: string;
  slug: string;
  category: string;
  location: string;
  rating: number;
  verified: boolean;
  minimumOrder: number;
  description: string;
};

export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrder: number;
  maximumDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  active: boolean;
};

export type RFQ = {
  id: string;
  product: string;
  quantity: number;
  targetPrice: number;
  deliveryLocation: string;
  requiredDeliveryDate: string;
  additionalRequirements?: string;
  status: "Submitted" | "Reviewing" | "Quoted";
};

export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  role: UserRole;
};
