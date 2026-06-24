import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export const getCurrentUser=cache(async()=>{const s=await createClient(); const {data:{user}}=await s.auth.getUser(); return user;});
export async function requireUser(){const user=await getCurrentUser(); if(!user) redirect("/login"); return user;}
export async function requireAdmin(){const user=await requireUser(); const s=await createClient(); const {data:p}=await s.from("profiles").select("role").eq("id",user.id).single(); if(!p||!["owner","admin"].includes(p.role)) redirect("/portal"); return {user,profile:p};}
