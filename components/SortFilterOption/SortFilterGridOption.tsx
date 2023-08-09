"use client"

import { SortFilterDropdowns, clearOptions, toggleOption } from "@/store/features/sortFilter"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";

export default function SortFilterGridOption(props:{
    title:string,
    icon:string,
    dropdownName:keyof SortFilterDropdowns,
    singlePick?:boolean,
}){

    const sortFilterSelector = useAppSelector((state:RootState) => state.sortFilter);
    const diapatch = useAppDispatch();
    let optionToggled= sortFilterSelector.dropdowns[props.dropdownName].selectedItems.includes(props.title);

    function toggleDropdownOption(){
        if(props.singlePick){
            diapatch(clearOptions(props.dropdownName));
        }

        diapatch(toggleOption({
            key: props.dropdownName,
            value: props.title
        }))
    }

    return(
        <div className={`w-full h-[45px] bg-dimm flex items-center justify-between p-[10px] 
        ${optionToggled && "bg-hi"}
        `}
        onClick={toggleDropdownOption}
        role="button"
        tabIndex={0}
        >
            <p className="textcol-main">{props.title}</p>
            <Image src={props.icon} alt={props.title} width={22} height={22} className="opacity-70 w-[22px] h-[22px]" />
        </div>
    )
}