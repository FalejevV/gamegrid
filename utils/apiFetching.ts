import { GameCreationRequiredInfo, GameCreationRequiredInfoDataError, IGDBFullGameInfoDataError, StringDataError } from "@/interface";
import igdbToken from "./igdbToken";


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

export async function fetchIGDBGameByName(search: string): Promise<StringDataError> {
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





export async function APICallSupabaseGameInsertByName(name: string, date: number, company: string): Promise<IGDBFullGameInfoDataError> {
    const result: IGDBFullGameInfoDataError = await fetch('/api/supabase-game-insert', {
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


export async function getIGDBFullGameInfo(name: string, company: string): Promise<string> {
    const token = await igdbToken();
    if (token.error) return token.error;

    const result = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.data,
            "Content-Type": "application/json"
        },
        body: `fields name,platforms.name,genres.name,themes.name,cover.url,involved_companies.company.name ,total_rating_count, game_modes.name, first_release_date; where name ~ "${name}" & total_rating_count > 1 & involved_companies.company.name ~ "${company}"; sort total_rating_count desc; limit 10;`
    })
        .then(response => response.json())

    return result;
}


export async function getSupabaseGameFromNameAndDate(name: string, date: number):Promise<GameCreationRequiredInfoDataError> {
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













