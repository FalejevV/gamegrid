"use client"

import { RootState, useAppSelector } from "@/store/store"
import SortFilterGrid from "./SortFilterGrid";
import { primaryTags } from "@/data";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import SortFilterList from "./SortFilterList";
import OutClickListener from "@/components/OutClickListener/OutClickListener";



export default function TagsFilterDropdown(props:{
    itemList:string[]
}){


    const sortFilterDropdownSelector = useAppSelector((state : RootState) => state.sortFilter.dropdowns.tags);
    const [search, setSearch] = useState("")
    
    return(
        <div className="w-full h-full flex flex-col gap-[10px] textcol-main pten">
            <OutClickListener target={"tags"} />
            <p className="text-[15px]">Game should include these tags: ({sortFilterDropdownSelector.selectedItems.length}/3)</p>
            <SortFilterGrid itemList={primaryTags} dropdownType={"tags"} />
            <SearchBar searchValue={search} setSearchValue={setSearch} />
            <div className="flex-auto overflow-hidden">
                <SortFilterList excludeItems={primaryTags} searchCriteria={search} itemList={props.itemList} dropdownType={"tags"} />
            </div>
        </div>
    )
}