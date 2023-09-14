import AddGameButton from "@/components/AddGameButton/AddGameButton";
import CollectionGameItem from "@/components/CollectionGameItem/CollectionGameItem";
import { CollectionSummaryInfo, FullGameReviewInfo } from "@/interface";
import CollectionSummary from "@/layout/CollectionSummary";
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
    const summaryResponse = await supabase.from("AverageUserCollectionInfo").select("*").eq("user_id", data.user.id).single();
    let userSummary: CollectionSummaryInfo = summaryResponse.data;
    if (userSummary?.user_id) delete userSummary.user_id;

    const collectionFetch = await supabase.rpc('get_reviews_by_user_id', { p_user_id: data.user.id });
    return (
        <div className="flex gap-[10px] flex-col w-full max-w-[1000px] mx-auto">
            <div className="flex items-center justify-betwee gap-[10px]">
                <div className="flex-auto inputheight text-[16px] textcol-main bg-dimm saturate-50 flex items-center p-[10px] font-medium sm:text-[19px] min-w-[170px] justify-center">Your Summary</div>
                <AddGameButton />
            </div>

            <CollectionSummary summary={userSummary} />

            {collectionFetch && collectionFetch.data && collectionFetch.data.length > 0 &&
                <>
                    <p className="text-[25px] font-semibold textcol-main pt-[30px] pb-[10px]">Game Collection</p>
                    <div className="flex gap-[50px] flex-col textcol-main text-[18px]">
                        {collectionFetch?.data && collectionFetch.data?.length > 0 && collectionFetch.data.map((game: FullGameReviewInfo) => <CollectionGameItem game={game} />)}
                    </div>
                </>
            }

        </div>
    )
}