"use client";
import { SortFilterDropdowns, clearOptions, toggleOption } from "@/store/features/sortFilter";
import { useAppDispatch } from "@/store/store"



export default function Tag(props:{
    tag:string
    type?:keyof SortFilterDropdowns,
    bright?:boolean,
    single?:boolean
}){
    const dispatch = useAppDispatch();
    function tagClick(e:React.MouseEvent){
        e.preventDefault();
        if(props.single && props.type){
            dispatch(clearOptions(props.type))
        }
        dispatch(toggleOption({
            key: props.type || "tags",
            value: props.tag
        }))
    }
    return(
        <button className={`whitespace-nowrap sm:text-[17px] text-[16px] hover:brightness-150 flex items-center justify-center transition-all duration-200 ${props.bright ? "textcol-main" : "textcol-dimm"}`} onClick={tagClick}>
            {props.tag}
        </button>
    )
}