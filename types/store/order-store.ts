"use client";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {Address} from "@/types";

type LastOrder={id:string;total:number;shippingAddress:Address;estimatedDelivery:string};
type State={lastOrder:LastOrder|null;setLastOrder:(order:LastOrder)=>void};
export const useOrderStore=create<State>()(persist((set)=>({lastOrder:null,setLastOrder:(lastOrder)=>set({lastOrder})}),{name:"bizos-last-order"}));
