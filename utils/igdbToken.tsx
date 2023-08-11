
export default async function () {
    const result: {
        access_token: string
    } = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_TWITCH_SECRET}&grant_type=client_credentials`, {
        method: "POST",
    })
    .then(response => response.json())
    
    return result;
}
