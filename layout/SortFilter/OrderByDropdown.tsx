"use client"

import { RootState, useAppSelector } from "@/store/store"
import SortFilterGrid from "./SortFilterGrid";
import { PrimaryItem, primaryOrder, primaryTags } from "@/data";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import SortFilterList from "./SortFilterList";
import OutClickListener from "@/components/OutClickListener/OutClickListener";



export default function OrderByDropdown(props:{
    itemList:string[]
}){

    const [search, setSearch] = useState("")
    
    return(
        <div className="w-full h-full flex flex-col gap-[10px] textcol-main pten">
            <OutClickListener target={"order"} />
            <p className="text-[15px]">Ordery games by:</p>
            <SortFilterGrid singlePick itemList={primaryOrder} dropdownType={"order"} />
            <p className="text-[15px]">OR by game aspect:</p>
            <SearchBar searchValue={search} setSearchValue={setSearch} />
            <div className="flex-auto overflow-y-scroll">
                <SortFilterList singlePick excludeItems={primaryOrder} searchCriteria={search} itemList={props.itemList} dropdownType={"order"} />
            </div>
        </div>
    )
}