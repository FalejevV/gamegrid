"use client"

import FilterTab from "@/components/FilterTab/FilterTab";
import SortFilterQueryLink from "@/components/SortFilterQueryLink/SortFilterQueryLink";
import SortTab from "@/components/SortTab/SortTab";
import { SortFilterDropdowns, clearAllOptions, sortFilterExpand, toggleAllDropdowns } from "@/store/features/sortFilter";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { testAspects, testPlatform, testPlayers, testTags } from "@/testDatabase";
import { generateSortFilterParams } from "@/utils/queryParams";
import Router, { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export default function SortFilterTab(){

    const dispatch = useAppDispatch();
    const sortFilterSelector = useAppSelector((state:RootState) => state.sortFilter);
    const windowWidthSelector = useAppSelector((state:RootState) => state.window.width);
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    
    function ExpadedRowPC(){
        return(
            <div className="w-full flex flex-col gap-[10px]">
                <div className="w-full h-[60px] flex items-center justify-between">
                    <FilterTab title="tags" content={testTags} isSearch/>
                    <FilterTab title="platform" content={testPlatform}/>
                    <FilterTab title="players" content={testPlayers}/>
                    <FilterTab title="aspects" content={testAspects} isSearch/>
                </div>

                <div className="w-full h-[60px] flex items-center justify-between">
                    <SortFilterQueryLink />
                </div>
            </div>
        )
    }

    function ExpadedRowTabletMobile(){
        return(
            <div className="sm:w-[calc(100%-90px)] 
            w-full flex flex-col gap-[10px] h-[90vh] max-h-[400px] bg-gray fixed right-0 bottom-0 z-[41] border-t-[5px] bordercol-hi">
                <div className="fixed w-full bottom-[400px] bg-gray opacity-70 h-[100vh]" onClick={() => toggleExpand(false)}>

                </div>
            </div>
        )
    }

    function toggleExpand(value:boolean){
        dispatch(sortFilterExpand(value));
        dispatch(toggleAllDropdowns(false))
    }

    function isFilterSelected(){
        //@ts-ignore
        const keys: (keyof SortFilterDropdowns)[] = Object.keys(sortFilterSelector.dropdowns);
        let selected = false;
        keys.forEach((key: keyof SortFilterDropdowns) => {
            if(key !== "sort"){
                if(sortFilterSelector.dropdowns[key].selectedItems > sortFilterSelector.dropdowns[key].defaultValue){
                    selected = true;
                }
            }
        })
        return selected;
    }

    useEffect(() => {
        if(!loaded){
            setLoaded(true);
            return;
        }

        let button = document.querySelector("#sortFilterSearchButton") as HTMLButtonElement;
        if (button){
            button.click();
        }
        
    },[sortFilterSelector.dropdowns.sort.selectedItems]);

    function MainRow(){
        return(
            <div className="w-full h-[60px] flex items-center justify-between">
                <div className="flex items-center gap-[25px] pl-[10px]">
                    <button onClick={() => toggleExpand(!sortFilterSelector.expand)} className={`bg-transparent textcol-main whitespace-nowrap ${sortFilterSelector.expand && "opacity-50"}`}>Advanced Search</button>
                    {isFilterSelected() && <button onClick={() => dispatch(clearAllOptions())} className="bg-transparent textcol-main whitespace-nowrap opacity-75">Clear</button>}
                </div>
                <SortFilterQueryLink invisible={true}/>
                <SortTab content={["New First", "Old First", "Most Rated", "Least Rated"]} title="sort"/>
            </div>
        )
    }

    return(
        <div className={`w-full max-w-[950px] h-fit bg-dimm flex flex-col px-[10px] items-center justify-between transition-all duration-300`}>
        
        {sortFilterSelector.expand && windowWidthSelector > 880 && ExpadedRowPC()}
        {sortFilterSelector.expand && windowWidthSelector < 880 && ExpadedRowTabletMobile()}

        {MainRow()}
        

            
        </div>
    )
}