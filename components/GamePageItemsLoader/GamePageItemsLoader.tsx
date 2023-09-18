"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function GamePageItemsLoader() {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });
    const [isBusy, setIsBusy] = useState(false);
    
    useEffect(() => {
        if(inView && !isBusy) {
            setIsBusy(true);
            alert("LOAD");
        }
    },[inView]);
    
    return (
        <Image ref={ref} src={"/Loading-pulse.gif"} alt={"loading animation"} width={60} height={30} />
    )
}