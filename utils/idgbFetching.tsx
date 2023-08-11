import igdbToken from "./igdbToken";


export async function getIGDBByGameName(name: string) {

    const token = await igdbToken();
    if (!token) return null;

    const result = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Client-ID": process.env.NEXT_TWITCH_CLIENT_ID || "",
            "Authorization": "Bearer " + token.access_token,
            "Content-Type": "application/json"
        },
        body: `fields name, genres.name, themes.name, first_release_date, cover.url; where name ~ *"${name}"*; sort first_release_date asc; limit 10;`
        })
        .then(response => response.json())
    return result;
}