import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicKey,getSupabaseUrl } from "@/lib/env";
export async function createClient(){
 const store=await cookies();
 return createServerClient(getSupabaseUrl(),getSupabasePublicKey(),{cookies:{getAll(){return store.getAll();},setAll(items){try{items.forEach(({name,value,options})=>store.set(name,value,options));}catch{}}}});
}
