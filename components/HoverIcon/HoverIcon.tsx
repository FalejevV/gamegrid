"use client"
import Image from "next/image"
import { useState } from "react"


export default function HoverIcon(props: {
    icon?: string,
    hoverText: string
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="relative w-full h-full max-w-[50px] max-h-[50px] z-[1000] cursor-default" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Image src={props.icon || "/icons/exclamation.svg"} alt={"Hover text"} width={50} height={50} className="w-full h-full max-w-[50px] max-h-[50px] bg-hi p-[2px]"/>
            {hovered &&
                <p className="absolute left-0 top-0 bg-hi p-[10px] textcol-main font-semibold w-screen max-w-[200px]">
                    {props.hoverText}
                </p>
            }
        </div>
    )
}