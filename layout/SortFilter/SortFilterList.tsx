import SortFilterListOption from "@/components/SortFilterOption/SortFilterListOption"
import { SortFilterDropdowns } from "@/store/features/sortFilter"



export default function SortFilterList(props:{
    itemList:string[]
    dropdownType:keyof SortFilterDropdowns,
    searchCriteria?:string,
    excludeItems?:string[]
}){
    
    function getItemList(){
        let criteria = props.searchCriteria || "";
        let excludeList = props.excludeItems || "";
        if(criteria){
            criteria = criteria.toLowerCase();
            if(criteria.trim() !== ""){
                return props.itemList.map((item:string) => {
                    if(item.toLowerCase().includes(criteria) && !excludeList.includes(item)){
                        return <SortFilterListOption key={item} title={item} dropdownName={props.dropdownType} />
                    }
                })
            }else{
                return props.itemList.map((item:string) => !excludeList.includes(item) && <SortFilterListOption key={item} title={item} dropdownName={props.dropdownType} />)
            }
        }
        return props.itemList.map((item:string) => !excludeList.includes(item) && <SortFilterListOption key={item} title={item} dropdownName={props.dropdownType} />)
    }

    return(
        <div className="w-full h-fit flex flex-col gap-[10px] pten">
            {getItemList()}
        </div>
    )
}