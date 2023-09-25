import GamePreviewItem from "@/components/GamePreviewItem/GamePreviewItem";
import GamePageItemsLoader from "@/components/Loader/GamePageItemsLoader/GamePageItemsLoader";
import { FilterQueryParams, Game } from "@/interface";
import SortFilterTab from "@/layout/SortFilter/SortFilterTab";
import { fetchFilteredGames } from "@/utils/supabaseFetching";
import { PostgrestError } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
export const revalidate = 1800;

export default async function Games({ searchParams }: {
    searchParams: FilterQueryParams
}) {
    let isError: PostgrestError | null = null;
    let resultData: Game[] | null = null;

    let { data, error } = await fetchFilteredGames(searchParams);
    isError = error;
    resultData = data;
    
    function displayGames() {
        if (resultData && resultData.length > 0 && !isError) {
            return (
                resultData.map((game: Game) => game !== undefined && <GamePreviewItem key={nanoid()} gameData={game} />)
            )
        } else {
            return <p className="textcol-main text-2xl">No games found</p>
        }
    }

    if (isError) {
        return <div className="w-full flex flex-col gap-[60px] items-center py-[60px] textcol-main text-[25px]">
            <p>An error has acquired</p>
            <p>{isError.toString()}</p>
        </div>
    }
    return (
        <div className="w-full flex min-h-[500px] flex-col k:gap-[60px] gap-[15px] items-center">
            <SortFilterTab />
            <div className="w-full items-center flex flex-col gap-[60px]" id="gameList">
                {resultData && displayGames()}
                {resultData && resultData?.length > 0 && <GamePageItemsLoader initialGames={resultData} />}
            </div>
        </div>
    )
}