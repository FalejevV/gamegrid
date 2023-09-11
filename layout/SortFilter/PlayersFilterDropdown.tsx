"use client"

import OutClickListener from "@/components/OutClickListener/OutClickListener";
import { RootState, useAppSelector } from "@/store/store";
import SortFilterList from "./SortFilterList";


export default function PlayersFilterDropdown(props: {
    itemList: string[]
}) {

    return (
        <div className="w-full h-full flex flex-col gap-[10px] textcol-main pten">
            <OutClickListener target={"players"} />
            <p className="text-[15px]">Games by player amount</p>
            <div className="flex-auto overflow-hidden">
                <SortFilterList singlePick itemList={props.itemList} dropdownType={"players"} />
            </div>
        </div>
    )
}