"use client"

import Image from "next/image";

export default function GamePreviewImage(props:{
    wfull?:boolean
    src:string,
}){
    return(
        <div className={`sm:w-[450px] w-full h-[256px] relative ${props.wfull && "w-full"}`}>
            <Image className="h-full w-full object-cover brightness-90 transition-all duration-300 top-0 absolute z-20
            "
            width={450} height={256}  src={props.src} alt={"game image"} />
        </div>
    )
}