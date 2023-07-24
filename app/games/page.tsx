import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import { Game } from "@/interface";
import supabaseClient from "@/utils/supabaseClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export default async function Games(){

    const supabase = createServerComponentClient({ cookies })

    const {data, error} = await supabase.from('Game').select(`
        *,
        developer:Developer(developer),
        state:ActionState(state),
        tags:GameTag(
            Tag(tag)
        ),
        score:AverageReview(*)
    `);

    function displayGames(){
        if(data && data.length > 0){
            return (
                data.map((game:Game) => <GamePreviewItem key={game.id} gameData={game} />)
            )
        }else{
            return <p>No games found</p>
        }
    }

    if(error){
        return <div className="w-full flex flex-col gap-[60px] items-center py-[60px] textcol-main text-[25px]">
            <p>An error has acquired</p>
        </div>
    }

    return(
        <div className="w-full flex flex-col gap-[60px] items-center py-[60px]">
            {data && displayGames()}
        </div>
    )
}