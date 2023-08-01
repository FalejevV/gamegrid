import { SortFilter, SortFilterDropdowns } from "@/store/features/sortFilter";
import { getDefaultScoreName } from "./scoreName";

export interface URLQueryObject{ 
    pathname: string, 
    query: { 
        sort:string,
        tags:string[],
        platforms:string[],
        players:string,
        aspect:string,
        amount:number
    }
}

export function generateSortFilterParams(sortFilterData:SortFilter, href:string) : URLQueryObject{
    return {
        pathname: href, 
        query: { 
            sort:sortFilterData.dropdowns.sort.selectedItems[0],
            tags:sortFilterData.dropdowns.tags.selectedItems,
            platforms:sortFilterData.dropdowns.platform.selectedItems,
            players:(sortFilterData.dropdowns.players.selectedItems[0] === "Players" ? "" : sortFilterData.dropdowns.players.selectedItems[0]),
            aspect:getDefaultScoreName(sortFilterData.dropdowns.aspects.selectedItems[0]) || "",
            amount:sortFilterData.amount
        }
    }
}