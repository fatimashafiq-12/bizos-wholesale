import { Skeleton } from "@/components/ui/skeleton";
export default function Loading(){return <div className="container-page py-10"><Skeleton className="h-10 w-64"/><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-80"/>)}</div></div>}
