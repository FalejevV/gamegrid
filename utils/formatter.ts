import { IGDBGameFetch, IGDBTagIdName } from "@/interface";
import fetch from "node-fetch"

export function dateToText(date: number): string {
    let dateParse = new Date(date * 1000);
    return dateParse.getFullYear() + '-' + (dateParse.getMonth() > 8 ? (dateParse.getMonth() + 1) : "0" + (dateParse.getMonth() + 1)) + "-" + (dateParse.getDate() > 9 ? dateParse.getDate() : "0" + dateParse.getDate());
}


export function IGDBDuplicateGamesJoin<T>(games: T): T {
    if (!Array.isArray(games)) return games;
    if (games.length === 0) return games[0];

    let primaryGame = {} as T;
    games.forEach((game) => {
        // take first game from array and make it a primary game object where tags from other game objects will be joined.
        let keys: (keyof T)[] = Object.keys(game) as (keyof T)[];
        // loop through each key of every game object, looking for arrays, such as genres array, to copy all the values to the primary game
        // Example:
        /*
            game = {
                genres : [
                    { 
                        id: 1,
                        name: "Action"
                    },
                    {
                        id:2,
                        name: "Adventure"
                    }
                ],
                categories: {
                    ...same as genres...
                }
            }


        */

        keys.forEach((key: keyof T) => {
            // if item is an array, loop through each array object and extract the name;
            if (Array.isArray(game[key])) {
                game[key].forEach((item: IGDBTagIdName) => {
                    if (!item.name) {
                        // if the name is not fount, it means that it might be nested into another object   //
                        // pickicn each item key and checking it it contains a "name" property. if it is => rewrite item and proceed extraction
                        let tryItem = { ...item } as any;
                        let itemKeys: (keyof T)[] = Object.keys(item) as (keyof T)[];
                        itemKeys.forEach((itemKey: keyof T) => {
                            if (tryItem.name) return;
                            if (typeof tryItem[itemKey] !== "object") return;
                            tryItem = { ...tryItem[itemKey] };
                        })
                        if (tryItem.name) {
                            item = tryItem as IGDBTagIdName;
                        }
                    }
                    let extractedName = item.name || "";

                    if (extractedName.length > 40) return;
                    extractedName = extractedName.split("(")[0];
                    if (!primaryGame) return;

                    if (!primaryGame?.[key]) {
                        primaryGame![key] = [] as any;
                    }
                    if (Array.isArray(primaryGame[key]) && !(primaryGame[key] as string[]).includes(extractedName)) {
                        (primaryGame[key] as string[]).push(extractedName);
                    }
                })
            } else {
                if (!primaryGame || primaryGame[key]) return;
                primaryGame[key] = game[key];
            }
        })



    })

    return primaryGame;
}


// If IGSB query returns simmilar games, it combines them into one and in the result returns a list of unique games
export function fetchedIGDBGamesDuplicateFilter(games: IGDBGameFetch[]): IGDBGameFetch[] {
    let filteredGames: IGDBGameFetch[] = [];
    function searchForExistingGame(game: IGDBGameFetch): number {
        let index = -1;
        if (filteredGames.length === 0) return index;

        for (let i = 0; i < filteredGames.length - 1; i++) {
            if (index > -1) break;

            if (filteredGames[i].name === game.name) {
                index = i;
            }
        }

        return index;
    }

    function appendSimmilarGames(index: number, game: IGDBGameFetch) {
        if (filteredGames[index]) {
            if (game.genres) {
                game.genres.forEach((genre: IGDBTagIdName) => {
                    filteredGames[index].genres.push(genre);
                })
            }
            if (game.themes) {
                game.themes.forEach((theme: IGDBTagIdName) => {
                    filteredGames[index].themes.push(theme);
                })
            }
        }
    }

    games.forEach((game: IGDBGameFetch) => {
        let foundIndex = searchForExistingGame(game);
        if (foundIndex > -1) appendSimmilarGames(foundIndex, game);
        else filteredGames.push(game);
    })
    return filteredGames;
}

//images.igdb.com/igdb/image/upload/t_thumb/co49x5.jpg
export function toCoverLargeFormat(cover: string): string {
    if (!cover.trim()) return "";

    let coverSplit = cover.split("/");
    let imageFormat = "t_original";
    coverSplit[coverSplit.length - 2] = imageFormat;

    return "https:" + coverSplit.join("/");
}

