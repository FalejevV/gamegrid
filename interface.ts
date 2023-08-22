import { PostgrestError } from "@supabase/supabase-js"

export interface Game {
    id: string
    name: string,
    developer: {
        developer: string
    }
    release_date: Date,
    tags: TagItem[]
    description: string,
    image: string,
    score: AverageScoreItem
}

export interface AverageScoreItem {
    id: number,
    game_id: number,
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
    total: number
}

export interface TagItem {
    Tag: {
        tag: string
    }
}

export interface ScoreItem {
    title: string,
    value: number
}

export interface ScoreNameList {
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

export interface GameSortFilterParams {
    sort: "string"
}

export interface FilteredIDPromise {
    data: number[],
    error: PostgrestError | null
}


export interface FilterQueryParams {
    order: string | undefined,
    tags: string[] | undefined,
    platforms: string[] | undefined,
    players: string | undefined,
    developer: string | undefined,
    amount: number,
}
export interface IGDBTagIdName {
    id: string,
    name: string,
}

export interface IGDBGameFetch {
    id:number,
    cover: {
        url: string,
    },
    first_release_date: number,
    genres: IGDBTagIdName[]
    name: string,
    themes: IGDBTagIdName[],
    involved_companies: {
        company: IGDBTagIdName
    }[]
}

export interface StringDataError {
    data: string | null,
    error: string | null,
}

export interface ScoreList {
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
    total: number
}


export interface IGDBFullGameInfo{
    id:number,
    cover: {
        url: string,
    },
    first_release_date: number,
    genres: string[], 
    name: string,
    themes: string[],
    involved_companies: string[],
    platforms:string[],
    game_modes:string[],
    summary:string,
    image:string,
}

export interface IGDBFullGameInfoDataError{
    data: IGDBFullGameInfo | null,
    error: string | null
}

export interface GameCreationRequiredInfo{
    name:string,
    platforms:string[],
    id:number,
    image:string,
    first_release_date:number
} 

export interface GameCreationRequiredInfoDataError{
    data: GameCreationRequiredInfo | null,
    error: string | null    
}

export interface StringArrayDataError{
    data:string[] | null,
    error:string | null,
}

export type RatingNumber = 0 | 1 | 2 | 3 | 5 | 7 | 8 | 9 | 10