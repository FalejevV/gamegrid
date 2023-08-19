import { StringArrayDataError, StringDataError } from "@/interface";
import { getIGDBGameDevelopersByNameAndDate } from "@/utils/apiFetching";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    return new NextResponse(JSON.stringify("Only post"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
    });
}


export async function POST(request: Request): Promise<NextResponse<StringArrayDataError>> {
    const res = await request.json()

    let result: StringArrayDataError = await getIGDBGameDevelopersByNameAndDate(res.name, res.date);

    return new NextResponse(JSON.stringify({
        data: result.data,
        error: result.error
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
