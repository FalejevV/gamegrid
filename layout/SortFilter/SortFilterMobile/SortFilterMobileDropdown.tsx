"use client"

import MobileFilterButton from "@/components/MobileFilterButton/MobileFilterButton";
import { setMobileFilterSelected, toggleMobileFilterDropdown } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import TagsFilterDropdown from "../TagsFilterDropdown";
import PlatformFilterDropdown from "../PlatformFilterDropdown";
import OrderByDropdown from "../OrderByDropdown";
import DeveloperFilterDropdown from "../DeveloperFilterDropdown";
import { clearAllOptions, clearOptions } from "@/store/features/sortFilter";
import PlayersFilterDropdown from "../PlayersFilterDropdown";
import Link from "next/link";
import { generateSortFilterParams } from "@/utils/queryParams";
import { useEffect, useMemo, useState } from "react";
import { isQueryFilterDifferent } from "@/utils/helpers";



export default function SortFilterMobileDropdown(props: {
    tagOptions: string[],
    developerOptions: string[],
    playerOptions: string[],
    platformOptions: string[],
    aspectOptions: string[],
}) {
    const mobileDropdownSelector = useAppSelector((state: RootState) => state.window.mobileFilterDropdown);
    const mobileFilterSelectedSelector = useAppSelector((state: RootState) => state.window.mobileFilterSelected);
    const sortFilterSelector = useAppSelector((state: RootState) => state.sortFilter);
    const dispatch = useAppDispatch();
    const [searchActive, setSearchActive] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    function clickLocationCheck(e: React.MouseEvent) {
        let target = e.target as HTMLElement;
        if (target.tagName === "SPAN") {
            dispatch(toggleMobileFilterDropdown(false));
            dispatch(setMobileFilterSelected(""));
        }
        e.stopPropagation();
    }

    function DisplaySelectedFilter() {
        if (mobileFilterSelectedSelector === "tags") return <TagsFilterDropdown itemList={props.tagOptions} />
        if (mobileFilterSelectedSelector === "platforms") return <PlatformFilterDropdown itemList={props.platformOptions} />
        if (mobileFilterSelectedSelector === "players") return <PlayersFilterDropdown itemList={props.playerOptions} />
        if (mobileFilterSelectedSelector === "order") return <OrderByDropdown itemList={props.aspectOptions} />
        if (mobileFilterSelectedSelector === "developer") return <DeveloperFilterDropdown itemList={props.developerOptions} />
        return;
    }

    function isAnythingSelected() {
        return sortFilterSelector.dropdowns.developer.selectedItems.length > 0 || sortFilterSelector.dropdowns.tags.selectedItems.length > 0
            || sortFilterSelector.dropdowns.players.selectedItems.length > 0 || sortFilterSelector.dropdowns.platforms.selectedItems.length > 0
            || sortFilterSelector.dropdowns.order.selectedItems.length > 0
    }

    let dropdownListMemo = useMemo(() => {
        return (
            <DisplaySelectedFilter />
        )
    }, [mobileFilterSelectedSelector]);


    // Function checks if current page filtering query is different from stored query data to either display loading indicator and start loading data, or do nothing;
    function searchClick(e: React.MouseEvent) {
        // @ts-ignore 
        let params = new URL(document.location).searchParams;
        let generatedParams = generateSortFilterParams(sortFilterSelector, "games");
        if (isQueryFilterDifferent(params, generatedParams)) {
            let target = e.target as HTMLLinkElement;
            target.innerHTML = "Loading...";
            setIsFetching(true);
        } else {
            e.preventDefault();
        }
    }

    useEffect(() => {
        // @ts-ignore
        let params = new URL(document.location).searchParams;
        let generatedParams = generateSortFilterParams(sortFilterSelector, "games");
        if (isQueryFilterDifferent(params, generatedParams)) {
            setSearchActive(true);
        } else {
            setSearchActive(false);
            if (isFetching) {
                setTimeout(() => {
                    dispatch(toggleMobileFilterDropdown(false));
                    dispatch(setMobileFilterSelected(""));
                },100)
            }
        }
        if (isFetching) {
            setTimeout(() => {
                dispatch(toggleMobileFilterDropdown(false));
                dispatch(setMobileFilterSelected(""));
            },100)
            setIsFetching(false);
        }

    }, [props]);


    return (
        <span className={`w-screen h-screen fixed left-0 top-0 bg-[#0000008a] z-[300] transition-all duration-200 pb-[0px]
            ${mobileDropdownSelector ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `} onClick={clickLocationCheck}>

            <div className={`w-full h-[calc(100vh-60px)] bg-dimm fixed left-0 bottom-0 z-[301] flex overflow-y-auto overflow-x-hidden transition-all duration-200
                ${mobileDropdownSelector ? "bottom-0 duration-0" : "bottom-[-100vh]"}
            `}>

                {/* Main filter page, where user can select required filter type */}
                <div className={`flex flex-col overflow-hidden transition-all duration-200 whitespace-nowrap h-[calc(100%-105px)] overflow-y-auto
                    ${mobileFilterSelectedSelector !== "" ? "w-[0px] min-w-0" : "w-screen min-w-[100vw]"}
                    `}>

                    <div className="w-full inputheight bg-mid flex items-center p-[10px] justify-between fixed z-40">
                        <button className="textcol-main py-[5px] pr-[20px]" onClick={() => dispatch(toggleMobileFilterDropdown(false))}>{"Close"}</button>
                        {isAnythingSelected() && <button className="textcol-main py-[5px] pl-[20px]" onClick={() => dispatch(clearAllOptions())}>Clear all</button>}
                    </div>

                    <section className="w-full flex flex-col gap-[20px] p-[10px] flex-auto pt-[55px]">
                        <MobileFilterButton title={"By Tags"} type={"tags"} />
                        <MobileFilterButton title={"By Platform"} type={"platforms"} />
                        <MobileFilterButton title={"By Players"} type={"players"} />
                        <MobileFilterButton title={"By Company"} type={"developer"} />
                        <MobileFilterButton title={"Order By"} type={"order"} />
                    </section>
                </div>

                {/* Selected filter type page */}
                <div className="w-screen min-w-[100vw]">
                    <div className="w-full inputheight bg-mid flex items-center p-[10px] justify-between fixed z-40">
                        <button className="textcol-main py-[5px] pr-[20px]" onClick={() => dispatch(setMobileFilterSelected(""))}>Back</button>
                        {sortFilterSelector.dropdowns[mobileFilterSelectedSelector || "tags"].selectedItems.length > 0 && <button className="textcol-main py-[5px] pl-[20px]" onClick={() => dispatch(clearOptions(mobileFilterSelectedSelector || "tags"))}>Clear {mobileFilterSelectedSelector}</button>}
                    </div>
                    <div className="w-full h-[calc(100%-105px)] min-h-[600px] overflow-y-auto brightness-90 pt-[45px]">
                        {dropdownListMemo}
                    </div>
                </div>
            </div>
            <div className="fixed w-full bg-dimm textcol-main h-[55px] text-[18px] font-semibold bottom-[0px] left-[50%] translate-x-[-50%] z-[305] flex justify-center items-center ">
                <Link className={`w-full max-w-[250px] bg-mid inputheight flex items-center justify-center
                    ${searchActive ? "opacity-100" : "opacity-30"}
                `}
                    href={generateSortFilterParams(sortFilterSelector, "games")} onClick={searchClick}>
                    {searchActive ? "Search!" : "Pick a Filter"}
                </Link>
            </div>
        </span>

    )
}