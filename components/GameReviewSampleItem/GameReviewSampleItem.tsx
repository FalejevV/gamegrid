import { GameReviewSample } from "@/interface"
import Link from "next/link"



export default function GameReviewSampleItem(props: {
    game: GameReviewSample,
    oddColor: boolean
}) {
    return (
        <Link href={`/review/${props.game.profile.user_id}/${props.game.game_id}`} className="w-full flexgap h-[50px]">
            <div className="flexgap flex-col bg-dimm flex-auto">
                <p className="textcol-main flex items-center justify-center">{props.game.profile.username}</p>
            </div>
            <p className="textcol-dimm bg-dimm pten">
                {props.game.user_comment}
            </p>
        </Link>
    )
}