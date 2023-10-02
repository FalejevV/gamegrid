import { UserReviewSample } from "@/interface"
import Image from "next/image"
import Link from "next/link"



export default function UserReviewListItem(props: {
    game: UserReviewSample,
    oddColor?: boolean
}) {


    function MobileView() {
        return (
            <Link href={`/review/${props.game.public_user_id}/${props.game.game.id}`} className={`md:hidden w-full flex flex-col gapt items-center hover:brightness-110
        ${props.oddColor && "saturate-[70%] hover:saturate-[80%]"}`}>
                <p className="flex-auto bg-mid px-[10px] flex items-center sm:text-[18px] text-[15px] font-medium w-full h-[34px] justify-center">{props.game.game.name}</p>
                <div className="flexgap h-[34px] w-full">
                    <div className="bg-dimm h-full flexgap items-center justify-between px-[10px] flex-auto w-full">
                        <p className="textcol-dimm">Hours</p>
                        <p className="textcol-main">{props.game.hours_spent}</p>
                    </div>
                    <div className="bg-dimm h-full flexgap items-center sm:justify-between px-[10px] flex-auto w-full justify-center">
                        <p className="textcol-dimm sm:block hidden">Score</p>
                        <p className="textcol-main">{props.game.total_score}/100</p>
                    </div>
                    <div className="h-full px-2 flex items-center bg-dimm flexgap justify-between sm:w-full flex-auto] w-[50px]">
                        <p className="textcol-dimm hidden sm:block">Completed</p>
                        {props.game.finished ?
                            <Image src={"/icons/Check.svg"} alt={""} width={25} height={25} className="w-[25px] h-[25px]" />
                            :
                            <Image src={"/icons/Close.svg"} alt={""} width={25} height={25} className="w-[25px] h-[25px]" />
                        }
                    </div>
                </div>
            </Link>
        )
    }

    function PCView() {
        return (
            <Link href={`/review/${props.game.public_user_id}/${props.game.game.id}`} className={`hidden w-full md:flex md:gapt gapt h-[34px] items-center hover:brightness-110
        ${props.oddColor && "saturate-[70%] hover:saturate-[80%]"}`}>
                <p className="flex-auto bg-mid px-[10px] h-full flex items-center text-[18px] font-medium">{props.game.game.name}</p>
                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] min-w-[110px]">
                    <p className="textcol-dimm">Hours</p>
                    <p className="textcol-main">{props.game.hours_spent}</p>
                </div>
                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] w-full max-w-[130px]">
                    <p className="textcol-dimm">Score</p>
                    <p className="textcol-main">{props.game.total_score}/100</p>
                </div>
                <div className="h-full px-2 flex items-center bg-dimm flexgap w-[140px]">
                    <p className="textcol-dimm">Completed</p>
                    {props.game.finished ?
                        <Image src={"/icons/Check.svg"} alt={""} width={25} height={25} className="w-[25px] h-[25px]" />
                        :
                        <Image src={"/icons/Close.svg"} alt={""} width={25} height={25} className="w-[25px] h-[25px]" />
                    }
                </div>
            </Link>
        )
    }

    return (
        <>
            <MobileView />
            <PCView />
        </>
    )
}