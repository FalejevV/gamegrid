import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
      const res = await request.json()
    console.log(res.key);
    if(res.key && res.key === process.env.CRON_KEY){
        console.log("YES");
    }


    return new NextResponse(JSON.stringify("Nope"), {
        status: 403,
        headers: { "Content-Type": "application/json" },
    });
}
