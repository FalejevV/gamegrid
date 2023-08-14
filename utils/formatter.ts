import { IGDBGameFetch, IGDBTagIdName } from "@/interface";


export function dateToText(date: number): string {
    let dateParse = new Date(date * 1000);
    return dateParse.getFullYear() + '-' + (dateParse.getMonth() > 8 ? (dateParse.getMonth() + 1) : "0" + (dateParse.getMonth() + 1)) + "-" + (dateParse.getDate() > 9 ? dateParse.getDate() : "0" + dateParse.getDate());
}


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