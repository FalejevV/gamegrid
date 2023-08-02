import { PostgrestError } from "@supabase/supabase-js"

export interface Game{
    id:string
    name:string,
    developer:{
        developer:string
    }
    release_date:Date,
    tags: TagItem[]
    description:string,
    image:string,
    score:AverageScoreItem
}

export interface AverageScoreItem{
    id:number,
    game_id:number,
    graphics_avg: number,
    sound_avg: number,
    gameplay_avg: number,
    level_avg: number,
    balance_avg: number,
    story_avg: number,
    performance_avg: number,
    original_avg: number,
    customization_avg: number,
    microtransactions_avg: number,
    support_avg: number,
    total:number
}

export interface TagItem{
    Tag:{
        tag:string
    }
}

export interface ScoreItem{
    title:string,
    value:number
}

export interface ScoreNameList{
    none:string,
    graphics: string,
    sound: string,
    gameplay: string,
    level: string,
    balance: string,
    story: string,
    performance: string,
    original: string,
    customization: string,
    microtransactions: string,
    support: string,
}

export interface GameSortFilterParams{
    sort:"string"
}

export interface FilteredIDPromise{
    data:number[],
    error:PostgrestError | null
}


export interface FilterQueryParams{
    order:string | undefined,
    tags:string[] | undefined,
    platforms:string[] | undefined,
    players:string[] | undefined,
    amount:number
}