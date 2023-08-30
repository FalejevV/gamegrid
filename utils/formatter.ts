import { AverageScoreItem, CollectionSummary, FullGameReviewInfo, GameReviewData, IGDBGameFetch, IGDBTagIdName } from "@/interface";
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


export function toAverageScore(games: GameReviewData[]): AverageScoreItem {
    let resultGame: AverageScoreItem = {
        game_id: 0,
        graphics_avg: 0,
        sound_avg: 0,
        gameplay_avg: 0,
        level_avg: 0,
        balance_avg: 0,
        story_avg: 0,
        performance_avg: 0,
        original_avg: 0,
        customization_avg: 0,
        microtransactions_avg: 0,
        support_avg: 0,
        total: 0
    };

    games.forEach((game: GameReviewData) => {
        resultGame.game_id = game.game_id;
        resultGame.graphics_avg += game.graphics_score;
        resultGame.sound_avg += game.sound_score;
        resultGame.gameplay_avg += game.gameplay_score;
        resultGame.level_avg += game.level_score;
        resultGame.balance_avg += game.balance_score;
        resultGame.story_avg += game.story_score;
        resultGame.performance_avg += game.performance_score;
        resultGame.original_avg += game.original_score;
        resultGame.customization_avg += game.customization_score;
        resultGame.microtransactions_avg += game.microtransactions_score;
        resultGame.support_avg += game.support_score;
        resultGame.total += game.total_score;
    });

    resultGame.graphics_avg = Math.floor(resultGame.graphics_avg / games.length);
    resultGame.sound_avg = Math.floor(resultGame.sound_avg / games.length);
    resultGame.gameplay_avg = Math.floor(resultGame.gameplay_avg / games.length);
    resultGame.level_avg = Math.floor(resultGame.level_avg / games.length);
    resultGame.balance_avg = Math.floor(resultGame.balance_avg / games.length);
    resultGame.story_avg = Math.floor(resultGame.story_avg / games.length);
    resultGame.performance_avg = Math.floor(resultGame.performance_avg / games.length);
    resultGame.original_avg = Math.floor(resultGame.original_avg / games.length);
    resultGame.customization_avg = Math.floor(resultGame.customization_avg / games.length);
    resultGame.microtransactions_avg = Math.floor(resultGame.microtransactions_avg / games.length);
    resultGame.support_avg = Math.floor(resultGame.support_avg / games.length);
    resultGame.total = Math.floor(resultGame.total / games.length);

    return resultGame;
}


export function getCollectionSummary(games: FullGameReviewInfo[]): CollectionSummary {
    let summary: CollectionSummary = {
        lastCompletionDate: new Date(),
        totalGames: 0,
        completionRate: 0,
        tags: [],
        totalHours: 0,
        platform: "",
        averageRating: 0,
        lastCompletion: new Date,
        averageHours: 0,
        commentGame: "",
        commentText: "",
    }

    if(games.length === 0){
        return summary;
    }
    
    summary.totalGames = games.length;
    let tagMap = new Map();
    let platformsMap = new Map();
    let completedGames = 0;
    let totalHours = 0;
    let totalRating = 0;
    let lastCompletionDate = 0;

    games.forEach((game: FullGameReviewInfo) => {
        if (game.finished) {
            completedGames += 1;
            if(new Date(game.date).valueOf() > 0){
                lastCompletionDate = new Date(game.date).valueOf();
            }
        }
        totalHours += game.hours_spent;
        totalRating += game.total_score;

        game.game_tags.forEach((tag: string) => {
            if (!tagMap.has(tag)) {
                tagMap.set(tag, 1);
            } else {
                tagMap.set(tag, tagMap.get(tag) + 1)
            }
        })
        if (platformsMap.has(game.platform_name)) {
            platformsMap.set(game.platform_name, platformsMap.get(game.platform_name) + 1);
        } else {
            platformsMap.set(game.platform_name, 1);
        }
    })
    const tagEntries = [...tagMap.entries()];
    const sortedTagEntries = tagEntries.sort((a, b) => b[1] - a[1]);
    summary.tags.push(sortedTagEntries[0][0]);
    summary.tags.push(sortedTagEntries[1][0]);
    summary.tags.push(sortedTagEntries[2][0]);
    const platformEntries = [...platformsMap.entries()];
    const sortedPlatformEntries = platformEntries.sort((a, b) => b[1] - a[1]);
    summary.lastCompletionDate = new Date(lastCompletionDate);
    summary.platform = sortedPlatformEntries[0][0];
    summary.averageHours = Math.floor(totalHours / games.length);
    summary.averageRating = Math.floor(totalRating / games.length);
    summary.completionRate = Math.floor(completedGames / games.length * 100);
    summary.totalHours = totalHours;
    let randomCommentIndex = Math.floor(Math.random() * games.length);
    summary.commentGame = games[randomCommentIndex].game_name;
    summary.commentText = games[randomCommentIndex].user_comment;

    return summary;
}