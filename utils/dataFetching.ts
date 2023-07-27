import { FilteredIDPromise, Game } from "@/interface";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/// Accepts array of Tags. Returns array of games, that have these tags.
async function filterByTags(supabase:SupabaseClient, tags:string[]):Promise<FilteredIDPromise>{
    let { data, error } = await supabase.rpc('get_games_by_tags', { tags });
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

// Accepts arraof Platforms, returns array of games, that have these platforms
async function filterByPlatforms(supabase:SupabaseClient, platforms:string[], gameids:number[]):Promise<FilteredIDPromise>{
    const { data, error } = await supabase.rpc('get_games_by_platforms', { platforms, gameids });
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}

// Accepts arraof Players, returns array of games, that have these players
async function filterByPlayers(supabase:SupabaseClient, players:string[], gameids:number[]):Promise<FilteredIDPromise>{
    const { data, error } = await supabase.rpc('get_games_by_players_and_ids', { players, gameids });
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}


// Filter games by selected aspect, returns array of game ids
async function filterByAspect(supabase:SupabaseClient, aspect:string, gameids:number[]):Promise<FilteredIDPromise>{
    const { data, error } = await supabase.rpc('get_games_by_rating', { gameids, aspect});
    let resultArray:number[] = [];
    if(data){
        data.forEach((filteredItem:{id:number}) => resultArray.push(filteredItem.id));
    }
    return { data:resultArray, error};
}



export async function fetchFilteredGames(filters:{}):Promise<{
    data:Game[] | null,
    error:PostgrestError | null
}>{
    const supabase = createServerComponentClient({ cookies })
    let gameIds = [];
    const tagResponse = await filterByTags(supabase, []);
    gameIds = tagResponse.data || [];


    const platformResponse = await filterByPlatforms(supabase, [], tagResponse.data);
    gameIds = platformResponse.data || [];


    const playersResponse = await filterByPlayers(supabase, [], gameIds);
    gameIds = playersResponse.data || [];

    const aspectResponse = await filterByAspect(supabase, "support_avg", []);
    console.log(aspectResponse.data);
    console.log(aspectResponse.error);
    



    
    let query = supabase.from('Game');
    let {data, error} = await query.select(`
            *,
            developer:Developer(developer),
            state:ActionState(state),
            tags:GameTag(
                Tag(tag)
            ),
            score:AverageReview(*)
        `).order("release_date", {ascending:true})
    return {data, error};
}


