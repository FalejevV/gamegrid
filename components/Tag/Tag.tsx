import { toggleOption } from "@/store/features/sortFilter";
import { useAppDispatch } from "@/store/store"



export default function Tag(props:{
    tag:string
}){
    const dispatch = useAppDispatch();
    function tagClick(){
        dispatch(toggleOption({
            key: "tags",
            value: props.tag
        }))
    }
    return(
        <button className="textcol-dimm whitespace-nowrap" onClick={tagClick}>
            {props.tag}
        </button>
    )
}