import { AverageScoreItem, FilterQueryParams, FilteredIDPromise, Game, GameCreationRequiredInfo, GameCreationRequiredInfoDataError, GameReviewData, GameReviewDataError, IGDBFullGameInfo, IGDBFullGameInfoDataError, StringArrayDataError, StringDataError } from "@/interface";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import supabaseServer from "./supabaseServer";
import { getIGDBFullGameInfo, getIGDBGameDevelopersByNameAndDate } from "./apiFetching";
import { IGDBDuplicateGamesJoin, toAverageScore, toCoverLargeFormat } from "./formatter";
import supabaseRootClient from "./supabaseRootClient";
import { fetchImageToBuffer } from "./imageFormat";

let amountDefault = 3;

const supabaseRoot = supabaseRootClient();
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
    query.eq("state_id", 5);

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

// Function checks by name date and company is a game exists in a supabase.
// If not, it fetches the game from the IGDB, then processes it and inserts it into the supabase table.
export async function supabaseGameInsertByNameDateCompany(name: string, date: number, company: string): Promise<IGDBFullGameInfoDataError> {

    // checking if game name already exists in supabase table.
    let { data, error } = await getSupabaseGameByNameAndDate(name, date);
    if (data) {
        return {
            data: null,
            error: null
        }
    }
    if (error) return { data: null, error: error };


    // getting correct game developer information
    const developersResponse: StringArrayDataError = await getIGDBGameDevelopersByNameAndDate(name, date);
    const developersList = developersResponse.data || [] as string[];


    // if game doesn't exist in supabase table, fetch it from IGDB.
    let IGDBFetch: IGDBFullGameInfoDataError = await getIGDBFullGameInfo(name, company);
    // return if fetch errors
    if (IGDBFetch.error || !IGDBFetch.data) return IGDBFetch;


    // Merging duplicate games selection
    let combinedDuplicateGame = IGDBDuplicateGamesJoin(IGDBFetch.data) as IGDBFullGameInfo | IGDBFullGameInfo[];

    if (Array.isArray(combinedDuplicateGame)) combinedDuplicateGame = { ...combinedDuplicateGame[0] };
    combinedDuplicateGame.image = toCoverLargeFormat(combinedDuplicateGame.cover.url);


    // insert all missing information in supabase tables
    let promisesResult = await Promise.all([
        insertSupabasePlatforms(combinedDuplicateGame.platforms),
        insertSupabaseTags([...combinedDuplicateGame.genres, ...combinedDuplicateGame.themes]),
        insertSupabaseDevelopers(developersList),
        insertSupabasePlayers(combinedDuplicateGame.game_modes)
    ])


    // React errors from promiseResultArray
    let promiseError: null | string = null;
    promisesResult.forEach((result: StringDataError) => {
        if (promiseError) return;
        if (result.error) {
            promiseError = result.error
        }
    })
    if (error) return { error, data: null }


    // uploading supabase imagei into storage
    let { data: imageData, error: imageError } = await uploadSupabaseImage(combinedDuplicateGame.cover.url, combinedDuplicateGame.name + combinedDuplicateGame.first_release_date);
    if (imageError) return {
        data: null,
        error: "Could not upload game image to server." + imageError
    }

    // inserting a game into supabase Game table and getting its game ID.
    let { data: gameInsertId, error: gameInsertError } = await insertSupabaseGame(combinedDuplicateGame, imageData || "");
    if (imageError) return { data: null, error: gameInsertError }


    // using the game ID we create many to many inserts into various tables.
    let manyToManyResult = await Promise.all([
        insertSupabaseGameManyRelationData(Number(gameInsertId), combinedDuplicateGame.platforms, "Platform"),
        insertSupabaseGameManyRelationData(Number(gameInsertId), [...combinedDuplicateGame.genres, ...combinedDuplicateGame.themes], "Tag"),
        insertSupabaseGameManyRelationData(Number(gameInsertId), combinedDuplicateGame.game_modes, "Player"),
        insertSupabaseGameManyRelationData(Number(gameInsertId), developersList, "Developer"),
    ]);
    // Cheking for promise manyToManyResult errors
    let manyToManyError: null | string = null;
    promisesResult.forEach((result: StringDataError) => {
        if (manyToManyError) return;
        if (result.error) {
            manyToManyError = result.error
        }
    })
    if (manyToManyError) return { error: manyToManyError, data: null }

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
        let game: GameCreationRequiredInfo = { ...data[0], platforms: [data[0].platform] };

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


async function insertSupabasePlatforms(platforms: string[]): Promise<StringDataError> {
    const { data, error } = await supabaseRoot.rpc("insert_platforms", { platform_names: platforms });

    if (error?.message) {
        return { data: null, error: error.message };
    }

    return { data: "OK", error: error?.message || null };
}

async function insertSupabaseTags(tags: string[]): Promise<StringDataError> {
    const { data, error } = await supabaseRoot.rpc("insert_tags", { tag_names: tags });

    if (error?.message) {
        return { data: null, error: error.message };
    }

    return { data: "OK", error: error?.message || null };
}


async function insertSupabaseDevelopers(developers: string[]): Promise<StringDataError> {
    const { data, error } = await supabaseRoot.rpc('insert_developers', { developer_names: developers });

    if (error?.message) {
        return { data: null, error: error.message };
    }

    return { data: "OK", error: error?.message || null };
}

async function insertSupabasePlayers(players: string[]): Promise<StringDataError> {
    const { data, error } = await supabaseRoot.rpc('insert_game_modes', { game_mode_names: players });

    if (error?.message) {
        return { data: null, error: error.message };
    }

    return { data: "OK", error: error?.message || null };
}

// function converts fetched cover image from IGDB to a buffer, and passes it to uploadToSupabaseAction below
async function uploadSupabaseImage(URL: string, imageName: string) {
    const fetchedImage = await fetchImageToBuffer(URL);
    if (!fetchedImage) {
        return { data: null, error: "Could not convert image" }
    }

    const { data, error } = await uploadToSupabaseAction(fetchedImage, imageName);
    return { data: data, error: error }
}



// performs supabase storage image upload and returns a url to an image
async function uploadToSupabaseAction(webpBuffer: Buffer, imageName: string): Promise<StringDataError> {
    const { error } = await supabaseRoot.storage.from('gamegrid').upload(`images/${imageName}.webp`, webpBuffer, {
        contentType: 'image/webp',
        upsert: true
    });
    if (error) {
        return { data: null, error: error.message }
    } else {
        return { data: `https://kvwtrzxxikuvdjmcwofc.supabase.co/storage/v1/object/public/gamegrid/images/${imageName}.webp`, error: null }
    }
};

// Insert game into Game table, return inserted game id
async function insertSupabaseGame(game: IGDBFullGameInfo, imageURL: string): Promise<StringDataError> {
    const { data, error } = await supabaseRoot
        .from('Game')
        .insert({
            name: game.name,
            release_date: new Date(game.first_release_date * 1000).toISOString(),
            description: game.summary,
            image: imageURL,
            state_id: 2
        }).select().single()

    return { data: data.id, error: error?.message || null }
}


// Function that performs many to many relation inserts into tables
async function insertSupabaseGameManyRelationData(gameId: number, items: string[], tableName: string): Promise<StringDataError> {
    let supabase = supabaseServer();
    const { data, error } = await supabase.from(tableName).select("id").in(tableName.toLowerCase(), items);
    if (error) return { data: null, error: error.message };

    let entries = data.map((item: { id: number }) => {
        return {
            game_id: gameId,
            [`${tableName.toLowerCase()}_id`]: item.id
        }
    })

    let { error: insertError } = await supabaseRoot.from(`Game${tableName}`).insert(entries);
    if (insertError) return { data: null, error: insertError.message }


    return { data: "OK", error: null };
}

async function getSupabasePlatformIdByPlatformName(platformName: string = ""): Promise<StringDataError> {

    const { data, error } = await supabaseRoot.from("Platform").select("id").eq("platform", platformName).single();

    return {
        data: data?.id || null,
        error: error?.message || null
    }
}

export async function getSupabasePlatformNameByPlatformId(platformId: number): Promise<StringDataError>{
    const {data, error} = await supabaseRoot.from("Platform").select("platform").eq("id", platformId).single();

    return {
        data: data?.platform || null,
        error: error?.message || null
    }
}

async function supabaseUserIdByUserUID(userId: string): Promise<StringDataError> {
    if (!userId) return {
        data: null,
        error: "Auth error"
    }

    const { data, error } = await supabaseRoot
        .from('profile')
        .select('user_id')
        .eq('id', userId)
        .single();

    if (error) {
        return {
            data: null,
            error: error.message
        }
    }

    if (!data.user_id) return {
        data: null,
        error: "user_id not found in database"
    }

    return {
        data: data.user_id,
        error: null
    }

}

export async function insertSupabaseReview(userId: string, game: GameReviewData): Promise<StringDataError> {
    let userRequest: StringDataError = await supabaseUserIdByUserUID(userId);
    if (userRequest.error || !userRequest.data) return {
        data: null,
        error: userRequest.error
    }

    if (!game.platform_played) {
        return {
            data: null,
            error: "platform is not provided"
        }
    }
    let platformRequest = await getSupabasePlatformIdByPlatformName(game.platform_played);
    if (platformRequest.error && !platformRequest.data) return {
        data: null,
        error: "could not find platform in supabase. Sorry..."
    }

    game.platform_id = Number(platformRequest.data) || 0;
    game.user_id = userId;
    

    delete game.platform_played;

    const { data, error } = await supabaseRoot
        .from('Review')
        .upsert(game);

    if (!data && !error) {
        updateAverageReviewData(game.game_id);
    }

    return {
        data: data || "OK",
        error: error?.message || null
    }
}



async function updateAverageReviewData(gameId: number) {
    const { data, error } = await supabaseRoot.from("Review").select("*").eq("game_id", gameId);
    if (data) {
        const averageReview: AverageScoreItem = toAverageScore(data);
        if (averageReview) {
            supabaseRoot.from("AverageReview")
                .upsert(averageReview).then(res => { });
        }
    }

    return {
        data: data || null,
        error: error?.message || null
    }
}

export default async function getSupabaseUserGameReview(userId: string, gameId: number): Promise<GameReviewDataError> {
    const result = await supabaseRoot.from("Review").select("*").eq("user_id", userId).eq("game_id", gameId).single();

    return {
        data: result.data || null,
        error: result.error?.message || null 
    }
}