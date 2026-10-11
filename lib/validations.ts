import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8, "Password must be at least 8 characters") });

export const registerSchema = z.object({
  fullName: z.string().min(2), businessName: z.string().min(2), email: z.string().email(), phone: z.string().min(7), password: z.string().min(8), confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

export const checkoutSchema = z.object({
  fullName: z.string().min(2), email: z.string().email(), phone: z.string().min(7), country: z.string().min(2), city: z.string().min(2), state: z.string().min(2), address: z.string().min(5), postalCode: z.string().min(3),
  shippingMethod: z.enum(["standard", "express"]), paymentMethod: z.enum(["card", "cod", "bank"]),
  cardNumber: z.string().optional(), cardExpiry: z.string().optional(), cardCvc: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!/^\d{12,19}$/.test((data.cardNumber ?? "").replace(/\s/g, ""))) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardNumber"], message: "Enter a valid card number" });
    if (!/^\d{2}\/\d{2}$/.test(data.cardExpiry ?? "")) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardExpiry"], message: "Use MM/YY" });
    if (!/^\d{3,4}$/.test(data.cardCvc ?? "")) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardCvc"], message: "Enter a valid CVC" });
  }
});

export const rfqSchema = z.object({ product: z.string().min(2), quantity: z.coerce.number().int().positive(), targetPrice: z.coerce.number().positive(), deliveryLocation: z.string().min(3), requiredDeliveryDate: z.string().min(1), additionalRequirements: z.string().max(1000).optional() });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type RFQInput = z.infer<typeof rfqSchema>;
