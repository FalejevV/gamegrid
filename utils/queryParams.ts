import { SortFilterDropdowns } from "@/store/features/sortFilter";

export interface URLQueryObject{ 
    pathname: string, 
    query: { 
        sort:string,
        tags:string[],
        platforms:string[],
        players:string[],
        aspect:string,
    }
}

export function generateSortFilterParams(sortFilterData:SortFilterDropdowns, href:string) : URLQueryObject{
    return {
        pathname: href, 
        query: { 
            sort:sortFilterData.sort.selectedItems[0],
            tags:sortFilterData.tags.selectedItems,
            platforms:sortFilterData.platform.selectedItems,
            players:sortFilterData.players.selectedItems,
            aspect:sortFilterData.aspects.selectedItems[0],
        }
    }
}