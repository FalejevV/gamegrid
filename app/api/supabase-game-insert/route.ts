import { IGDBFullGameInfoDataError, StringDataError } from "@/interface";
import { supabaseGameInsertByNameDateCompany } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request):Promise<NextResponse<IGDBFullGameInfoDataError>> {
    const res = await request.json()
    let result = await supabaseGameInsertByNameDateCompany(res.name, res.date, res.company);
    
    return new NextResponse(JSON.stringify({
        data: result.data, 
        error: result.error 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

