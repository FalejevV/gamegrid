import { StringDataError } from "@/interface";
import { getIGDBByGameName } from "@/utils/fetching";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request):Promise<NextResponse<StringDataError>> {
    const res = await request.json()

    let result = await getIGDBByGameName(res.name);

    return new NextResponse(JSON.stringify({
        data: Array.isArray(result) && result,
        error: !Array.isArray(result) && result 
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}