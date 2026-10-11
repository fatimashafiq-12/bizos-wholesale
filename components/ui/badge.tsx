import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) { return <span className={cn("inline-flex rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-navy", className)} {...props} />; }
