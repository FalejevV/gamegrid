import { FilterQueryParams, FilteredIDPromise, Game } from "@/interface";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

let amountDefault = 3;


function generateOrderByType(order:string):[orderBy:string, {ascending:boolean}, isAspect:boolean, itTotal:boolean]{
    let orderBy = "id";
    let ascending = false
    let isAspect = false;
    let isTotal = false;
    switch (order){
        case "": {
            let orderBy = "id";
            let ascending = false
        }
        case "Recent post" : {
            orderBy = "id"
            ascending = false;
            break;
        }
        case "Old post" : {
            orderBy = "id"
            ascending = true;
            break;
        }
        case "Game: New":{
            orderBy = "release_date"
            ascending = false;
            break;
        }
        case "Game: Old":{
            orderBy = "release_date"
            ascending = true;
            break;
        }
        case "Most rated":{
            orderBy = "total"
            ascending = false;
            isAspect = true;
            isTotal = true;
            break;
        }
        case "Least rated":{
            orderBy = "total"
            ascending = true;
            isAspect = true;
            isTotal = true;
            break;
        }
        default:{
            orderBy = `${order.toLowerCase().split(" ")[0]}_avg`;
            ascending = false;
            isAspect = true;
            break;
        }
    }


    return [orderBy, {ascending},isAspect, isTotal]
}

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



export async function fetchFilteredGames(filters:FilterQueryParams):Promise<{
    data:Game[] | null,
    error:PostgrestError | null
}>{
    const supabase = createServerComponentClient({ cookies })
    let gameIds:number[] = [];
    let anyError:PostgrestError | null = null;
    let sortedByAspect:boolean = false;
    let nothingFoundOnPrevQuery = false;
    amountDefault = filters.amount || 3;

    // If tags are selected, fint games by these tags
    if(filters.tags && filters.tags.length > 0){
        const tagResponse = await filterByTags(supabase, filters.tags);
        gameIds = tagResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = tagResponse.error;
    }

    // If platforms are selected, fint games by these platforms
    if(!anyError && filters.platforms && filters.platforms.length > 0){
        const platformResponse = await filterByPlatforms(supabase, filters.platforms, gameIds);
        gameIds = platformResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = platformResponse.error;
    }

    // If player type is selected, fint games by player type
    if(!anyError && filters.players && filters.players.length > 0){
        const playersResponse = await filterByPlayers(supabase, filters.players, gameIds);
        gameIds = playersResponse.data || [];
        if(gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if(nothingFoundOnPrevQuery){
            return {data:[], error:null};
        }
        anyError = playersResponse.error;
    }


    let [orderBy, ascending,isAspect, isTotal] = generateOrderByType(filters.order || "");
    let query = supabase.from('Game').select(`
                *,
                developer:Developer(developer),
                state:ActionState(state),
                tags:GameTag(
                    Tag(tag)
                ),
                score:AverageReview(*)
        `);
    if(gameIds.length > 0) query.in("id", gameIds);
    if(!isAspect) query.order(orderBy, ascending);
    if(!isAspect) query.limit(filters.amount || amountDefault)
    let {data, error} = await query;

    if(isAspect && data && !isTotal){
        data = data.sort((a, b) => b.score[orderBy] - a.score[orderBy]).slice(0, filters.amount || amountDefault);
    }
    else if(isTotal && data){
        if(!ascending.ascending){
            data = data.sort((a, b) => b.score[orderBy] - a.score[orderBy]).slice(0, filters.amount || amountDefault);
        }else{
            data = data.sort((a, b) => a.score[orderBy] - b.score[orderBy]).slice(0, filters.amount || amountDefault);
        }
    }


    return {data, error};
    
}

