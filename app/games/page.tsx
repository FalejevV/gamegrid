import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import { FilterQueryParams, Game } from "@/interface";
import SortFilterTab from "@/layout/SortFilterTab";
import { fetchFilteredGames } from "@/utils/gameFetching";
import { PostgrestError } from "@supabase/supabase-js";
import { nanoid } from "nanoid";


export default async function Games({searchParams}:{
    searchParams:FilterQueryParams
}){
    let isError:PostgrestError | null =null;
    let resultData: Game[] | null = null;
    searchParams.amount = 3;

    let {data, error} = await fetchFilteredGames(searchParams);
        isError = error;
        resultData = data;

    function displayGames(){
        if(data && data.length > 0 && !isError){
            return (
                data.map((game:Game) => game !== undefined && <GamePreviewItem key={nanoid()} gameData={game} />)
            )
        }else{
            return <p className="textcol-main text-2xl">No games found</p>
        }
    }

    if(isError){
        return <div className="w-full flex flex-col gap-[60px] items-center py-[60px] textcol-main text-[25px]">
            <p>An error has acquired</p>
            <p>{isError.toString()}</p>
        </div>
    }

    return(
        <div className="w-full flex flex-col gap-[60px] items-center py-[60px]">
            <SortFilterTab />
            {resultData && displayGames()}
        </div>
    )
}