"use client"

import Image from "next/image";
import { useState } from "react";


function FloatingVideoButton(props: {
    position: string
}) {

}

export default function GameVideo(props: {
    videoId: string | undefined,
    position: string
}) {
    if (!props.videoId) return;

    const [videoToggle, setVideoToggle] = useState(false);

    function FloatingVideoButton() {
        return (
            <div className={`absolute w-fit h-fit bg-hi saturate-[75%] bordercol-gray k:border-[10px] border-[5px] pten cursor-pointer select-none group brightness-100 hover:brightness-110 transition-all duration-200 ${props.position}`} onClick={() => setVideoToggle(prev => !prev)}>
                <div className="flexgap items-center justify-center">
                    <Image src={`/icons/${videoToggle ? "stop" : "play"}.svg`} alt={`${videoToggle ? "stop" : "play"} trailer`} width={20} height={20} className="w-[20px] h-[20px] invert opacity-[30%]" />
                    <p className="textcol-main">Video</p>
                </div>
            </div>
        )
    }

    if (!videoToggle) {
        return (
            <FloatingVideoButton />
        )
    }

    return (
        <div>
            <FloatingVideoButton />
            <div className="w-full sm:h-[350px] h-[250px] flexgap items-center justify-center flexgap flex-col">
                <iframe
                    src={`https://www.youtube.com/embed/${props.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full bg-dimm"
                />
            </div>
        </div>
    )
}
