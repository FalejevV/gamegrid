"use client"

import Image from "next/image"
import SortFilterOption from "../SortFilterOption/SortFilterOption";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { SortFilterDropdowns, clearOptions, toggleAllDropdowns, toggleOption } from "@/store/features/sortFilter";
import { toggleDropdown } from "@/store/features/sortFilter";
import SortFilterSearch from "../FilterSearch/FilterSearch";
import { useMemo, useState } from "react";
import OutClickListener from "../OutClickListener/OutClickListener";



export default function SortFilterItem(props:{
    title:keyof SortFilterDropdowns,
    content:string[],
    isSearch?:boolean
}){
    
    const filterDrowdownSelector = useAppSelector((state:RootState) => state.sortFilter.dropdowns[props.title])
    const dispatch = useAppDispatch();
    const [searchValue,setSearchValue] = useState("");
    
    function switchOption(value:string){
        dispatch(toggleOption({
            key: props.title,
            value
        }))
    }

    // function to display dropdown options.
    // If search input is empty = show all
    // Else = filter options that fit the search
    const getFilterOptionsMemo = useMemo(() => {
        if(props.content.length === 0) return "Loading..."

        if(props.isSearch && searchValue.trim() !== ""){
            return props.content.map((option) =>  {
                if(option.toLowerCase().includes(searchValue.trim().toLowerCase())){
                    return <SortFilterOption key={option} title={option} checked={filterDrowdownSelector.selectedItems.includes(option)} switchOption={switchOption}/>
                }
            })
        }

        {/* 
        // if user selected some options, float them to the top of list, to summarise the selected options
        if(filterDrowdownSelector.selectedItems.length > 0){
            let resultArray:React.ReactElement[] = [];
            props.content.forEach((option) => {
                if(filterDrowdownSelector.selectedItems.includes(option)){
                    resultArray.push(<SortFilterOption key={option} title={option} checked={filterDrowdownSelector.selectedItems.includes(option)} switchOption={switchOption}/>)
                }
            })

            props.content.forEach((option) => {
                if(!filterDrowdownSelector.selectedItems.includes(option)){
                    resultArray.push(<SortFilterOption key={option} title={option} checked={filterDrowdownSelector.selectedItems.includes(option)} switchOption={switchOption}/>)
                }
            })

            return resultArray
        }

        */}

        // default options display if nothins is selected/searched
        return props.content.map((option) =>  <SortFilterOption key={option} title={option} checked={filterDrowdownSelector.selectedItems.includes(option)} switchOption={switchOption}/>)
    },[searchValue, props.content, filterDrowdownSelector.selectedItems])


    function Dropdown(){
        return(
            <div className={`${"tab-"+props.title} w-[250px] h-fit max-h-[250px] flex-col absolute left-[-35px] top-[50px] z-50 p-[10px] bg-mid shadow-lg
                ${props.content.length > 6 && "overflow-y-scroll"}
                ${filterDrowdownSelector.selectedItems.length >= 3 && "brightness-75"}
            `}>
                <OutClickListener target={props.title} />
                {props.isSearch && <SortFilterSearch searchValue={searchValue} setSearchValue={setSearchValue} />}
                {getFilterOptionsMemo}
            </div>
        )
    }

    function clearSelectedOptions(){
        dispatch(clearOptions(props.title));
    }

    function switchDropdown(e:React.MouseEvent){
        // if clear svg pressed, do not close dropdown, just clear all options state.
        let target = e.target as HTMLElement;
        if(target.className.includes("clearoptions")){
            clearSelectedOptions();
            return;
        }
        
        dispatch(toggleDropdown({
            key: props.title,
            value: !filterDrowdownSelector.isDropdown
        }))
    }

    return(
        <div className={`${"tab-"+props.title}  w-full max-w-[185px] h-[40px] flex items-center justify-between bg-mid cursor-pointer relative select-none`}>
            <div className="w-full h-full flex justify-between items-center px-[10px] pr-[15px]" onClick={(e) => switchDropdown(e)}>
                <p className="textcol-main capitalize">
                    {props.title}
                    {filterDrowdownSelector.selectedItems.length > 0 && ` (${filterDrowdownSelector.selectedItems.length})`}
                </p>
                    

                {filterDrowdownSelector.selectedItems.length > 0 &&
                    <Image src={"/icons/Close.svg"} alt={"close"} width={30} height={30} className="w-[30px] h-[30px] absolute right-[30px] p-[7px] hover:scale-[120%] transition-all duration-150 clearoptions" onClick={clearSelectedOptions}/>
                }

                <Image src={"/icons/Chevron-down.svg"} alt={"down arrow"} width={15} height={9} className="w-[15px] h-[9px]"/>
            </div>


            {filterDrowdownSelector.isDropdown && Dropdown()}            
        </div>
    )
}