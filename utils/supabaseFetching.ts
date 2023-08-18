import { FilterQueryParams, FilteredIDPromise, Game, GameCreationRequiredInfo, GameCreationRequiredInfoDataError, StringDataError } from "@/interface";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import supabaseServer from "./supabaseServer";
import { getIGDBFullGameInfo } from "./apiFetching";
import { IGDBDuplicateGamesJoin } from "./formatter";

let amountDefault = 3;


function generateOrderByType(order: string): [orderBy: string, ascending: { ascending: boolean }, isAspect: boolean, itTotal: boolean] {
    let orderBy = "id";
    let ascending = false
    let isAspect = false;
    let isTotal = false;
    switch (order) {
        case "": {
            let orderBy = "id";
            let ascending = false
        }
        case "Recent post": {
            orderBy = "id"
            ascending = false;
            break;
        }
        case "Old post": {
            orderBy = "id"
            ascending = true;
            break;
        }
        case "Game: New": {
            orderBy = "release_date"
            ascending = false;
            break;
        }
        case "Game: Old": {
            orderBy = "release_date"
            ascending = true;
            break;
        }
        case "Most rated": {
            orderBy = "total"
            ascending = false;
            isAspect = true;
            isTotal = true;
            break;
        }
        case "Least rated": {
            orderBy = "total"
            ascending = true;
            isAspect = true;
            isTotal = true;
            break;
        }
        default: {
            orderBy = `${order.toLowerCase().split(" ")[0]}_avg`;
            ascending = false;
            isAspect = true;
            break;
        }
    }


    return [orderBy, { ascending }, isAspect, isTotal]
}

/// Accepts array of Tags. Returns array of games, that have these tags.
async function filterByTags(supabase: SupabaseClient, tags: string[]): Promise<FilteredIDPromise> {
    if (typeof tags === "string") tags = [tags];
    let { data, error } = await supabase.rpc('get_games_by_tags', { tags })
    let resultArray: number[] = [];
    if (data) {
        data.forEach((filteredItem: { id: number }) => resultArray.push(filteredItem.id));
    }
    return { data: resultArray, error };
}

// Accepts arraof Platforms, returns array of games, that have these platforms
async function filterByPlatforms(supabase: SupabaseClient, platforms: string[], gameids: number[]): Promise<FilteredIDPromise> {
    if (typeof platforms === "string") platforms = [platforms];
    const { data, error } = await supabase.rpc('get_games_by_any_platforms', { platform_names: platforms, game_ids: gameids })
    let resultArray: number[] = [];
    if (data) {
        data.forEach((filteredItem: { game_id: number }) => resultArray.push(filteredItem.game_id));
    }
    return { data: resultArray, error };
}
// Accepts arraof Players, returns array of games, that have these players
async function filterByPlayers(supabase: SupabaseClient, players: string, gameids: number[]): Promise<FilteredIDPromise> {
    const { data, error } = await supabase.rpc('get_games_by_one_player', { player_name: players, game_ids: gameids })
    let resultArray: number[] = [];
    if (data) {
        data.forEach((filteredItem: { game_id: number }) => resultArray.push(filteredItem.game_id));
    }
    return { data: resultArray, error };
}

async function filterByDevelopers(supabase: SupabaseClient, developer: string, gameids: number[]): Promise<FilteredIDPromise> {
    const { data, error } = await supabase.rpc('get_games_by_developer', { developer_name: developer, game_ids: gameids })
    let resultArray: number[] = [];
    if (data) {
        data.forEach((filteredItem: { game_id: number }) => resultArray.push(filteredItem.game_id));
    }
    return { data: resultArray, error };
}

async function sortByAspect(supabase: SupabaseClient, aspect: string, gameids: number[] | null, sort: "asc" | "desc"): Promise<FilteredIDPromise> {
    if (gameids && gameids.length === 0) {
        gameids = null
    }
    const { data, error } = await supabase.rpc('get_review_game_ids_by_aspect_and_game_ids', { aspect, gameids, sort }).limit(amountDefault)
    return { data, error };
}



export async function fetchFilteredGames(filters: FilterQueryParams, offset: number = 0): Promise<{
    data: Game[] | null,
    error: PostgrestError | null
}> {
    const supabase = supabaseServer();
    let gameIds: number[] = [];
    let anyError: PostgrestError | null = null;
    let sortedByAspect: boolean = false;
    let nothingFoundOnPrevQuery = false;
    amountDefault = filters.amount || 3;

    // If tags are selected, fint games by these tags
    if (filters.tags && filters.tags.length > 0) {
        const tagResponse = await filterByTags(supabase, filters.tags);
        gameIds = tagResponse.data || [];
        if (gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if (nothingFoundOnPrevQuery) {
            return { data: [], error: null };
        }
        anyError = tagResponse.error;
    }

    // If platforms are selected, fint games by these platforms
    if (!anyError && filters.platforms && filters.platforms.length > 0) {
        const platformResponse = await filterByPlatforms(supabase, filters.platforms, gameIds);
        gameIds = platformResponse.data || [];
        if (gameIds.length === 0) nothingFoundOnPrevQuery = true;

        if (nothingFoundOnPrevQuery) {
            return { data: [], error: null };
        }
        anyError = platformResponse.error;
    }

    // If player type is selected, fint games by player type
    if (!anyError && filters.players && filters.players.length > 0) {
        const playersResponse = await filterByPlayers(supabase, filters.players, gameIds);
        gameIds = playersResponse.data || [];
        if (gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if (nothingFoundOnPrevQuery) {
            return { data: [], error: null };
        }
        anyError = playersResponse.error;
    }


    if (!anyError && filters.developer) {
        const developerResponse = await filterByDevelopers(supabase, filters.developer, gameIds);
        gameIds = developerResponse.data || [];
        if (gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if (nothingFoundOnPrevQuery) {
            return { data: [], error: null };
        }
        anyError = developerResponse.error;
    }

    let [orderBy, ascending, isAspect, isTotal] = generateOrderByType(filters.order || "");
    if (isAspect && !anyError && filters.order) {
        let orderType: "asc" | "desc" = ascending.ascending ? "asc" : "desc";
        const aspectResponse = await sortByAspect(supabase, orderBy, gameIds, orderType);

        gameIds = aspectResponse.data || [];
        if (gameIds.length === 0) nothingFoundOnPrevQuery = true;
        if (nothingFoundOnPrevQuery) {
            return { data: [], error: null };
        }
        anyError = aspectResponse.error;
    }

    let query = supabase.from('Game').select(`
                *,
                developer:Developer(developer),
                state:ActionState(state),
                tags:GameTag(
                    Tag(tag)
                ),
                score:AverageReview(*)
    `);

    if (gameIds.length > 0) query.in("id", gameIds);
    if (!isAspect) {
        query.order(orderBy, ascending);
        query.range(offset, offset + amountDefault - 1);
    } else {
        query.order('id', ascending)
    }

    let { data, error } = await query;



    if (isTotal) {
        let result: Game[] = [];
        result = gameIds.map((id) => {
            if (data) {
                return data.find((game) => game.id === id)
            }
        }).slice(0, amountDefault)
        return { data: result, error };
    }
    return { data, error };

}

export async function supabaseGameInsertByNameDateCompany(name: string, date: number, company: string): Promise<StringDataError> {
    // checking if game name already exists in supabase table.
    let { data, error } = await getSupabaseGameByNameAndDate(name, date);
    if (data) return {
        data: null,
        error: null
    }
    if (error) return { data: null, error: error };

    let IGDBStringFetch = await getIGDBFullGameInfo(name, company);
    // fetching from IGDB return error object instead of games array.
    if (!Array.isArray(IGDBStringFetch)) {
        return { data: null, error: IGDBStringFetch };
    }

    const combinedDuplicateGame = IGDBDuplicateGamesJoin(IGDBStringFetch);

    return { data: combinedDuplicateGame, error: null }
}


export async function getSupabaseGameByNameAndDate(name: string, date: number): Promise<GameCreationRequiredInfoDataError> {
    const supabase = supabaseServer();
    const formattedDate = new Date(date * 1000).toISOString();
    const extractedDate = formattedDate.split('T')[0];

    const { data, error } = await supabase.rpc('get_game_and_platforms', {
        game_name_param: name,
        game_release_date_param: extractedDate
    });
    let errorString = error?.message || null;

    if (data.length > 0) {
        let game:GameCreationRequiredInfo = {...data[0], platforms: [data[0].platform]};

        data.forEach((item: { platform: string }, index: number) => {
            if (index !== 0) {
                if (!game.platforms.includes(item.platform)) {
                    game.platforms.push(item.platform);
                }
            }
        })

        return (
            { data: game, error: null }
        )
    }
    return { data: null, error: errorString };
}