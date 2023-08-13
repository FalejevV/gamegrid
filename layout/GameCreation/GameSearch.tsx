"use client"

import GamePickPreview from "@/components/GamePickPreview/GamePickPreview";
import GameSearchItem from "@/components/GameSearchItem/GameSearchItem";
import InputField from "@/components/InputField/InputField";
import { DataError, IGDBGameFetch } from "@/interface";
import { useAppSelector, RootState, useAppDispatch } from "@/store/store";
import { fetchedIGDBGamesDuplicateFilter } from "@/utils/formatter";
import { fetchIGDBGameByName } from "@/utils/idgbFetching";
import { useState } from "react";
import Image from "next/image";
import { setGameCreationFetchedGames, setGameCreationGameData, setGameCreationSearchInput } from "@/store/features/gameCreation";




export default function GameSearchPage() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const dispatch = useAppDispatch();

    async function gameSearch(e: React.FormEvent) {
        if (isFetching) return;
        else setIsFetching(true)
        dispatch(setGameCreationFetchedGames([]));
        e.preventDefault();
        if (gameCreationSelector.gameSearchInput.trim()) {
            let fetchResult: DataError = await fetchIGDBGameByName(gameCreationSelector.gameSearchInput);
            if (fetchResult.error) {
                setError(fetchResult.error)
            } else {
                if (Array.isArray(fetchResult.data)) {
                    dispatch(setGameCreationFetchedGames(fetchedIGDBGamesDuplicateFilter(fetchResult.data)));
                }
            }
        }
        setIsFetching(false);
    }


    function gameList() {
        return (
            <div className="flex flex-col gap-[15px] w-full h-fit">
                {gameCreationSelector.fetchedGames.map((item: IGDBGameFetch, index) => <GameSearchItem key={index} gameData={item} pickAGame={pickAGame} />)}
            </div>
        )
    }

    function pickAGame(game: IGDBGameFetch) {
        dispatch(setGameCreationGameData({
            gameId: game.id,
            name: game.name, 
            image: game.cover.url 
        }))
        dispatch(setGameCreationFetchedGames([]));
    }



    return (
        <div className="flexgap flex-col relative">
            <div className="flex w-full items-center h-[fit] relative">
                <InputField bgColor="bg-dimm" label={"Add a Game"} name={"search"} placeholder={"Game search..."} value={gameCreationSelector.gameSearchInput} setValue={(value:string) => dispatch(setGameCreationSearchInput(value)) } />
                <div className={`h-[45px] w-[70px] absolute bottom-0 right-0  flex items-center justify-center bg-mid hover:brightness-105 cursor-pointer
                        ${isFetching && "opacity-50"} 
                    `} onClick={gameSearch} >
                    <Image src={"/icons/Search.svg"} alt={"Search icon"} width={20} height={20} className="w-[20px] h-[20px]" />
                </div>

            </div>
            {gameCreationSelector.gameInfo.name && <>
                <GamePickPreview game={gameCreationSelector.gameInfo} />
                <button className="w-full textcol-main text-center bg-hi text-[22px] p-[10px] hover:brightness-110">NEXT</button>
            </>}
            {gameCreationSelector.fetchedGames.length > 0 &&
                <div className="w-full h-fit max-h-[300px] bg-dimm overflow-y-scroll p-[10px] left-0 top-[90px] z-10">
                    {gameCreationSelector.fetchedGames.length > 0 && gameList()}
                </div>
            }
        </div>
    )
}