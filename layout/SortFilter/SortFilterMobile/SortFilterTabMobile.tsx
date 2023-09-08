"use client"
import Image from "next/image"
import SortFilterMobileDropdown from "./SortFilterMobileDropdown"
import { useAppDispatch } from "@/store/store"
import { toggleMobileFilterDropdown } from "@/store/features/window";



export default function SortFilterTabMobile(props:{
    tagOptions: string[],
    developerOptions:string[],
    playerOptions:string[],
    platformOptions:string[],
    aspectOptions:string[],
}) {
    const dispatch = useAppDispatch();
    return (
        <div className="w-full h-[50px] flex k:hidden items-center justify-between">
            <SortFilterMobileDropdown tagOptions={props.tagOptions} developerOptions={props.developerOptions} playerOptions={props.playerOptions} platformOptions={props.platformOptions} aspectOptions={props.aspectOptions} />
            <div className="w-[45px] h-[45px] bg-dimm flex items-center justify-center cursor-pointer" onClick={() => dispatch(toggleMobileFilterDropdown(true))}>
                <Image width={25} height={25} alt="filter button" src={"/icons/filter.svg"} className="w-[25px] h-[25px]" />
            </div>
            <p className="bg-dimm inputheight flex items-center justify-center px-[15px] text-[16px] font-medium textcol-main">Sort By</p>
        </div>
    )
}