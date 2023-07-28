import { SortFilterDropdowns } from "@/store/features/sortFilter";
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

export function generateSortFilterParams(sortFilterData:SortFilterDropdowns, href:string) : URLQueryObject{
    return {
        pathname: href, 
        query: { 
            sort:sortFilterData.sort.selectedItems[0],
            tags:sortFilterData.tags.selectedItems,
            platforms:sortFilterData.platform.selectedItems,
            players:(sortFilterData.players.selectedItems[0] === "Players" ? "" : sortFilterData.players.selectedItems[0]),
            aspect:getDefaultScoreName(sortFilterData.aspects.selectedItems[0]) || "",
            amount:3
        }
    }
}