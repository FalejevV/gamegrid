import { URLQueryObject } from "./queryParams";


export function isQueryFilterDifferent(params: URLSearchParams, generatedParams: URLQueryObject) {
    let orderParams = params.getAll("order").sort().toString();
    let orderGenerated = [generatedParams.query.order].sort().toString();

    let tagsParams = params.getAll("tags").sort().toString();
    let tagsGenerated = [generatedParams.query.tags].sort().toString();

    let playersParams = params.getAll("players").sort().toString();
    let playersGenerated = [generatedParams.query.players].sort().toString();

    let developerParams = params.getAll("developer").sort().toString();
    let developerGenerated = [generatedParams.query.developer].sort().toString();

    let platformParams = params.getAll("platforms").sort().toString();
    let platformGenerated = [generatedParams.query.platforms].sort().toString();
    if (orderParams !== orderGenerated || tagsParams !== tagsGenerated || playersParams !== playersGenerated || developerParams !== developerGenerated || platformParams !== platformGenerated) {
       return true; 
    }
    return false;
}