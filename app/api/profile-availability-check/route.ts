import { supabaseCheckProfileAvailability } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: Request): Promise<NextResponse> {
  const res = await request.json()
  if (res.column === undefined || res.value === undefined || res.user_id === undefined) return new NextResponse(JSON.stringify({
    data: null,
    error: "Missing parameters. Some values are undefined" 
  }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  })
  let { data, error } = await supabaseCheckProfileAvailability(res.column, res.value, res.user_id);

  return new NextResponse(JSON.stringify({
    data: data,
    error: error
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}