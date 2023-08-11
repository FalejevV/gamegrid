import supabaseServer from "@/utils/supabaseServer";
import Link from "next/link";

export default async function Collection(){

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
           <Link href="/add-game" className="bg-hi textcol-main py-[5px] px-[10px] text-[23px] font-medium">Add Game</Link> 
        </div>
      )
}