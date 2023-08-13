import { IGDBGameFetch } from "@/interface";
import { toCoverLargeFormat } from "@/utils/formatter";
import Image from "next/image";




export default function GamePickPreview(props:{
    game:IGDBGameFetch
}){
    return(
        <div className="w-full h-fit border flex flex-col ">
            <p className="p-[10px] bg-dimm textcol-main text-[20px] font-semibold text-center">{props.game.name}</p>
            <Image src={toCoverLargeFormat(props.game.cover.url)} alt={""} width={500} height={350} className="w-full h-full max-h-[350px] object-cover"/>
        </div>
    )
}