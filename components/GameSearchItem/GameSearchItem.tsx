"use client"

import { IGDBGameFetch } from "@/interface";
import { dateToText } from "@/utils/formatter";
import Image from "next/image"

export default function GameSearchItem(props:{
    gameData:IGDBGameFetch,
    pickAGame:Function
}){
    if(!props.gameData.cover.url) return;
    const date = dateToText(props.gameData.first_release_date) 
    return(
        <div role="button" className="w-full h-[60px] flex items-center gap-[15px] bg-dimm hover:brightness-125 pr-[10px]" onClick={() => props.pickAGame(props.gameData)}>
            <Image src={"https:"+props.gameData.cover.url} width={60} height={60} className="h-[60px] w-[60px] object-contain" alt={props.gameData.name + "image"}/>
            <p className="text-[18px] textcol-main flex-auto">{props.gameData.name}</p>
            <p className="textcol-dimm text-[16px]">{date}</p>
        </div>
    )
}