import { getSupabasePublicUserReview } from "@/utils/supabaseFetching"



export default async function Review({ params }: {
    params: {
        userId: number,
        gameId: number
    }
}) {

    let response = await getSupabasePublicUserReview(params.gameId, params.userId);

    return(
        <div className="w-full flex flex-col k:gap-[60px] gap-[15px] items-center">
            {JSON.stringify(response.data)}
        </div>
    )
}