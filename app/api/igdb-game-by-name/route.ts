import { getSupabaseGameIdFromName } from "@/utils/gameFetching";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const res = await request.json()
  
  let {data, error} = await getSupabaseGameIdFromName(res.name);

  return new NextResponse(JSON.stringify({
    data:data,
    error:error
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}