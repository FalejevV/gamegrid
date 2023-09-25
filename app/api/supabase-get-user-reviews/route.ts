import { UserReviewSampleDataError } from "@/interface";
import { fetchFilteredGames, supabaseGetUserReviews } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: Request):Promise<NextResponse<UserReviewSampleDataError>> {
  const res = await request.json()
  if(res.amount === undefined || res.offset === undefined || res.publicId == undefined) 
  return new NextResponse(JSON.stringify({
    data: null,
    error: "Request body lacks the variable data. Something is not passed"
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  let {data, error} = await supabaseGetUserReviews(res.amount, res.offset, res.publicId);
  return new NextResponse(JSON.stringify({
    data: data || null,
    error: error || null
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}