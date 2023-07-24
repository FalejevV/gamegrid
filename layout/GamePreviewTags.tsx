import Tag from "@/components/Tag/Tag"
import { TagItem } from "@/interface";
import { nanoid } from "@reduxjs/toolkit"



export default function GamePreviewTags(props:{
    tags:TagItem[]
}){
    
    return(
        <div className="flexgap justify-end flex-auto">
            {props.tags.map((tag:TagItem) => <Tag key={nanoid()} tag={tag.Tag.tag} />)}         
        </div>
    )
}