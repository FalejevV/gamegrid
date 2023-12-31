"use client"

import GamePickPreview from "@/components/GamePickPreview/GamePickPreview";
import GameSearchItem from "@/components/GameSearchItem/GameSearchItem";
import InputField from "@/components/InputField/InputField";
import { StringDataError, IGDBGameFetch } from "@/interface";
import { useAppSelector, RootState, useAppDispatch } from "@/store/store";
import { fetchedIGDBGamesDuplicateFilter } from "@/utils/formatter";
import { useState } from "react";
import Image from "next/image";
import { setGameCreationFetchedGames, setGameCreationGameData, setGameCreationMemoData, setGameCreationPage, setGameCreationSearchInput } from "@/store/features/gameCreation";
import AlertText from "@/components/AlertText/AlertText";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import { APIfetchIGDBGameByName } from "@/utils/apiFetching";
import Title from "@/components/Title/Title";




export default function GameSearchPage() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gamePicked, setGamePicked] = useState(false);
    const dispatch = useAppDispatch();

    async function formSubmit(e: React.FormEvent) {
        if (isFetching) return;
        else setIsFetching(true);
        setGamePicked(false);
        dispatch(setGameCreationFetchedGames([]));
        e.preventDefault();
        if (gameCreationSelector.gameSearchInput.trim()) {
            let fetchResult: StringDataError = await APIfetchIGDBGameByName(gameCreationSelector.gameSearchInput);
            if (fetchResult.error) {
                if (typeof fetchResult.error === "string") {
                    setError(fetchResult.error);
                } else {
                    setError("Fetching error :/  Please try again after some time. Sorry");
                }
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
        setGamePicked(true);
        dispatch(setGameCreationMemoData(gameCreationSelector.gameInfo));
        dispatch(setGameCreationGameData({
            gameId: game.id,
            name: game.name,
            image: game.cover.url,
            date: game.first_release_date,
            company: game.involved_companies[0].company.name
        }))
        dispatch(setGameCreationFetchedGames([]));
    }


    function proceedToNextPage() {
        if (gameCreationSelector.gameInfo.gameId < 0) return;
        dispatch(setGameCreationPage(1));
    }



    return (
        <div className="flexgap flex-col relative">
            <form onSubmit={formSubmit} className="flex w-full flex-col h-[fit] relative gap-[15px]">
                <Title title={"Game creation"} /> 
                <div className="textcolhover flex flex-col gap-[5px] tracking-normal">
                    <p>Search tips:</p>
                    <p>• Long game name? Use keywords! "mine" or "craft" finds Minecraft</p>
                    <p>• Symbols count! "Call of Duty: Modern Warfare" needs ":"</p>
                    <p>• Popular games top the list. Rare ones? Scroll down.</p>
                    <p>• no need for capital letters.</p>
                </div>
                <InputField bgColor="bg-dimm" label={"Game search"} name={"search"} placeholder={"Game search..."} value={gameCreationSelector.gameSearchInput} setValue={(value: string) => dispatch(setGameCreationSearchInput(value))} />
                <button className={`h-[45px] w-[70px] absolute bottom-0 right-0  flex items-center justify-center bg-mid hover:brightness-105 cursor-pointer
                        ${isFetching && "opacity-50"} 
                    `} >
                    <Image src={"/icons/Search.svg"} alt={"Search icon"} width={20} height={20} className="w-[20px] h-[20px]" />
                </button>

            </form>


            {error && <AlertText alertText={error} />}


            {gamePicked && <>
                <GamePickPreview game={gameCreationSelector.gameInfo} />
                <WideActionButton onClick={proceedToNextPage} text={"NEXT"} />
            </>}


            {gameCreationSelector.fetchedGames.length > 0 &&
                <div className="w-full h-fit max-h-[300px] bg-dimm overflow-y-scroll p-[10px] left-0 top-[90px] z-10">
                    {gameCreationSelector.fetchedGames.length > 0 && gameList()}
                </div>
            }

        </div>
    )
}