import { IGDBGameFetch } from "@/interface";
import { GameCreationGameInfo } from "@/store/features/gameCreation";
import { toCoverLargeFormat } from "@/utils/formatter";
import Image from "next/image";




export default function GamePickPreview(props:{
    game:GameCreationGameInfo
}){
    return(
        <div className="w-full h-fit flex flex-col ">
            <p className="p-[10px] bg-dimm saturate-150 textcol-main text-[20px] font-semibold text-center">{props.game.name}</p>
            <Image src={toCoverLargeFormat(props.game.image)} alt={""} width={1000} height={350} className="w-full max-w-[1000px] k:h-[350px] max-h-[350px] object-cover h-[150px]"/>
        </div>
    )
}