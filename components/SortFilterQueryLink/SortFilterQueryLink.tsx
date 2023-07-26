"use client"

import { SortFilterDropdowns } from "@/store/features/sortFilter";
import { RootState, useAppSelector } from "@/store/store"
import { generateSortFilterParams } from "@/utils/queryParams";
import Link from "next/link"


export default function SortFilterQueryLink(props:{
    invisible?:boolean,
}){

    const sortFilterSelector:SortFilterDropdowns = useAppSelector((state:RootState) => state.sortFilter.dropdowns);

    return (
        <Link href={generateSortFilterParams(sortFilterSelector, "games")} id="sortFilterSearchButton"
        className={`p-4 textcol-main bg-dimm
        ${props.invisible && "pointer-events-none user-select hidden"}
        `}
        >
            TEST SEARCH
        </Link>
    )
}