import { fetchFilteredGames } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: Request) {
  const res = await request.json()
  console.log(res);
  return new NextResponse(JSON.stringify({
    data: null,
    error: null
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}