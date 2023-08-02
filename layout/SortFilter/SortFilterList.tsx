import SortFilterListOption from "@/components/SortFilterOption/SortFilterListOption"
import { PrimaryItem } from "@/data";
import { SortFilterDropdowns } from "@/store/features/sortFilter"



export default function SortFilterList(props:{
    itemList:string[]
    dropdownType:keyof SortFilterDropdowns,
    searchCriteria?:string,
    excludeItems?:PrimaryItem[],
    singlePick?:boolean
}){

    function isExcluded(item:string){
        let found = false;
        if(props.excludeItems){
            props.excludeItems.forEach((primaryItem:PrimaryItem) => {
                if(found) return;
                if(primaryItem.title === item) found = true;
            })
        }
        return found;
    }
    
    function getItemList(){
        let criteria = props.searchCriteria || "";
        if(criteria){
            criteria = criteria.toLowerCase();
            if(criteria.trim() !== ""){
                return props.itemList.map((item:string) => {
                    if(item.toLowerCase().includes(criteria) && !isExcluded(item)){
                        return <SortFilterListOption singlePick={props.singlePick} key={item} title={item} dropdownName={props.dropdownType} />
                    }
                })
            }else{
                return props.itemList.map((item:string) => !isExcluded(item) && <SortFilterListOption singlePick={props.singlePick} key={item} title={item} dropdownName={props.dropdownType} />)
            }
        }
        return props.itemList.map((item:string) => !isExcluded(item) && <SortFilterListOption singlePick={props.singlePick} key={item} title={item} dropdownName={props.dropdownType} />)
    }

    return(
        <div className="w-full h-fit flex flex-col gap-[10px] pten">
            {getItemList()}
        </div>
    )
}