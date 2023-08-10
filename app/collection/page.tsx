import supabaseServer from "@/utils/supabaseServer";
import { NextRequest, NextResponse } from "next/server";



export default async function Collection(req:NextRequest, res:NextResponse){

    const supabase = supabaseServer()
    const {data} = await supabase.auth.getUser();


    if(!data.user){
        return(
            <div className="w-full flex flex-col gap-[40px] items-center justify-center pt-[50px]">
                <p className="text-lg text-yellow-50">You need do sign in to view this page</p>
            </div>
        )
    }
    
    return (
        <div className="w-full flex flex-col gap-[40px] items-center justify-center pt-[50px]">
            <p className="text-lg text-yellow-50">Collection page</p>
            <p className="text-lg text-yellow-50">Currently empty</p>
        </div>
      )
}