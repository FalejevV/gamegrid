import { GameReviewSample } from "@/interface"
import { dateToText } from "@/utils/formatter"
import Link from "next/link"
import InfoLine from "../ProfileInfoLine/ProfileInfoLine"
import Image from "next/image"



export default function GameReviewSampleItem(props: {
    game: GameReviewSample,
    oddColor: boolean
}) {
    return (
        <Link href={`/review/${props.game.profile.user_id}/${props.game.game_id}`} className={`w-full flexgap flex-col sm:flex-row ${props.oddColor ? "saturate-[70%]" : "saturate-100"}
         hover:brightness-110 hover:saturate-100 transition-all duration-200`}>

            <div className="flexgap flex-col flex-auto sm:min-w-[350px]">
                <div className="flexgap justify-between pten bg-dimm flex-auto saturate-[125%]">
                    <p className="textcol-main flex items-center justify-center text-[17px] font-medium">{props.game.profile.username}</p>
                    <p className="textcol-dimm flex items-center justify-center">{dateToText(new Date(props.game.date).valueOf() / 1000)}</p>
                </div>
                <div className="flexgap">
                    <Image src={props.game.finished ? "/icons/Check.svg" : "/icons/Close.svg"} alt={"Finish status icon"} width={25} height={25} className={`w-[35px] h-[35px] bg-dimm p-[5px] 
                    ${props.game.finished ? "brightness-100" : "brightness-[70%]"}`} />

                    <InfoLine text={`Score ${props.game.total_score}`} addClass="textcol-dimm bg-dimm" />
                    <InfoLine text={`Hours ${props.game.hours_spent}`} addClass="textcol-dimm bg-dimm" />
                </div>
            </div>
            <div className="relative flex-auto w-full sm:max-w-[500px] overflow-hidden bg-dimm pten max-h-[100px] h-screen">
                <p className="textcol-dimm">
                    {props.game.user_comment}
                </p>
                <span className="w-full h-[50px] listgradient absolute left-0 bottom-0"/>
            </div>
        </Link>
    )
}