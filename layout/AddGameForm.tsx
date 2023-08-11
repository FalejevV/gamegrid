"use client"

import InputField from "@/components/InputField/InputField"
import React, { useState } from "react";
import Image from "next/image";
import GameSearchItem from "@/components/GameSearchItem/GameSearchItem";
import { IGDBGameFetch } from "@/interface";

export default function AddGameForm() {
    const [search, setSearch] = useState("");
    const [games, setGames] = useState<IGDBGameFetch[]>([]);
    const [error, setError] = useState("");

    function gameSearch(e: React.FormEvent) {
        e.preventDefault();
        if (search.trim()) {
            fetch('/api/igdb-game-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: search
                }),
            }).then(res => res.json()).then(data => {
                if (data.error) {
                    setError(data.error);
                    return;
                } else {
                    setGames(data.data)
                }
            });

        }
    }

    function gameList() {
        return (
            <div className="flex flex-col gap-[15px] w-full h-fit">
                {games.map((item: IGDBGameFetch) => <GameSearchItem key={item.first_release_date+item.name} image={item.cover?.url} name={item.name} date={item.first_release_date} />)}
            </div>
        )
    }
    console.log(games);
    return (
        <div className="w-full max-w-[500px]">
            <form className="w-full h-fit flex flex-col gap-[15px] relative" onSubmit={gameSearch}>
                <div className="flex w-full items-center h-[fit] relative">
                    <InputField bgColor="bg-dimm" label={"Add a Game"} name={"search"} placeholder={"Game search..."} value={search} setValue={setSearch} />
                    <div className="h-[45px] w-[70px] absolute bottom-0 right-0  flex items-center justify-center bg-mid hover:brightness-105 cursor-pointer" onClick={gameSearch}>
                        <Image src={"/icons/Search.svg"} alt={"Search icon"} width={20} height={20} className="w-[20px] h-[20px]" />
                    </div>
                </div>
            </form>
            {games.length > 0 && gameList()}
        </div>
    )

}