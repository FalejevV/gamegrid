"use client"

import { useState } from "react";


function FloatingVideoButton(props: {
    position: string
}) {

}

export default function GameVideo(props: {
    videoId: string | null,
    position: string
}) {
    if (!props.videoId) return;
    
    const [videoToggle, setVideoToggle] = useState(false);

    function FloatingVideoButton() {
        return (
            <div className={"absolute w-fit h-fit bg-hi saturate-[75%] bordercol-gray k:border-[10px] border-[5px] pten cursor-pointer select-none group " + props.position} onClick={() => setVideoToggle(prev => !prev)}>
                <p className="textcol-main group-hover:scale-105 transition-all duration-200">{videoToggle ? "Stop" : "Play"} Video</p>
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
                    <p className="textcol-main text-center font-bold flex items-center justify-center w-full h-[50px] bg-hi">THIS IS A TEST VIDEO</p>
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
