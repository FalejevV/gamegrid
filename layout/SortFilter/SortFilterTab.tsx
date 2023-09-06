"use client"

import { SortFilterDropdowns, clearAllOptions, sortFilterExpand } from "@/store/features/sortFilter";
import { useAppDispatch, useAppSelector } from "@/store/store"
import SortFilterButton from "@/components/SortFilterButton/SortFilterButton";
import TagsFilterDropdown from "./TagsFilterDropdown";
import { useEffect, useState } from "react";
import { getTableList } from "@/utils/tableFetching";
import supabaseClient from "@/utils/supabaseClient";
import { convertToFancyScores } from "@/utils/scoreName";
import PlatformFilterDropdown from "./PlatformFilterDropdown";
import PlayersFilterDropdown from "./PlayersFilterDropdown";
import DeveloperFilterDropdown from "./DeveloperFilterDropdown";
import OrderByDropdown from "./OrderByDropdown";
import { generateSortFilterParams } from "@/utils/queryParams";
import Link from "next/link";
import SortFilterQueryReader from "@/components/SortFilterQueryReader/SortFilterQueryReader";
import { nanoid } from "nanoid";


export default function SortFilterTab(){
    const sortFilterSelector = useAppSelector((state) => state.sortFilter);
    const dispatch = useAppDispatch();

    const [tagOptions, setTagOptions] = useState<string[]>([]);
    const [platformOptions, setPlatformOptions] = useState<string[]>([]);
    const [playerOptions, setPlayerOptions] = useState<string[]>([]);
    const [aspectOptions, setAspectOptions] = useState<string[]>([]);
    const [developerOptions, setDeveloperOptions] = useState<string[]>([]);


    useEffect(() => {
            getTableList(supabaseClient, "Tag").then(res => setTagOptions(res.data || []));
            getTableList(supabaseClient, "Platform").then(res => setPlatformOptions(res.data || []));
            getTableList(supabaseClient, "Player").then(res => setPlayerOptions(res.data || []));
            getTableList(supabaseClient, "Aspect").then(res => setAspectOptions(convertToFancyScores(res.data || [])));
            getTableList(supabaseClient, "Developer").then(res => setDeveloperOptions(res.data || []));
        }
    ,[]);

    

    function isFilteringSelected(){
        let filterKeys = Object.keys(sortFilterSelector.dropdowns) as (keyof SortFilterDropdowns)[];
        let filteringFound = false;
        filterKeys.forEach((key:keyof SortFilterDropdowns) => {
            if(filteringFound) return;
            // If dropdown filter has items in array or it is different that default value
            if(sortFilterSelector.dropdowns[key].selectedItems.length > 0 && sortFilterSelector.dropdowns[key].selectedItems[0] !== sortFilterSelector.dropdowns[key].defaultValue[0]){
                filteringFound = true;
            }
        })
        return filteringFound;
    }

    function ClearFiltersButton(){
        return(
            <Link href="games" className="bg-mid px-[10px] py-[5px]" onClick={() => dispatch(clearAllOptions())}>
                Clear
            </Link>
        )
    }

    function SearchFilterButton(){
        return(
            <Link className="bg-hi px-[10px] py-[5px]" href={generateSortFilterParams(sortFilterSelector, "games")}>
                Search!
            </Link>
        )
    }


    function TagFilter(){
        return(
            <div className="tab-tags relative">
                <SortFilterButton doCount title={"Tags"} dropdownName={"tags"} />
                {sortFilterSelector.dropdowns.tags.isDropdown && 
                <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-[500px] bg-mid z-[500]">
                    <TagsFilterDropdown itemList={tagOptions} />
                </div>}
            </div>
        )
    }

    function PlatformFilter(){
        return(
            <div className="tab-platforms relative">
                <SortFilterButton doCount title={"Platform"} dropdownName={"platforms"} />
                {sortFilterSelector.dropdowns.platforms.isDropdown && 
                <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-[350px] bg-mid z-[500]">
                    <PlatformFilterDropdown itemList={platformOptions} />
                </div>}
            </div>
        )
    }

    function PlayerFilter(){
        return(
            <div className="tab-players relative">
                <SortFilterButton mimicTitle title={"Players"} dropdownName={"players"} />
                {sortFilterSelector.dropdowns.players.isDropdown && 
                <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-fit bg-mid z-[500]">
                    <PlayersFilterDropdown itemList={playerOptions} />
                </div>}
            </div>
        )
    }

    function DeveloperFilter(){
        return(
            <div className="tab-developer relative">
                <SortFilterButton mimicTitle title={"Company"} dropdownName={"developer"} />
                {sortFilterSelector.dropdowns.developer.isDropdown && 
                <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-[300px] bg-mid z-[500]">
                    <DeveloperFilterDropdown itemList={developerOptions} />
                </div>}
            </div>
        )
    }

    function SortByTab(){
        return(
            <div className="tab-order relative">
                <SortFilterButton mimicTitle title={"Order by"} dropdownName={"order"} />
                {sortFilterSelector.dropdowns.order.isDropdown && 
                <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-[500px] bg-mid z-[500] overflow-y-scroll">
                    <OrderByDropdown  itemList={aspectOptions} />
                </div>}
            </div>
        )
    }


    function AdvancedSearchWindowPC(expand:boolean){
        return(
            <div className={`w-full relative flex items-center justify-between transition-all duration-300
                ${expand && "h-[60px] opacity-100 overflow-visible"}
                ${!expand && "h-[0px] opacity-0 overflow-hidden"}
            `}>
                {TagFilter()}
                {PlatformFilter()}
                {PlayerFilter()}
                {DeveloperFilter()}
            </div>
        )
    }

    function MainRowPC(){
        return(
            <div className={`w-full h-[60px] flex items-center gap-[10px] textcol-main`}>
                <button className={`${sortFilterSelector.expand && "textcol-dimm"}`} onClick={() => dispatch(sortFilterExpand(!sortFilterSelector.expand))}>Advanced Search</button>
                {isFilteringSelected() && ClearFiltersButton()}
                {isFilteringSelected() && SearchFilterButton()}
                <div className="flex-auto"/>
                {SortByTab()}
            </div>
        )
    }

    return(
        <>
            <SortFilterQueryReader />
            <div className={`w-full max-w-[1000px] h-fit bg-dimm p-[10px]`}>
                {MainRowPC()}
                {AdvancedSearchWindowPC(sortFilterSelector.expand)}
            </div>
        </>
    )
}