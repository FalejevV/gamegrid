import { StringDataError } from "@/interface";
import { insertSupabaseReview } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json()
  if (!res.userId && !res.game) return new NextResponse(JSON.stringify({
    data: null,
    error: "Auth Error" 
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
  let { data, error } = await insertSupabaseReview(res.userId, res.game);

  return new NextResponse(JSON.stringify({
    data: data,
    error: error
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}