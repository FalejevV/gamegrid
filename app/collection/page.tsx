import AddGameButton from "@/components/AddGameButton/AddGameButton";
import { FullGameReviewInfo, GameReviewData } from "@/interface";
import CollectionSummary from "@/layout/CollectionSummary";
import { getCollectionSummary } from "@/utils/formatter";
import supabaseServer from "@/utils/supabaseServer";

export default async function Collection() {

    const supabase = supabaseServer()
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
        return (
            <div className="w-full flex flex-col gap-[40px] items-center justify-center pt-[50px]">
                <p className="text-lg text-yellow-50">You need do sign in to view this page</p>
            </div>
        )
    }
    const collectionFetch = await supabase.rpc('get_user_reviews', { p_user_id: data.user.id });
    const summaryResult = getCollectionSummary(collectionFetch.data);

    return (
        <div className="flex gap-[10px] flex-col w-full max-w-[1000px] mx-auto">
            <div className="flex items-center justify-end">
                <AddGameButton />
            </div>

            <CollectionSummary summary={summaryResult} />

            <div className="flexgap flex-col textcol-main text-[18px]">
                {collectionFetch?.data && collectionFetch.data?.length > 0 && collectionFetch.data.map((game:FullGameReviewInfo) => <p> Game: {game.game_name} - Platform: {game.platform_name} - Score: {game.total_score} - Date: {new Date(game.date).toDateString()} </p>)}
            </div>

        </div>
    )
}