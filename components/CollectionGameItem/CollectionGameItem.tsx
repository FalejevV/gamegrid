import { FullGameReviewInfo } from "@/interface"
import { dateToText } from "@/utils/formatter"
import Image from "next/image"
import Link from "next/link"
import GameItemDataBlock from "../GameItemDataBlock/GameItemDataBlock"

function PCTabletLayout(props: {
    game: FullGameReviewInfo
}) {
    return (
        <div className="w-full max-w-[1000px] k:h-[200px] h-[190px] hidden sm:flex hover:brightness-110 transition-all duration-200">
            <div className="flexgap w-full h-full">
                <div className="flexgap flex-auto h-full flex-col">
                    <div className="flexgap max-h-[34px] h-[34px] w-full whitespace-nowrap">
                        <p className="textcol-main h-[100%] bg-mid px-[10px] flex items-center font-semibold text-[20px] flex-auto overflow-x-auto ">{props.game.game_name}</p>
                        <p className="bg-dimm px-[10px] textcol-dimm flex items-center text-[16px] overflow-hidden">{dateToText(new Date(props.game.date).valueOf() / 1000)}</p>
                    </div>

                    <div className="flexgap h-full max-h-[156px] relative">
                        <Image src={props.game.image || ""} alt={`${props.game.game_name} image`} className="w-full max-w-[300px] h-full bg-dimm object-cover" width={300} height={156} />
                        {props.game.finished && <p className="absolute left-0 bottom-0 bg-hi px-[15px] py-[3px] text-[15px] font-semibold">Completed</p>}
                        <div className="flexgap flex-col flex-auto">
                            <div className="flexgap">
                                <GameItemDataBlock title={"Hours"} value={props.game.hours_spent + ""} />
                                <GameItemDataBlock title={"Score"} value={props.game.total_score + " / 100"} color="bg-dimm saturate-[110%]" />
                            </div>
                            <GameItemDataBlock title={"Platform"} value={props.game.platform_name} color="bg-mid" />
                        </div>
                    </div>
                </div>


                <div className="w-full max-w-[370px] h-full bg-mid p-[10px] pb-[3px] text-[16px] font-medium overflow-x-hidden overflow-y-auto hidden summary-lg:flex flex-col justify-between">
                    <p className="w-full max-h-[155px] overflow-y-auto">{props.game.user_comment}</p>
                    <p className="textcol-dimm">Comment</p>
                </div>
            </div>

        </div>

    )
};


function MobileLayout(props: {
    game: FullGameReviewInfo
}) {
    return (
        <div className="w-full max-w-[1000px] sm:hidden flex">
            <div className="flexgap w-full h-full">
                <div className="flexgap flex-auto h-full flex-col">
                    <div className="flexgap max-h-[34px] h-[34px] w-full whitespace-nowrap">
                        <p className="textcol-main h-[100%] bg-mid px-[10px] flex items-center font-semibold text-[20px] flex-auto w-[calc(100vw-20px)] overflow-x-auto">{props.game.game_name}</p>
                    </div>

                    <div className="flexgap flex-col h-full relative">
                        <Image src={props.game.image || ""} alt={`${props.game.game_name} image`} className="w-full h-[156px] bg-dimm object-cover" width={500} height={156} />
                        {props.game.finished && <p className="absolute left-0 top-[131px] bg-hi px-[10px] py-[2px] text-[14px] font-semibold">Completed</p>}
                        <p className="bg-dimm px-[10px] textcol-dimm flex items-center text-[16px] overflow-hidden min-w-fit absolute right-[-5px] top-[127px] bordercol-gray border-[5px]">{dateToText(new Date(props.game.date).valueOf() / 1000)}</p>

                        <div className="flexgap flex-col flex-auto">
                            <div className="flexgap">
                                <GameItemDataBlock title={"Hours"} value={props.game.hours_spent + ""} />
                                <GameItemDataBlock title={"Score"} value={props.game.total_score + " / 100"} color="bg-dimm saturate-[110%]" />
                            </div>
                            <GameItemDataBlock title={"Platform"} value={props.game.platform_name} color="bg-mid" />
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}


export default function CollectionGameItem(props: {
    game: FullGameReviewInfo,
    disabledLink?: boolean
}) {

    if (props.disabledLink) {
        return (
            <>
                <MobileLayout game={props.game} />
                <PCTabletLayout game={props.game} />
            </>
        )
    }
    return (
        <Link href={`review/${props.game.public_user_id}/${props.game.game_id}`}>
            <MobileLayout game={props.game} />
            <PCTabletLayout game={props.game} />
        </Link>
    )
}