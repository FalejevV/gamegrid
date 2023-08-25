import { GameReviewData } from "@/interface";
import getSupabaseUserGameReview, { getSupabasePlatformNameByPlatformId } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";





export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request):Promise<NextResponse<GameReviewData>> {
    const res = await request.json()

    let result = await getSupabaseUserGameReview(res.userId, res.gameId);
    if(result.data?.platform_id){
        let platformName = await getSupabasePlatformNameByPlatformId(result.data.platform_id);
        if(platformName.data){
            result.data.platform_played = platformName.data;
        }
    }

    return new NextResponse(JSON.stringify({
        data: result.data, 
        error: result.error 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}


