import Tag from "@/components/Tag/Tag"
import { nanoid } from "@reduxjs/toolkit"



export default function GamePreviewTags(props:{
    tags:string[]
}){
    return(
        <div className="flexgap justify-end flex-auto">
            {props.tags.map((tag:string) => <Tag key={nanoid()} tag={tag} />)}         
        </div>
    )
}