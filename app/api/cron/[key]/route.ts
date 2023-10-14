import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    let key = request.url.split("cron/")[1];
    if(key && key === process.env.CRON_KEY){
        return new NextResponse(JSON.stringify("Access granted. Running updates"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
    }
    return new NextResponse(JSON.stringify("Nope"), {
        status: 403,
        headers: { "Content-Type": "application/json" },
    });
}
