import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("focus-ring inline-flex min-h-11 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", {
  variants: { variant: { default: "bg-navy px-5 py-2.5 text-white hover:-translate-y-0.5 hover:bg-black", accent: "bg-accent px-5 py-2.5 text-navy hover:brightness-95", outline: "border border-black/10 bg-white px-5 py-2.5 text-navy hover:bg-surface" }, size: { default: "h-11", sm: "h-9 px-3", lg: "h-12 px-6" } },
  defaultVariants: { variant: "default", size: "default" }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export function Button({className,variant,size,asChild=false,...props}:ButtonProps){const Comp=asChild?Slot:"button";return <Comp className={cn(buttonVariants({variant,size,className}))} {...props}/>}
