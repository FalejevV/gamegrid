"use client"

import InputField from "@/components/InputField/InputField"
import React, { useState } from "react";
import Image from "next/image";
import GameSearchItem from "@/components/GameSearchItem/GameSearchItem";
import { DataError, IGDBGameFetch } from "@/interface";
import { fetchIGDBGameByName } from "@/utils/idgbFetching";


export default function AddGameForm() {
    const [search, setSearch] = useState("");
    const [games, setGames] = useState<IGDBGameFetch[]>([]);
    const [error, setError] = useState("");
    const [formPage, setFormPage] = useState<number>(0);
    const [selectedGame, setSelectedGame] = useState<IGDBGameFetch>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    async function gameSearch(e: React.FormEvent) {
        if(isFetching) return;
        else setIsFetching(true)

        e.preventDefault();
        if (search.trim()) {
            let fetchResult: DataError = await fetchIGDBGameByName(search);
            if (fetchResult.error) {
                setError(fetchResult.error)
            } else {
                if (Array.isArray(fetchResult.data)) {
                    setGames(fetchResult.data);
                }
            }
        }
        setIsFetching(false);
    }

    function pickAGame(game: IGDBGameFetch) {
        setSelectedGame(game);
        setSearch(game.name);
        setGames([]);
    }

    function gameList() {
        return (
            <div className="flex flex-col gap-[15px] w-full h-fit">
                {games.map((item: IGDBGameFetch, index) => <GameSearchItem key={index} gameData={item} pickAGame={pickAGame} />)}
            </div>
        )
    }

    function gamePreview() {
        if (!selectedGame) return;
        return (
            <div className="w-full h-fit flex flex-col textcol-main pt-[20px] gap-[20px]">
                <p>You picked</p>
                <div className="w-full flex items-center justify-between gap-[30px] bg-dimm p-[10px] ">
                    <p>{selectedGame.name}</p>
                    <Image src={"https:" + selectedGame.cover.url} alt={"selected game"} className="w-full max-w-[100px] h-[100px]" width={100} height={100} />
                </div>
            </div>
        )
    }

    function gameSearchPage() {
        return (
            <div className="flexgap flex-col">
                <div className="flex w-full items-center h-[fit] relative">
                    <InputField bgColor="bg-dimm" label={"Add a Game"} name={"search"} placeholder={"Game search..."} value={search} setValue={setSearch} />
                    <div className={`h-[45px] w-[70px] absolute bottom-0 right-0  flex items-center justify-center bg-mid hover:brightness-105 cursor-pointer
                        ${isFetching && "opacity-50"} 
                    `} onClick={gameSearch} >
                        <Image src={"/icons/Search.svg"} alt={"Search icon"} width={20} height={20} className="w-[20px] h-[20px]" />
                    </div>

                </div>
                {selectedGame && gamePreview()}
                {games.length > 0 &&
                    <div className="w-full h-fit max-h-[300px] bg-dimm overflow-y-scroll p-[10px]">
                        {games.length > 0 && gameList()}
                    </div>
                }
            </div>
        )
    }

    console.log(games);
    return (
        <div className="w-full max-w-[500px]">
            <form className="w-full h-fit flex flex-col gap-[15px] relative" onSubmit={gameSearch}>
                {formPage === 0 && gameSearchPage()}
                {error && <p className="textcol-main">{error}</p>}
            </form>
        </div>
    )

}