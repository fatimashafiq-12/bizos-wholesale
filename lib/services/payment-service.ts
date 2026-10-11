export type PaymentRequest = { orderId: string; amount: number; method: "card" | "cod" | "bank" };
export type PaymentResult = { provider: "mock"; status: "authorized" | "pending"; reference: string };
export interface PaymentProvider { authorize(input: PaymentRequest): Promise<PaymentResult>; }
class MockPaymentProvider implements PaymentProvider { async authorize(input: PaymentRequest): Promise<PaymentResult> { return { provider: "mock", status: input.method === "card" ? "authorized" : "pending", reference: `MOCK-${input.orderId}` }; } }
export const paymentProvider: PaymentProvider = new MockPaymentProvider();
