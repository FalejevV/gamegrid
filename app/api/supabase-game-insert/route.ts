import { StringDataError } from "@/interface";
import { supabaseGameInsertByName } from "@/utils/supabaseFetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request):Promise<NextResponse<StringDataError>> {
    const res = await request.json()

    let result = await supabaseGameInsertByName(res.name, res.date, res.company);
    
    return new NextResponse(JSON.stringify({
        data: result.data, 
        error: result.error 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

