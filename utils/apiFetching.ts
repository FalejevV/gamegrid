import { GameCreationRequiredInfoDataError, GameReviewData, GameReviewDataError, GameReviewSampleDataError, IGDBFullGameInfo, IGDBFullGameInfoDataError, StringArrayDataError, StringDataError, UserReviewSampleDataError } from "@/interface";
import igdbToken from "./igdbToken";
import supabaseServer from "./supabaseServer";
import supabaseClient from "./supabaseClient";
import { error } from "console";


export async function getIGDBByGameName(name: string) {

    const token = await igdbToken();
    if (token.error) return token;

    const result = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields name, total_rating, total_rating_count, genres.name, themes.name, first_release_date, cover.url, platforms.name, involved_companies.company.name ;where name ~ *"${name}"* & total_rating_count > 3; sort total_rating_count desc; limit 50;`
    })
        .then(response => response.json())
    return result;
}

export async function APIfetchIGDBGameByName(search: string): Promise<StringDataError> {
    const result = await fetch('/api/igdb-game-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: search
        }),
    }).then(res => res.json()).then(data => {
        let result: StringDataError = {
            data: null,
            error: null
        }
        if (data.error) {
            result.error = data.error.error
            return result;
        } else {
            result.data = data.data;
            return result;
        }
    });

    return result;
}





export async function APICallSupabaseGameInsertByNameDateCompany(name: string, date: number, company: string): Promise<GameCreationRequiredInfoDataError> {
    const result: GameCreationRequiredInfoDataError = await fetch('/api/supabase-game-insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            date: date,
            company: company
        }),
    }).then(res => res.json())
    return result;
}


export async function APICallSupabaseUserReviewsSelect(publicId: number, amount: number, offset: number) {
    const result: UserReviewSampleDataError = await fetch('/api/supabase-get-user-reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            publicId,
            amount,
            offset
        }),
    }).then(res => res.json())

    return result;
}

export async function APICallSupabaseGameReviewsSelect(gameId: number | string, amount: number, offset: number) {
    const result: GameReviewSampleDataError = await fetch('/api/supabase-get-game-reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gameId,
            amount,
            offset
        }),
    }).then(res => res.json())

    return result;
}




export async function APICallIGDBGameDevelopersByNameDate(name: string, date: number) {
    const result: IGDBFullGameInfoDataError = await fetch('/api/igdb-game-developers-by-name-and-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            date: date,
        }),
    }).then(res => res.json())
    return result;
}


export async function getIGDBFullGameInfo(name: string, company: string): Promise<IGDBFullGameInfoDataError> {
    const token = await igdbToken();
    if (token.error) return {
        data: null,
        error: token.error,
    }

    const result = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields name,platforms.name,genres.name,summary,themes.name,cover.url,involved_companies.company.name ,total_rating_count, game_modes.name, first_release_date; where name ~ "${name}" & total_rating_count > 1 & involved_companies.company.name ~ "${company}"; sort total_rating_count desc; limit 10;`
    })
        .then(response => response.json())

    if (result.message) {
        return {
            data: null,
            error: result.message
        }
    }
    return {
        data: result,
        error: null
    };
}


export async function APIgetSupabaseGameFromNameAndDate(name: string, date: number): Promise<GameCreationRequiredInfoDataError> {
    const result: GameCreationRequiredInfoDataError = await fetch('/api/supabase-game-by-name-and-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            date: date,
        }),
    }).then(res => res.json())
    return result;
}

export async function APIgetUserReviewByGameNameAndDate(userId: string, gameId: number): Promise<GameReviewDataError> {

    const result: GameReviewDataError = await fetch('/api/supabase-get-review-by-name-and-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            gameId
        }),
    }).then(res => res.json())

    return {
        data: result.data || null,
        error: result.error || null
    }
}


export async function APIputGameReview(game: GameReviewData): Promise<StringDataError> {
    let userId = "";
    await supabaseClient.auth.getUser().then(res => {
        if (res.data && res.data.user) {
            userId = res.data.user.id.toString();
        }
    })
    if (userId === "") {
        return {
            data: null,
            error: "Auth error"
        }
    }

    const result: StringDataError = await fetch("/api/game-review-put", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
            game
        }),
    }).then(res => res.json())

    return result;
}

export async function getIGDBGameDevelopersByNameAndDate(name: string, date: number): Promise<StringArrayDataError> {

    const token = await igdbToken();
    if (token.error) return { data: null, error: token.error };

    const gameResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields name,involved_companies, first_release_date; where name ~ "${name}" & total_rating_count > 1 & first_release_date = ${date}; limit 10;`
    })


    const gameData = await gameResponse.json();

    if (!gameData[0] || !gameData[0].involved_companies) {
        return { data: null, error: null };
    }

    const involvedCompaniesResponse = await fetch("https://api.igdb.com/v4/involved_companies", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields company; where id=(${gameData[0].involved_companies.join(",")}); sort created_at desc;`
    })
    const involvedCompaniesData = await involvedCompaniesResponse.json();

    // Filter out developer companies
    const developerCompanyIds = involvedCompaniesData
        .map((company: { company: number }) => company.company);

    const companiesResponse = await fetch("https://api.igdb.com/v4/companies", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields name; where id=(${developerCompanyIds.join(",")});`
    })

    const companiesData = await companiesResponse.json();
    const developerNames = companiesData.map((company: { name: string }) => company.name);
    return { data: developerNames, error: null };
}



export async function APISupabaseAvailabilityProfileCheck(column: string, value: string | number, user_id: number): Promise<StringDataError> {
    const result: StringDataError = await fetch("/api/profile-availability-check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            column,
            value,
            user_id
        }),
    }).then(res => res.json())

    return result;
}

export async function APISupabaseAvatarInsert(image: File):Promise<StringDataError> {
    const formData = new FormData();
    formData.append('image', image);
    const result: StringDataError = await fetch("/api/profile-avatar-update", {
        method: 'POST',
        body: formData 
    }).then(res => res.json())

    return result;
}





