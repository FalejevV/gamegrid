"use client"

import { SortFilterDropdowns, clearAllOptions, setAmount, sortFilterExpand } from "@/store/features/sortFilter";
import { useAppDispatch, useAppSelector } from "@/store/store"
import SortFilterButton from "@/components/SortFilterButton/SortFilterButton";
import TagsFilterDropdown from "./TagsFilterDropdown";
import React, { useEffect, useState } from "react";
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
import SortFilterTabMobile from "./SortFilterMobile/SortFilterTabMobile";
import Image from "next/image";
import { isQueryFilterDifferent } from "@/utils/helpers";
import { resetGames } from "@/store/features/games";
import { amountFetch } from "@/utils/config";


export default function SortFilterTab() {
    const sortFilterSelector = useAppSelector((state) => state.sortFilter);
    const dispatch = useAppDispatch();

    const [tagOptions, setTagOptions] = useState<string[]>([]);
    const [platformOptions, setPlatformOptions] = useState<string[]>([]);
    const [playerOptions, setPlayerOptions] = useState<string[]>([]);
    const [aspectOptions, setAspectOptions] = useState<string[]>([]);
    const [developerOptions, setDeveloperOptions] = useState<string[]>([]);
    const [searchActive, setSearchActive] = useState(false);


    useEffect(() => {
        getTableList(supabaseClient, "Tag").then(res => setTagOptions(res.data || []));
        getTableList(supabaseClient, "Platform").then(res => setPlatformOptions(res.data || []));
        getTableList(supabaseClient, "Player").then(res => setPlayerOptions(res.data || []));
        getTableList(supabaseClient, "Aspect").then(res => setAspectOptions(convertToFancyScores(res.data || [])));
        getTableList(supabaseClient, "Developer").then(res => setDeveloperOptions(res.data || []));
    }, []);



    function isFilteringSelected() {
        let filterKeys = Object.keys(sortFilterSelector.dropdowns) as (keyof SortFilterDropdowns)[];
        let filteringFound = false;
        filterKeys.forEach((key: keyof SortFilterDropdowns) => {
            if (filteringFound) return;
            // If dropdown filter has items in array or it is different that default value
            if (sortFilterSelector.dropdowns[key].selectedItems.length > 0 && sortFilterSelector.dropdowns[key].selectedItems[0] !== sortFilterSelector.dropdowns[key].defaultValue[0]) {
                filteringFound = true;
            }
        })
        return filteringFound;
    }

    function ClearFiltersButton() {
        return (
            <Link href="games" className="bg-mid h-[40px] px-[10px] flex items-center justify-center " onClick={() => { 
                dispatch(clearAllOptions());
                dispatch(resetGames([]));
                dispatch(setAmount(amountFetch));
            }}>
                Clear
            </Link>
        )
    }

    function SearchFilterButton() {
        return (
            <Link className={`bg-hi h-[40px] px-[10px] flex items-center justify-center searchbutton
                ${searchActive ? "opacity-100" : "opacity-60"}
            `} href={generateSortFilterParams(sortFilterSelector, "games")} onClick={searchClick}>
                Search!
            </Link>
        )
    }

    // Function checks if current page filtering query is different from stored query data to either display loading indicator and start loading data, or do nothing;
    function searchClick(e: React.MouseEvent) {
        // @ts-ignore 
        let params = new URL(document.location).searchParams;
        let generatedParams = generateSortFilterParams(sortFilterSelector, "games");

        if (isQueryFilterDifferent(params, generatedParams)) {
            let target = e.target as HTMLLinkElement;
            if (target.innerHTML === "Loading...") {
                e.preventDefault();
                return;
            }
            dispatch(resetGames([]));
            dispatch(setAmount(amountFetch));
            target.innerHTML = "Loading...";
        } else {
            e.preventDefault();
        }
    }

    useEffect(() => {
        let searchButton = document.getElementsByClassName("searchbutton")[0];
        if (searchButton) {
            searchButton.innerHTML = "Search!";
            // @ts-ignore
            let params = new URL(document.location).searchParams;
            let generatedParams = generateSortFilterParams(sortFilterSelector, "games");

            if (isQueryFilterDifferent(params, generatedParams) && !searchActive) {
                setSearchActive(true);
                return;
            } else {
                if (!isQueryFilterDifferent(params, generatedParams) && searchActive) {
                    setSearchActive(false);
                    return;
                }
            }
        }
    });


    function TagFilter() {
        return (
            <div className="tab-tags relative">
                <SortFilterButton doCount title={"Tags"} dropdownName={"tags"} />
                {sortFilterSelector.dropdowns.tags.isDropdown &&
                    <div className="absolute left-[-10px] top-[50px] w-screen max-w-[330px] h-[500px] bg-mid z-[500]">
                        <TagsFilterDropdown itemList={tagOptions} />
                    </div>}
            </div>
        )
    }

    function PlatformFilter() {
        return (
            <div className="tab-platforms relative">
                <SortFilterButton doCount title={"Platform"} dropdownName={"platforms"} />
                {sortFilterSelector.dropdowns.platforms.isDropdown &&
                    <div className="absolute left-0 top-[50px] w-screen max-w-[330px] bg-mid z-[500]">
                        <PlatformFilterDropdown itemList={platformOptions} />
                    </div>}
            </div>
        )
    }

    function PlayerFilter() {
        return (
            <div className="tab-players relative">
                <SortFilterButton mimicTitle title={"Players"} dropdownName={"players"} />
                {sortFilterSelector.dropdowns.players.isDropdown &&
                    <div className="absolute left-0 top-[50px] w-screen max-w-[330px] h-fit bg-mid z-[500]">
                        <PlayersFilterDropdown itemList={playerOptions} />
                    </div>}
            </div>
        )
    }

    function DeveloperFilter() {
        return (
            <div className="tab-developer relative">
                <SortFilterButton mimicTitle title={"Company"} dropdownName={"developer"} />
                {sortFilterSelector.dropdowns.developer.isDropdown &&
                    <div className="absolute right-[-10px] top-[50px] w-screen max-w-[330px] bg-mid z-[500]">
                        <DeveloperFilterDropdown itemList={developerOptions} />
                    </div>}
            </div>
        )
    }

    function SortByTab() {
        return (
            <div className="tab-order relative">
                <SortFilterButton mimicTitle title={"Order by"} dropdownName={"order"} />
                {sortFilterSelector.dropdowns.order.isDropdown &&
                    <div className="absolute right-[-10px] top-[50px] w-screen max-w-[330px] bg-mid z-[500] overflow-hidden">
                        <OrderByDropdown itemList={aspectOptions} />
                    </div>}
            </div>
        )
    }


    function AdvancedSearchWindowPC(expand: boolean) {
        return (
            <div className={`w-full relative flex items-center justify-between transition-all duration-300
                ${expand && "h-[45px] opacity-100 overflow-visible mt-[10px]"}
                ${!expand && "h-[0px] opacity-0 overflow-hidden"}
            `}>
                {TagFilter()}
                {PlatformFilter()}
                {PlayerFilter()}
                {DeveloperFilter()}
            </div>
        )
    }

    function MainRowPC() {
        return (
            <div className={`w-full h-[45px] flex items-center gap-[10px] textcol-main`}>
                <button className={`${sortFilterSelector.expand ? "textcol-dimm saturate-[90%]" : "textcol-main saturate-100"} 
                transition-all duration-200 bg-mid h-[40px] w-full max-w-[185px] text-left p-[10px] flex items-center justify-between text-[15px]`}
                    onClick={() => dispatch(sortFilterExpand(!sortFilterSelector.expand))}>
                    Advanced Search
                    <Image src={"/icons/dots.svg"} alt={"advanced search icon"} width={20} height={20} className="brightness-0 invert opacity-50 w-[20px] h-[20px]" />
                </button>
                {isFilteringSelected() && ClearFiltersButton()}
                {isFilteringSelected() && SearchFilterButton()}
                <div className="flex-auto" />
                {SortByTab()}
            </div>
        )
    }

    return (
        <>
            <SortFilterQueryReader />
            <SortFilterTabMobile tagOptions={tagOptions} developerOptions={developerOptions} playerOptions={playerOptions} platformOptions={platformOptions} aspectOptions={aspectOptions} />
            <div className={`w-full max-w-[1000px] hidden k:block  h-fit bg-dimm p-[10px]`}>
                {MainRowPC()}
                {AdvancedSearchWindowPC(sortFilterSelector.expand)}
            </div>
        </>
    )
}