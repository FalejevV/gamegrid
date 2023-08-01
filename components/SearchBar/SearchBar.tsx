"use client"

import Image from "next/image"
import { ChangeEvent } from "react"

export default function SearchBar(props:{
    searchValue:string,
    setSearchValue:Function
}){

    function inputChange(e:ChangeEvent){
        let target = e.target as HTMLInputElement;
        props.setSearchValue(target.value);
    }

    return(
        <div className="w-full h-[45px] min-h-[45px] max-h-[45px] bg-dimm flex items-center justify-between relative">
            <input type="search" aria-label="Search" placeholder="Search..." 
            className="w-full h-full focus:outline-none px-[10px] bg-transparent textcol-main pr-[40px]" 
            value={props.searchValue}
            onChange={inputChange}
            />

            {!props.searchValue.trim() ?
            <Image src={"/icons/Search.svg"} alt={"search icon"} width={20} height={20}
            className="absolute right-[10px] opacity-50 pointer-events-none"/>

            :
            <Image src={"/icons/Close.svg"} alt={"search icon"} width={17} height={17}
            onClick={() => props.setSearchValue("")}
            className="absolute right-[10px] opacity-50 cursor-pointer hover:scale-110 transition-all duration-150"/>
            }
        </div>
    )
}