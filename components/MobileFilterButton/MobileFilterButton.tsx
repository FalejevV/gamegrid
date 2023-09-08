"use client"
import { SortFilterDropdowns } from "@/store/features/sortFilter";
import { setMobileFilterSelected } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import Image from "next/image"



export default function MobileFilterButton(props:{
    title:string,
    type: keyof SortFilterDropdowns | ""
}){
    const dispatch = useAppDispatch();
    const sortFilterSelector = useAppSelector((state:RootState) => state.sortFilter);
    
    return(
        <button className="flex items-center justify-between" onClick={() => dispatch(setMobileFilterSelected(props.type))}>
            <div className="flex-auto textcol-main text-[20px] font-medium flex gap-[20px]">
                <p className="text-left flex-auto">{props.title}</p> 
                <p>{props.type !== "" && sortFilterSelector.dropdowns[props.type].selectedItems.length > 0 && `(${sortFilterSelector.dropdowns[props.type].selectedItems.length})` } </p>
            </div>
            <Image src={"/icons/Chevron-right.svg"} width={25} height={25} alt={`${props.title} icon`} className="w-[25px] h-[25px]" />
        </button>
    )
}