import { FilterQueryParams, FilteredIDPromise, Game } from "@/interface";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const amountDefault = 3;

/// Accepts array of Tags. Returns array of games, that have these tags.
async function filterByTags(supabase:SupabaseClient, tags:string[]):Promise<FilteredIDPromise>{
    if(typeof tags === "string") tags = [tags];
    let { data, error } = await supabase.rpc('get_games_by_all_tags', { tags }).select("id");
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

// Accepts arraof Platforms, returns array of games, that have these platforms
async function filterByPlatforms(supabase:SupabaseClient, platforms:string[], gameids:number[]):Promise<FilteredIDPromise>{
    if(typeof platforms === "string") platforms = [platforms];
    const { data, error } = await supabase.rpc('get_games_by_platforms', { platforms, gameids }).select("id");
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

// Accepts arraof Players, returns array of games, that have these players
async function filterByPlayers(supabase:SupabaseClient, players:string[], gameids:number[]):Promise<FilteredIDPromise>{
    if(typeof players === "string") players = [players];
    const { data, error } = await supabase.rpc('get_games_by_players_and_ids', { players, gameids }).select("id");
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

// Filter games by selected aspect, returns array of game ids
async function filterByAspect(supabase:SupabaseClient, aspect:string, gameids:number[]):Promise<FilteredIDPromise>{
    const { data, error } = await supabase.rpc('get_games_by_rating', { gameids, aspect}).select("id");
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

export async function fetchFilteredGames(filters:FilterQueryParams):Promise<{
    data:Game[] | null,
    error:PostgrestError | null
}>{
    const supabase = createServerComponentClient({ cookies })
    let gameIds:number[] = [];
    let anyError:PostgrestError | null = null;
    let sortedByAspect:boolean = false;
    let nothingFoundOnPrevQuery = false;

    if(filters.tags && filters.tags.length > 0){
        const tagResponse = await filterByTags(supabase, filters.tags);
        gameIds = tagResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = tagResponse.error;
    }

    if(!anyError && filters.platforms && filters.platforms.length > 0){
        const platformResponse = await filterByPlatforms(supabase, filters.platforms, gameIds);
        gameIds = platformResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = platformResponse.error;
    }

    if(!anyError && filters.players && filters.players.length > 0){
        const playersResponse = await filterByPlayers(supabase, filters.players, gameIds);
        gameIds = playersResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = playersResponse.error;
    }


    if(!anyError && filters.aspect && filters.aspect.trim() !== "" && filters.aspect.trim() !== "none"){
        let convertedAspect = `${filters.aspect.toLowerCase()}_avg`;
        const aspectResponse = await filterByAspect(supabase, convertedAspect, gameIds);
        anyError = aspectResponse.error;
        gameIds = aspectResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        sortedByAspect = true;
    }
    if(anyError){
        return {data:null, error:anyError};
    }

    if(gameIds.length > 0){
        let sortedData:Game[] = [];
        let query = supabase.from('Game');
        let {data, error} = await query.select(`
                *,
                developer:Developer(developer),
                state:ActionState(state),
                tags:GameTag(
                    Tag(tag)
                ),
                score:AverageReview(*)
        `).in("id", gameIds).limit(filters.amount || amountDefault)
        
        if(data && data.length > 0 && gameIds.length > 0 && sortedByAspect){
            sortedData = gameIds.map((id:number) => data?.find((item:Game) => Number(item.id) === id)) || [];
            return {data:sortedData, error};
        }
        return {data, error};
    }else{
        let query = supabase.from('Game');
        let {data, error} = await query.select(`
                *,
                developer:Developer(developer),
                state:ActionState(state),
                tags:GameTag(
                    Tag(tag)
                ),
                score:AverageReview(*)
        `).limit(filters.amount || amountDefault);
        return {data, error};
    }
    
}

