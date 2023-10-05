import DataBlock from "@/components/DataBlock/DataBlock";
import ReviewEditButton from "@/components/EditButtons/ReviewEditButton/ReviewEditButton";
import ScoreGrid from "@/components/ScoreGrid/ScoreGrid";
import { dateToText } from "@/utils/formatter";
import { getSupabasePublicUserReview } from "@/utils/supabaseFetching"
import Image from "next/image";
import Link from "next/link";
export const revalidate = 1800;



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

    if (!data?.game_id) {
        return (
            <p className="w-full max-w-[1000px] mx-auto bg-dimm h-[34px] flex items-center justify-center textcol-main">Game review not found :/</p>
        )
    }
    function MobileLayout() {
        if (!data) return;

        return (
            <span className="k:hidden flex">
                <div className="w-full max-w-[1000px] mx-auto flex-col items-center flexgap">
                    <div className="w-full flexgap f:flex-row flex-col">
                        <Link className="px-[20px] h-[34px] textcol-main text-[18px] bg-mid flex items-center justify-center font-semibold whitespace-nowrap overflow-x-auto" href={`/game/${data.game_id}`}>{data.game_name}</Link>
                        <p className="px-[10px] h-[34px] textcol-dimm text-[16px] bg-dimm flex items-center justify-end flex-auto whitespace-nowrap overflow-x-auto">{data.date && dateToText(new Date(data.date).valueOf() / 1000)}</p>
                    </div>

                    <div className="flex flexgap w-full">
                        <ReviewEditButton gameId={data.game_id} name={data.game_name || ""} image={data.game_image || ""} date={new Date(data.release_date || "").valueOf()} company={""} />
                        <Link href={`/profile/${data.public_user_id}`} className="px-[10px] h-[34px] textcol-dimm text-[18px] bg-mid w-full overflow-x-auto leading-[34px] text-right">{data.username}</Link>
                    </div>
                    <Image src={data.game_image || ""} alt={`${data.game_name} image`} width={400} height={200} className="w-full h-[200px] object-cover" />

                    <div className=" w-full flexgap h-fit overflow-hidden">
                        <div className="flexgap flex-col flex-auto">
                            <div className="flex sm:flex-row flexgap flex-col">
                                <DataBlock title={"Hours Played"} value={data.hours_spent} textValue={data.hours_spent} />
                                <DataBlock title={"Game Completed"} textValue={data.finished ? "Yes" : "No"} value={0} />
                            </div>
                            <div className="w-full h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto flex-col justify-between">
                                <p className="w-full max-h-[120px] overflow-y-auto textcol-main">{data.user_comment}</p>
                                <p className="textcol-dimm">Comment</p>
                            </div>
                        </div>
                    </div>

                    <ScoreGrid data={data} />
                </div>
            </span>
        )
    }



    function PCLayout() {
        if (!data) return;

        return (
            <span className="k:flex hidden">
                <div className="w-full max-w-[1000px] mx-auto flex-col items-center flexgap">
                    <div className="w-full h-[34px] flexgap">
                        <Link className="px-[20px] textcol-main text-[18px] bg-mid flex items-center justify-center font-semibold" href={`/game/${data.game_id}`}>{data.game_name}</Link>
                        <p className="px-[20px] textcol-dimm text-[16px] bg-dimm flex items-center justify-center">{data.date && dateToText(new Date(data.date).valueOf() / 1000)}</p>
                        <Link href={`/profile/${data.public_user_id}`} className="px-[10px] textcol-dimm text-[18px] bg-mid flex items-center flex-auto justify-end">{data.username}</Link>
                        <ReviewEditButton gameId={data.game_id} name={data.game_name || ""} image={data.game_image || ""} date={new Date(data.release_date || "").valueOf()} company={""} />
                    </div>

                    <div className=" w-full flexgap h-full max-h-[250px] overflow-hidden">
                        <Image src={data.game_image || ""} alt={`${data.game_name} image`} width={400} height={250} className="w-full k:min-w-[400px] h-full max-w-[400px] max-h-[250px] object-cover" />

                        <div className="flexgap flex-col flex-auto">
                            <div className="flex flexgap h-[60px]">
                                <DataBlock title={"Hours Played"} value={data.hours_spent} textValue={data.hours_spent} />
                                <DataBlock title={"Game Completed"} textValue={data.finished ? "Yes" : "No"} value={0} />
                            </div>
                            <div className="w-full h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto flex-col">
                                <p className="w-full max-h-[152px] overflow-y-auto h-full textcol-main ">{data.user_comment}</p>
                                <p className="textcol-dimm">Comment</p>
                            </div>
                        </div>
                    </div>

                    <ScoreGrid data={data}/>
                </div>
            </span>
        )
    }


    return (
        <>
            <PCLayout />
            <MobileLayout />
        </>
    )
}   