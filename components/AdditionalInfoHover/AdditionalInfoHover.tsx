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
        <div className="group z-50 hidden k:block relative"> 
            <p className="p-[3px] textcol-main text-[15px] opacity-90">+{props.items.length}</p>
            <div className={`absolute top-[-2px] bg-mid p-[10px] group-hover:flex px-[20px] sm:flex-col gap-[25px] overflow-auto max-h-[305px] min-w-[150px] w-fit hidden
                ${props.direction ? props.direction : "right-[-13px]"}
            `}>
                {props.items.map((item:string) => 
                    <Tag single={props.single} tag={item} bright={true} key={item} type={props.type} />
                )}
            </div>
        </div>
    )
}