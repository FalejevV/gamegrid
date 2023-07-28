import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import { FilterQueryParams, Game } from "@/interface";
import SortFilterTab from "@/layout/SortFilterTab";
import { fetchFilteredGames } from "@/utils/gameFetching";


export default async function Games({searchParams}:{
    searchParams:FilterQueryParams
}){
    let isError;
    let resultData: Game[] | null = null;
    if(Object.keys(searchParams).length === 0){
        var {data, error} = await fetchFilteredGames(searchParams);
        isError = error;
        resultData = data;
    }else{
        var {data, error} = await fetchFilteredGames(searchParams);
        isError = error;
        resultData = data;
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

    if(isError){
        return <div className="w-full flex flex-col gap-[60px] items-center py-[60px] textcol-main text-[25px]">
            <p>An error has acquired</p>
        </div>
    }

    return(
        <div className="w-full flex flex-col gap-[60px] items-center py-[60px]">
            <SortFilterTab />
            {resultData && displayGames()}
        </div>
    )
}