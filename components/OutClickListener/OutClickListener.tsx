"use client"
import { SortFilterDropdowns, toggleAllDropdowns, toggleDropdown } from "@/store/features/sortFilter";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";


export default function OutClickListener(props:{
    target:keyof SortFilterDropdowns
}){
    
    const dispatch = useAppDispatch()
    function clickHandler(e:MouseEvent){
        let target = e.target as HTMLElement;
        if(!target.closest(".tab-"+props.target)){
            dispatch(toggleAllDropdowns(false));
        }
    }

    function touchHandler(e:TouchEvent){
        let target = e.target as HTMLElement;
        if(!target.closest(".tab-"+props.target)){
            dispatch(toggleAllDropdowns(false));
        }
    }

    useEffect(() => {
        document.addEventListener("mouseup", clickHandler)
        document.addEventListener("touchend", touchHandler)

        return () => {
            document.removeEventListener("mouseup", clickHandler)
            document.removeEventListener("touchend", touchHandler)
        }
    })

    return(<></>)
}