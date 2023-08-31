import { FullGameReviewInfo } from "@/interface"
import Image from "next/image"

function GameItemDataBlock(props: {
    title: string,
    value: string,
    color?: string,
}) {
    return (
        <div className={`flex flex-col flex-auto h-[73px] p-[10px] justify-between
            ${props.color ? props.color : "bg-dimm"}
        `}>
            <p className="textcol-main text-[24px] w-full text-right font-semibold">{props.value}</p>
            <p className="textcol-dimm w-full text-[16px]">{props.title}</p>
        </div>
    )
}

export default function CollectionGameItem(props: {
    game: FullGameReviewInfo
}) {
    return (
        <div className="w-full max-w-[1000px] h-[200px]">
            <div className="flex gap-[10px] w-full h-full">
                <div className="flex gap-[10px] flex-auto h-full flex-col">
                    <div className="flex max-h-[34px] h-[34px] w-full gap-[10px]">
                        <p className="textcol-main h-[100%] bg-mid px-[10px] flex items-center font-semibold text-[20px] flex-auto">{props.game.game_name}</p>
                        <p className="bg-dimm px-[10px] textcol-dimm flex items-center text-[16px]">{new Date(props.game.date).toDateString()}</p>
                    </div>

                    <div className="flex h-full max-h-[156px] gap-[10px]">
                        <Image src={props.game.image || ""} alt={`${props.game.game_name} image`} className="w-full max-w-[300px] h-full bg-dimm object-cover" width={300} height={156} />

                        <div className="flex flex-col gap-[10px] flex-auto">
                            <div className="flex gap-[10px]">
                                <GameItemDataBlock title={"Hours"} value={props.game.hours_spent + ""} />
                                <GameItemDataBlock title={"Score"} value={props.game.total_score + " / 100"} color="bg-dimm saturate-[110%]"/>
                            </div>
                            <GameItemDataBlock title={"Platform"} value={props.game.platform_name} color="bg-mid" />
                        </div>
                    </div>
                </div>

                <p className="w-full max-w-[370px] h-full bg-mid p-[10px] text-[16px] font-medium overflow-x-hidden overflow-y-auto">
                    {props.game.user_comment}
                </p>
            </div>
        </div>
    )
}