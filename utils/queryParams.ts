import { SortFilter, SortFilterDropdowns } from "@/store/features/sortFilter";
import { getDefaultScoreName } from "./scoreName";

export interface URLQueryObject{ 
    pathname: string, 
    query: { 
        order:string,
        tags:string[],
        platforms:string[],
        players:string,
        amount:number
    }
}

export function generateSortFilterParams(sortFilterData:SortFilter, href:string) : URLQueryObject{
    return {
        pathname: href, 
        query: { 
            order:sortFilterData.dropdowns.order.selectedItems[0],
            tags:sortFilterData.dropdowns.tags.selectedItems,
            platforms:sortFilterData.dropdowns.platform.selectedItems,
            players:(sortFilterData.dropdowns.players.selectedItems[0] === "Players" ? "" : sortFilterData.dropdowns.players.selectedItems[0]),
            amount:sortFilterData.amount
        }
    }
}