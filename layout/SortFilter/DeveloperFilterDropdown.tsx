"use client"

import OutClickListener from "@/components/OutClickListener/OutClickListener";
import SortFilterList from "./SortFilterList";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";


export default function DeveloperFilterDropdown(props: {
    itemList: string[]
}) {
    const [search, setSearch] = useState("");

    return (
        <div className="w-full flex flex-col gap-[10px] textcol-main pten">
            <OutClickListener target={"developer"} />
            <p className="text-[15px]">Games by company</p>
            <SearchBar searchValue={search} setSearchValue={setSearch} />
            <div className="flex-auto">
                <SortFilterList searchCriteria={search} itemList={props.itemList} dropdownType={"developer"} />
            </div>
        </div>
    )
}