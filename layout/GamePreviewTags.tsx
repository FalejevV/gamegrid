import Tag from "@/components/Tag/Tag"
import { tagItem } from "@/interface";
import { nanoid } from "@reduxjs/toolkit"



export default function GamePreviewTags(props:{
    tags:tagItem[]
}){
    console.log(props.tags);
    return(
        <div className="flexgap justify-end flex-auto">
            {props.tags.map((tag:tagItem) => <Tag key={nanoid()} tag={tag.Tag.tag} />)}         
        </div>
    )
}