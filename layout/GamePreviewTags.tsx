import AdditionalInfoHover from "@/components/AdditionalInfoHover/AdditionalInfoHover";
import Tag from "@/components/Tag/Tag"
import { TagItem } from "@/interface";
import { nanoid } from "@reduxjs/toolkit"



export default function GamePreviewTags(props:{
    tags:TagItem[]
}){
    let tags = props.tags.map((tag:TagItem) => tag.Tag.tag);

    return(
        <div className="flexgap justify-end flex-auto">
            {props.tags.map((tag:TagItem, index:number) => {
                if(index > 2) return
                return <Tag key={nanoid()} tag={tag?.Tag?.tag || "None"} />
            })}         
            {props.tags.length > 2 && <AdditionalInfoHover type="tags" items={tags.slice(3)} />}
        </div>
    )
}