import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({ok:true,service:"gridspell-studio",timestamp:new Date().toISOString()});}
