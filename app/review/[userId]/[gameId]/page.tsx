import { getSupabasePublicUserReview } from "@/utils/supabaseFetching"
import Image from "next/image";

function DataBlock(props: {
    title: string,
    value: string | number,
}) {
    return (
        <div className="flexgap items-center justify-between px-[10px] flex-auto max-h-[60px] bg-dimm">
            <p className="textcol-dimm text-[16px]">{props.title}</p>
            <p className="textcol-main text-[30px] font-semibold">{props.value}</p>
        </div>
    )
}

export default async function Review({ params }: {
    params: {
        userId: number,
        gameId: number
    }
}) {

    let response = await getSupabasePublicUserReview(params.gameId, params.userId);
    let data = response.data;
    let error = response.error;

    if (error) {
        return (
            <>
                <p className="w-full max-w-[1000px] mx-auto bg-dimm h-[34px] flex items-center justify-center textcol-main">Error has acquired/</p>
                <p className="w-full max-w-[1000px] mx-auto bg-dimm h-[34px] flex items-center justify-center textcol-main">{error}/</p>
            </>
        )
    }

    if( !data?.game_id ){
        return(
            <p className="w-full max-w-[1000px] mx-auto bg-dimm h-[34px] flex items-center justify-center textcol-main">Game review not found :/</p>
        )
    }

    
    return (
        <div className="w-full max-w-[1000px] mx-auto flex-col flexgap items-center flexgap">
            <div className="w-full h-[34px] flexgap">
                <p className="px-[20px] textcol-main text-[18px] bg-mid flex items-center justify-center font-semibold">{data.game_name}</p>
                <p className="px-[20px] textcol-dimm text-[16px] bg-dimm flex items-center justify-center">{data.date && new Date(data.date).toDateString()}</p>
                <p className="px-[10px] textcol-dimm text-[18px] bg-mid flex items-center flex-auto justify-end">{data.username}</p>
            </div>

            <div className=" w-full flexgap h-full max-h-[250px] overflow-hidden">
                <Image src={data.game_image || ""} alt={`${data.game_name} image`} width={400} height={250} className="w-full h-full max-w-[400px] max-h-[250px] object-cover" />

                <div className="flexgap flex-col flex-auto">
                    <div className="flex flexgap h-[60px]">
                        <DataBlock title={"Hours Played"} value={data.hours_spent} />
                        <DataBlock title={"Game Completed"} value={data.finished ? "Yes" : "No"} />
                    </div>
                    <div className="w-full  h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto hidden summary-lg:flex flex-col justify-between">
                        <p className="w-full max-h-[155px] overflow-y-auto textcol-main">{data.user_comment}</p>
                        <p className="textcol-dimm">Comment</p>
                    </div>
                </div>
            </div>

        </div>
    )
}   