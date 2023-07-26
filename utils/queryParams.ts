import { SortFilterDropdowns } from "@/store/features/sortFilter";

export interface URLQueryObject{ 
    pathname: string, 
    query: { 
        sort:string,
        tags:string[],
        platform:string[],
        players:string[],
        aspects:string[],
    }
}

export function generateSortFilterParams(sortFilterData:SortFilterDropdowns, href:string) : URLQueryObject{
    return {
        pathname: href, 
        query: { 
            sort:sortFilterData.sort.selectedItems[0],
            tags:sortFilterData.tags.selectedItems,
            platform:sortFilterData.platform.selectedItems,
            players:sortFilterData.players.selectedItems,
            aspects:sortFilterData.aspects.selectedItems,
        }
    }
}