import SortFilterGridOption from "@/components/SortFilterOption/SortFilterGridOption";
import { SortFilterDropdowns } from "@/store/features/sortFilter";



export default function SortFilterGrid(props:{
    itemList:string[]
    dropdownType:keyof SortFilterDropdowns,
}){
    
    function getItemList(){
        return props.itemList.map((item:string) => <SortFilterGridOption key={item} title={item} dropdownName={props.dropdownType} icon={`/icons/${item}.svg`} />)
    }

    return(
        <div className="w-full h-fit grid grid-cols-2 gap-[10px]">
            {getItemList()}
        </div>
    )
}