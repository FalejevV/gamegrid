import { PostgrestError } from "@supabase/supabase-js"

export interface Game {
    id: string
    name: string,
    developer: {
        Developer: {
            developer: string
        }
    }[],
    release_date: Date,
    tags: TagItem[]
    description: string,
    image: string,
    score: AverageScoreItem
}

export interface AverageScoreItem {
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
    total: number,
    total_hours: number,
    review_count: number,
    completion_rate: number,
    platform: number,
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
    id: number,
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


export interface IGDBFullGameInfo {
    id: number,
    cover: {
        url: string,
    },
    first_release_date: number,
    genres: string[],
    name: string,
    themes: string[],
    involved_companies: string[],
    platforms: string[],
    game_modes: string[],
    summary: string,
    image: string,
}

export interface IGDBFullGameInfoDataError {
    data: IGDBFullGameInfo | null,
    error: string | null
}

export interface GameCreationRequiredInfo {
    name: string,
    platforms: string[],
    id: number,
    image: string,
    first_release_date: number
}

export interface GameCreationRequiredInfoDataError {
    data: GameCreationRequiredInfo | null,
    error: string | null
}

export interface StringArrayDataError {
    data: string[] | null,
    error: string | null,
}

export type RatingNumber = 0 | 1 | 2 | 3 | 5 | 7 | 8 | 9 | 10

export interface GameReviewData {
    user_id: string,
    game_id: number,
    user_comment: string,
    graphics_score: number,
    sound_score: number,
    gameplay_score: number,
    level_score: number,
    balance_score: number,
    story_score: number,
    performance_score: number,
    original_score: number,
    customization_score: number,
    microtransactions_score: number,
    support_score: number,
    state_id: number,
    hours_spent: number,
    platform_played?: string,
    platform_id: number,
    total_score: number,
    finished: boolean,
    public_user_id: number,
    game_name?: string,
    game_image?: string,
    date?: Date,
    username?: string,
    release_date?: string
}

export interface GameReviewDataError {
    data: GameReviewData | null,
    error: string | null
}


export interface FullGameReviewInfo {
    game_id: number,
    user_comment: string,
    graphics_score: number,
    sound_score: number,
    gameplay_score: number,
    level_score: number,
    balance_score: number,
    story_score: number,
    performance_score: number,
    original_score: number,
    customization_score: number,
    microtransactions_score: number,
    support_score: number,
    state_id: number,
    hours_spent: number,
    platform_name: string,
    total_score: number,
    finished: boolean,
    date: Date,
    game_name: string,
    game_tags: string[],
    image?: string,
    public_user_id: number
}


export interface CollectionSummaryInfo {
    user_id?: string,
    total_games: number,
    completion_rate: number,
    tags: string[],
    total_hours: number,
    platform: string,
    average_rating: number,
    average_hours: number,
    comment_game: string,
    comment_text: string,
    last_completion: Date,
}


export interface IProfile {
    id: string,
    username: string,
    avatar: string,
    created_at: Date,
    gender: {
        gender: string,
    } | null,
    country: {
        country: string,
    } | null,
    user_id: number
}

export interface UserReviewSample {
    public_user_id: number,
    total_score: number,
    finished: boolean,
    hours_spent: number,
    game: {
        name: string,
        id: number,
        image: string
    }
}

export interface UserReviewSampleDataError {
    data: UserReviewSample[] | null,
    error: string | null
}


export interface IValueFilter {
    0: string,
    10: string,
    20: string,
    30: string,
    40: string
    50: string,
    60: string
    70: string,
    80: string,
    90: string,
    100: string
}