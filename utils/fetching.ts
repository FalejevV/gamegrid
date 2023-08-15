import { StringDataError } from "@/interface";
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
        body: `fields name, total_rating, total_rating_count, genres.name, themes.name, first_release_date, cover.url, platforms.name, involved_companies.company ;where name ~ *"${name}"* & total_rating_count > 3; sort total_rating_count desc; limit 50;`
    })
        .then(response => response.json())
    return result;
}


export async function getSupabaseGameByName(name:string):Promise<StringDataError> {
    const result:StringDataError = await fetch('/api/game-by-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name 
        }),
    }).then(res => res.json())
    
    return result;
}