"use client"

import { SortFilterDropdowns, clearOptions, toggleAllDropdowns, toggleDropdown } from "@/store/features/sortFilter";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";



export default function SortFilterButton(props:{
    title:string,
    doCount?:boolean,
    dropdownName:keyof SortFilterDropdowns,
    mimicTitle?:boolean
}){
    
    const dispatch = useAppDispatch();
    const sortFilterDropdownSelector = useAppSelector((state :RootState) => state.sortFilter.dropdowns[props.dropdownName]);
    function switchDropdown(){
        dispatch(toggleAllDropdowns(false));
        dispatch(toggleDropdown({
            key: props.dropdownName,
            value: !sortFilterDropdownSelector.isDropdown
        }))
    }
    function isSomethingSelected(){
        return sortFilterDropdownSelector.selectedItems.length > 0 && sortFilterDropdownSelector.selectedItems[0] != sortFilterDropdownSelector.defaultValue[0];
    }

    function clearAllOptions(e:React.MouseEvent){
        e.stopPropagation();
        dispatch(clearOptions(props.dropdownName));
    }

    function titleContentDisplay(){
        if(!props.mimicTitle){
            if(isSomethingSelected() && props.doCount){
                return `${props.title} (${sortFilterDropdownSelector.selectedItems.length})`
            }
        }
        if(props.mimicTitle){
            if(isSomethingSelected()){
                return sortFilterDropdownSelector.selectedItems[0]
            }
        }
        return props.title;
    }
    return(
        <div role="button" tabIndex={0}
        className={`w-screen max-w-[185px] h-[40px] bg-mid flex items-center justify-between p-[10px] gap-[10px] whitespace-nowrap`}
        onClick={switchDropdown}
        >
            <p className="textcol-main flex-auto max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis" >
                {titleContentDisplay()}
            </p>
            {isSomethingSelected() && <Image src={"/icons/Close.svg"} alt={"clear options"} width={14} height={14}  className="transition-all duration-150 hover:scale-110 w-[16px] h-[16px]" onClick={(e) => clearAllOptions(e)}/>}
            <Image src={"/icons/Chevron-down.svg"} alt={"down arrow"} width={15} height={10} className="w-[15px] h-[10px]" />
        </div>
    )
}