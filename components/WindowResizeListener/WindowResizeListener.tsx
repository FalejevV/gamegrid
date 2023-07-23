"use client"

import { setWidth } from "@/store/features/window";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export default function WindowResizeListener(){

    
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        dispatch(setWidth(window.innerWidth));
        
        addEventListener("resize", (e) => {
        dispatch(setWidth(window.innerWidth));
        })

        return(() => {
            removeEventListener("resize", (e) => {
            dispatch(setWidth(window.innerWidth));
            })
        })
    },[])

    return( <></> )
}