import { TagItem } from "@/interface"
import Tag from "../Tag/Tag"
import { SortFilterDropdowns } from "@/store/features/sortFilter"
import { useState } from "react"




export default function AdditionalInfoHover(props:{
    items:string[],
    type:keyof SortFilterDropdowns,
    direction?:string,
    single?:boolean
}){
    if(props.items.length === 0) return;
    return(
        <div className="relative group z-50">
            <p className="p-[3px] textcol-main text-[15px]">+{props.items.length}</p>
            <div className={`absolute right-[-15px] top-[25px] bg-mid p-[10px] group-hover:flex px-[20px] sm:flex-col gap-[25px] overflow-auto max-h-[200px] w-screen max-w-[250px] sm:w-auto hidden
                ${props.direction ? props.direction : "right-[-15px]"}
            `}>
                {props.items.map((item:string) => 
                    <Tag single={props.single} tag={item} bright={true} key={item} type={props.type} />
                )}
            </div>
        </div>
    )
}