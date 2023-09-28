import { UserReviewSample } from "@/interface";
import Link from "next/link";
import Image from "next/image";
import ProfileInfoLine from "../ProfileInfoLine/ProfileInfoLine";

export default function GamePreviewSampleItem(props: {
    review: UserReviewSample,
    userId: number,
    maxWidth?:boolean,
    highlight?:boolean
}) {
    if (!props?.review?.game.id || !props?.review?.total_score) return;
    return (
        <Link href={`/review/${props.userId}/${props.review.game.id}`} className={`${!props.maxWidth ? "flex-auto" : "sm:max-w-[500px]"} min-w-[290px] max-w-[600px] w-full flexgap flex-col hover:brightness-110 transition-all duration-150`}>
            <ProfileInfoLine text={props.review.game.name} addClass={`${props.highlight ? "bg-mid" : "bg-dimm"}`}/>
            <Image src={props.review.game.image} alt={`${props.review.game.name} image`} width={450} height={150} className="w-full max-w-[600px] h-[150px] object-cover" />
            <div className="flexgap">
                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] flex-auto">
                    <p className="textcol-dimm">Hours</p>
                    <p className="textcol-main">{props.review.hours_spent}</p>
                </div>

                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] flex-auto">
                    <p className="textcol-dimm">Score</p>
                    <p className="textcol-main">{props.review.total_score}/100</p>
                </div>
            </div>
            <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px]">
                <p className="textcol-dimm">Completed</p>
                <p className="textcol-main">{props.review.finished ? "Yes" : "No"}</p>
            </div>

        </Link>
    )
}

