import { SortFilterDropdowns, clearOptions, toggleAllDropdowns, toggleDropdown, toggleOption } from "@/store/features/sortFilter"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import Image from "next/image"
import SortFilterOption from "../SortFilterOption/SortFilterOption"
import { useMemo } from "react"
import OutClickListener from "../OutClickListener/OutClickListener"



export default function SortTab(props:{
    title:keyof SortFilterDropdowns,
    content:string[],
    clearable?:boolean
}){
    const sortDrowdownSelector = useAppSelector((state:RootState) => state.sortFilter.dropdowns[props.title])
    const dispatch =useAppDispatch();


    function switchSortOption(value:string){
        dispatch(clearOptions(props.title));
        dispatch(toggleOption({
            key: props.title,
            value
        }));
        dispatch(toggleDropdown({
            key: props.title,
            value: false
        }))
    }

    const getSortOptionsMemo = useMemo(() => {
        return props.content.map((option:string) => <SortFilterOption key={option} title={option} checked={sortDrowdownSelector.selectedItems.includes(option)} switchOption={() => switchSortOption(option)} />)
    },[props.content, sortDrowdownSelector.selectedItems])

    function Dropdown(){
        return (
            <div className={`${"tab-"+props.title} w-[250px] h-fit max-h-[250px] flex-col absolute left-[-35px] top-[50px] z-50 p-[10px] bg-mid shadow-lg
                ${props.content.length > 6 && "overflow-y-scroll"}
            `}>
                <OutClickListener target={props.title} />
                {getSortOptionsMemo}
            </div>
        )
    }

    function switchDropdown(){
        dispatch(toggleDropdown({
            key: props.title,
            value: !sortDrowdownSelector.isDropdown
        }))
    }

    function clearButton(){
        return <Image src={"/icons/Close.svg"} alt={"down arrow"} width={18} height={18} className="w-[18px] h-[18px]" onClick={(e) => {
            switchSortOption(sortDrowdownSelector.defaultValue[0]);
            e.stopPropagation();
        }}/>
    }

    return(
        <div className={`${"tab-"+props.title}  w-full max-w-[185px] h-[40px] flex items-center justify-between bg-mid cursor-pointer relative select-none`}>
            <div className="w-full h-full flex justify-between items-center px-[10px] pr-[15px]" onClick={switchDropdown}>
                <p className="textcol-main capitalize whitespace-nowrap">{sortDrowdownSelector.selectedItems[0]}</p>
                
                
                {props.clearable && 
                    <>
                        {sortDrowdownSelector.selectedItems[0] === sortDrowdownSelector.defaultValue[0] ? 
                            <Image src={"/icons/Chevron-down.svg"} alt={"down arrow"} width={15} height={9} className="w-[15px] h-[9px]"/>
                            :
                            clearButton()
                        }
                    </>
                }

                {!props.clearable && <Image src={"/icons/Chevron-down.svg"} alt={"down arrow"} width={15} height={9} className="w-[15px] h-[9px]"/>}

                
            </div>

            {sortDrowdownSelector.isDropdown && Dropdown()}        
        </div>
    )
}