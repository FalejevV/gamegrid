import { StringDataError } from "@/interface";

export default async function () {
    const result: {
        access_token?: string,
        status?: string,
        message?: string,
    } = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_TWITCH_SECRET}&grant_type=client_credentials`, {
        method: "POST",
    })
        .then(response => response.json())
    let formattedResult: StringDataError= {
        data: null,
        error: null,
    }
    if (result?.status) {
        formattedResult.error = result?.message || ""
        return formattedResult;
    } else {
        if (result.access_token) {
            formattedResult.data = result.access_token;
            return formattedResult;
        }
    }
    formattedResult.error = "Unknown error, getting access token";
    return formattedResult;
}
