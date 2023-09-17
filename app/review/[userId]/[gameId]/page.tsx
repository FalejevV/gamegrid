import { RatingNumber } from "@/interface";
import { ratingSymbols } from "@/rating";
import { getSupabasePublicUserReview } from "@/utils/supabaseFetching"
import Image from "next/image";

function DataBlock(props: {
    title: string,
    value: number,
    textValue?: string | number
    color?: string,
    filter?: string
}) {
    let ratingNameKey = props.value / 10 as RatingNumber;
    return (
        <div className={`flexgap items-center justify-between px-[10px] min-w-[270px] w-full max-h-[50px] min-h-[50px] ${props.color ? props.color : "bg-dimm"} ${props.filter}`}>
            <p className="textcol-dimm text-[16px]">{props.title}</p>
            <p className="textcol-main text-[25px] font-semibold">{!props.textValue ? ratingSymbols[ratingNameKey] : props.textValue}</p>
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

    if (!data?.game_id) {
        return (
            <p className="w-full max-w-[1000px] mx-auto bg-dimm h-[34px] flex items-center justify-center textcol-main">Game review not found :/</p>
        )
    }


    function ScoreGrid() {
        return (
            <div className="grid k:grid-cols-3 k:grid-rows-[repeat(4,50px)] w-full gap-[5px] h-[430px] k:gap-[10px] 
            grid-cols-[repeat(2,minmax(270px,1fr))] grid-rows-[repeat(6,50px)] overflow-x-auto">
                <DataBlock title={"Graphics"} value={data?.graphics_score || 0} />
                <DataBlock title={"Sound Design"} value={data?.sound_score || 0} />
                <DataBlock title={"Gameplay"} value={data?.gameplay_score || 0} filter="brightness-[120%]" />
                <DataBlock title={"Level Design"} value={data?.level_score || 0} filter="saturate-[80%]" />
                <DataBlock title={"Balance"} value={data?.balance_score || 0} filter="brightness-[110%]" />
                <DataBlock title={"Story/Narrative"} value={data?.story_score || 0} />
                <DataBlock title={"Performance"} value={data?.performance_score || 0} filter="brightness-[115%]" />
                <DataBlock title={"Originality"} value={data?.original_score || 0} />
                <DataBlock title={"Customization"} value={data?.customization_score || 0} />
                <DataBlock title={"Microtransactions"} value={data?.microtransactions_score || 0} />
                <DataBlock title={"Support"} value={data?.support_score || 0} filter="saturate-[115%]" />
                <DataBlock title={"Total Score"} textValue={`${data?.total_score || 0}/100`} value={0} color="bg-mid" />
            </div>
        )
    }


    function MobileLayout() {
        if (!data) return;

        return (
            <span className="k:hidden flex">
                <div className="w-full max-w-[1000px] mx-auto flex-col items-center flexgap">
                    <div className="w-full h-[34px] flexgap">
                        <p className="px-[20px] textcol-main text-[18px] bg-mid flex items-center justify-center font-semibold">{data.game_name}</p>
                        <p className="px-[20px] textcol-dimm text-[16px] bg-dimm flex items-center justify-center">{data.date && new Date(data.date).toDateString()}</p>
                        <p className="px-[10px] textcol-dimm text-[18px] bg-mid flex items-center flex-auto justify-end">{data.username}</p>
                    </div>

                    <Image src={data.game_image || ""} alt={`${data.game_name} image`} width={400} height={200} className="w-full h-[200px] object-cover" />

                    <div className=" w-full flexgap h-fit overflow-hidden">
                        <div className="flexgap flex-col flex-auto">
                            <div className="flex flexgap h-[60px]">
                                <DataBlock title={"Hours Played"} value={data.hours_spent} textValue={data.hours_spent} />
                                <DataBlock title={"Game Completed"} textValue={data.finished ? "Yes" : "No"} value={0} />
                            </div>
                            <div className="w-full h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto flex-col justify-between">
                                <p className="w-full max-h-[120px] overflow-y-auto textcol-main">{data.user_comment}</p>
                                <p className="textcol-dimm">Comment</p>
                            </div>
                        </div>
                    </div>

                    <ScoreGrid />
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
                        <p className="px-[20px] textcol-main text-[18px] bg-mid flex items-center justify-center font-semibold">{data.game_name}</p>
                        <p className="px-[20px] textcol-dimm text-[16px] bg-dimm flex items-center justify-center">{data.date && new Date(data.date).toDateString()}</p>
                        <p className="px-[10px] textcol-dimm text-[18px] bg-mid flex items-center flex-auto justify-end">{data.username}</p>
                    </div>

                    <div className=" w-full flexgap h-full max-h-[250px] overflow-hidden">
                        <Image src={data.game_image || ""} alt={`${data.game_name} image`} width={400} height={250} className="w-full h-full max-w-[400px] max-h-[250px] object-cover" />

                        <div className="flexgap flex-col flex-auto">
                            <div className="flex flexgap h-[60px]">
                                <DataBlock title={"Hours Played"} value={data.hours_spent} textValue={data.hours_spent} />
                                <DataBlock title={"Game Completed"} textValue={data.finished ? "Yes" : "No"} value={0} />
                            </div>
                            <div className="w-full  h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto flex-col justify-between">
                                <p className="w-full max-h-[155px] overflow-y-auto textcol-main">{data.user_comment}</p>
                                <p className="textcol-dimm">Comment</p>
                            </div>
                        </div>
                    </div>

                    <ScoreGrid />
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