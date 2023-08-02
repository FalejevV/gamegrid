"use client"

import OutClickListener from "@/components/OutClickListener/OutClickListener";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useAppSelector, RootState } from "@/store/store";
import { useState } from "react";
import SortFilterList from "./SortFilterList";



export default function PlatformFilterDropdown(props:{
    itemList:string[]
}){
    const [search, setSearch] = useState("");
    const sortFilterDropdownSelector = useAppSelector((state : RootState) => state.sortFilter.dropdowns.platforms);

    return(
        <div className="w-full h-full flex flex-col gap-[10px] textcol-main pten">
            <OutClickListener target={"platforms"} />
            <p className="text-[15px]">Games that include any platform:  ({sortFilterDropdownSelector.selectedItems.length}/3)</p>
            <SearchBar searchValue={search} setSearchValue={setSearch} />
            <div className="flex-auto overflow-y-scroll">
                <SortFilterList searchCriteria={search} itemList={props.itemList} dropdownType={"platforms"} />
            </div>
        </div>
    )
}