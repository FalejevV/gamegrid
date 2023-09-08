"use client"
import { SortFilterDropdowns } from "@/store/features/sortFilter";
import { setMobileFilterSelected } from "@/store/features/window";
import { useAppDispatch } from "@/store/store"
import Image from "next/image"



export default function MobileFilterButton(props:{
    title:string,
    type: keyof SortFilterDropdowns | ""
}){
    const dispatch = useAppDispatch();
    return(
        <button className="flex items-center justify-between" onClick={() => dispatch(setMobileFilterSelected(props.type))}>
            <p className="textcol-main text-[20px] font-medium">{props.title}</p>
            <Image src={"/icons/Chevron-right.svg"} width={25} height={25} alt={`${props.title} icon`} className="w-[25px] h-[25px]" />
        </button>
    )
}