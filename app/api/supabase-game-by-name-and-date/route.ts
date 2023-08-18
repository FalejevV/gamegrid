import { GameCreationRequiredInfoDataError, StringDataError } from "@/interface";
import { getSupabaseGameByNameAndDate} from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request):Promise<NextResponse<GameCreationRequiredInfoDataError>> {
    const res = await request.json()

    let result: GameCreationRequiredInfoDataError = await getSupabaseGameByNameAndDate(res.name, res.date);
    
    return new NextResponse(JSON.stringify({
        data: result.data, 
        error: result.error 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}


