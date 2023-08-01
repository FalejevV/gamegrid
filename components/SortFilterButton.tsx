import { SortFilterDropdowns, clearOptions, toggleAllDropdowns, toggleDropdown } from "@/store/features/sortFilter";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";



export default function SortFilterButton(props:{
    title:string,
    doCount?:boolean,
    dropdownName:keyof SortFilterDropdowns
}){
    
    const dispatch = useAppDispatch();
    const sortFilterDropdownSelector = useAppSelector((state :RootState) => state.sortFilter.dropdowns[props.dropdownName]);
    function switchDropdown(){
        dispatch(toggleAllDropdowns(false));
        dispatch(toggleDropdown({
            key: props.dropdownName,
            value: !sortFilterDropdownSelector.isDropdown
        }))
    }

    function isSomethingSelected(){
        return sortFilterDropdownSelector.selectedItems.length > 0 && sortFilterDropdownSelector.selectedItems[0] !== sortFilterDropdownSelector.defaultValue[0];
    }

    function clearAllOptions(e:React.MouseEvent){
        e.stopPropagation();
        dispatch(clearOptions(props.dropdownName));
    }
    
    return(
        <div role="button" tabIndex={0}
        className={`w-screen max-w-[185px] h-[40px] bg-mid flex items-center justify-between p-[10px] gap-[10px]`}
        onClick={switchDropdown}
        >
            <p className="textcol-main flex-auto" >{props.title}</p>
            {isSomethingSelected() && <Image src={"/icons/Close.svg"} alt={"clear options"} width={14} height={14}  className="transition-all duration-150 hover:scale-110" onClick={(e) => clearAllOptions(e)}/>}
            <Image src={"/icons/Chevron-Down.svg"} alt={"down arrow"} width={15} height={10} />
        </div>
    )
}