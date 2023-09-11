import SortFilterListOption from "@/components/SortFilterOption/SortFilterListOption"
import { PrimaryItem } from "@/data";
import { SortFilterDropdowns } from "@/store/features/sortFilter"
import { VariableSizeList as List } from 'react-window';


export default function SortFilterList(props: {
    itemList: string[]
    dropdownType: keyof SortFilterDropdowns,
    searchCriteria?: string,
    excludeItems?: PrimaryItem[],
    singlePick?: boolean
}) {

    function isExcluded(item: string) {
        let found = false;
        if (props.excludeItems) {
            props.excludeItems.forEach((primaryItem: PrimaryItem) => {
                if (found) return;
                if (primaryItem.title === item) found = true;
            })
        }
        return found;
    }

    function getSize() {
        return 45;
    }
    let filteredItems:string[];
    if(props.searchCriteria) {
        filteredItems = props.itemList.filter((item: string) => item.toLowerCase().includes(props.searchCriteria?.toLowerCase() || "") && !isExcluded(item));
    }else {
        filteredItems = props.itemList.filter((item: string) => !isExcluded(item))
    }

    const Row = ({ index, style }: { index: number, style: any }) => (
        <div style={style} className="pr-[10px]">
            <SortFilterListOption singlePick={props.singlePick} key={filteredItems[index]} title={filteredItems[index]} dropdownName={props.dropdownType} />
        </div>
    )


    return (
        <div className="w-full flex flex-col gap-[10px] pten">
            <List
                className="List"
                height={200}
                itemCount={filteredItems.length}
                itemSize={getSize}
                width={300}
            >
                {Row}
            </List>
        </div>
    )
}