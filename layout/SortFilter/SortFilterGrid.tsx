import SortFilterGridOption from "@/components/SortFilterOption/SortFilterGridOption";
import { PrimaryItem } from "@/data";
import { SortFilterDropdowns } from "@/store/features/sortFilter";



export default function SortFilterGrid(props:{
    itemList:PrimaryItem[]
    dropdownType:keyof SortFilterDropdowns,
    singlePick?:boolean
}){
    
    function getItemList(){
        return props.itemList.map((item:PrimaryItem) => <SortFilterGridOption singlePick={props.singlePick} key={item.title} title={item.title} dropdownName={props.dropdownType} icon={item.image} />)
    }

    return(
        <div className="w-full h-fit grid grid-cols-2 gap-[10px]">
            {getItemList()}
        </div>
    )
}