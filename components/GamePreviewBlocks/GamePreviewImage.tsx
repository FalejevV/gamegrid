"use client"

import Image from "next/image";

export default function GamePreviewImage(props:{
    wfull?:boolean
    src:string,
}){
    return(
        <div className={`w-[400px] h-[256px] relative ${props.wfull && "w-full"}`}>
            <Image className="h-full w-full object-cover brightness-90 transition-all duration-300 top-0 absolute z-20
            "
            width={400} height={256}  src={props.src} alt={"game image"} />
        </div>
    )
}