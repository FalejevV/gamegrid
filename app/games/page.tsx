import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import SortFilterQueryLink from "@/components/SortFilterQueryLink/SortFilterQueryLink";
import { Game } from "@/interface";
import SortFilterTab from "@/layout/SortFilterTab";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export default async function Games({searchParams}:{
    searchParams:{}
}){

    const supabase = createServerComponentClient({ cookies })
    let query = supabase.from('Game');
    if(Object.keys(searchParams).length === 0){
        var {data, error} = await query.select(`
            *,
            developer:Developer(developer),
            state:ActionState(state),
            tags:GameTag(
                Tag(tag)
            ),
            score:AverageReview(*)
        `).order("release_date", {ascending:true})
    }else{
        var {data, error} = await query.select(`
            *,
            developer:Developer(developer),
            state:ActionState(state),
            tags:GameTag(
                Tag(tag)
            ),
            score:AverageReview(*)
        `).order("release_date", {ascending:false})
    }

    
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
            <SortFilterTab />
            {data && displayGames()}
        </div>
    )
}