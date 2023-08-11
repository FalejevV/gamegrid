"use client"

import { dateToText } from "@/utils/formatter";
import Image from "next/image"

export default function GameSearchItem(props:{
    image:string,
    name:string,
    date:number
}){
    if(!props.image) return;
    const date = dateToText(props.date) 
    return(
        <div role="button" className="w-full h-[60px] flex items-center gap-[15px]">
            <Image src={"https:"+props.image} width={60} height={60} className="h-[60px] w-[60px] object-contain" alt={props.image + "image"}/>
            <p className="text-[18px] textcol-main">{props.name}</p>
            <p className="textcol-dimm text-[16px]">{date}</p>
        </div>
    )
}