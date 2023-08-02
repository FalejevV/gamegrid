"use client";

import { SortFilterDropdowns, clearOptions, toggleOption } from "@/store/features/sortFilter";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"




export default function SortFilterListOption(props:{
    title:string,
    dropdownName:keyof SortFilterDropdowns
    singlePick?:boolean
}){
    const sortFilterSelector = useAppSelector((state:RootState) => state.sortFilter);
    const dispatch = useAppDispatch();

    function Indicator(){
        let optionToggled= sortFilterSelector.dropdowns[props.dropdownName].selectedItems.includes(props.title);
        return(
            <div className={`bg-dimm w-[25px] h-[25px]
            ${optionToggled && "bg-hi"}`}/>
        )
    }
    function toggleDropdownOption(){
        if(props.singlePick){
            dispatch(clearOptions(props.dropdownName));
        }

        dispatch(toggleOption({
            key: props.dropdownName,
            value: props.title
        }))
    }

    return(
        <div className={`w-full h-full bg-transparent flex justify-between items-center`}
        onClick={toggleDropdownOption}
        role="button"
        tabIndex={0}
        >
            <p className="textcol-main">{props.title}</p>
            {Indicator()}
        </div>
    )
}