import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import { Game } from "@/interface";
import supabaseClient from "@/utils/supabaseClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export default async function Games(){

    const supabase = createServerComponentClient({ cookies })

    const {data, error} = await supabase.from('Game').select("*")

    function displayGames(){
        if(data && data.length > 0){
            return (
                data.map((game:Game) => <GamePreviewItem key={game.id} gameData={game} />)
            )
        }else{
            return <p>No games found</p>
        }
    }


    return(
        <div className="w-full flex flex-col gap-[60px] items-center py-[60px]">
            {data && displayGames()}
        </div>
    )
}