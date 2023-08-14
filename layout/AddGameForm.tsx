"use client"

import { RootState, useAppSelector } from "@/store/store";
import React from "react";
import GameSearchPage from "./GameCreation/GameSearchPage";
import GameReviewPage from "./GameCreation/GameReviewPage";




export default function AddGameForm() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);

    console.log(gameCreationSelector.page);
    return (
        <div className="w-full max-w-[500px]">
            <div role="form" className="w-full h-fit flex flex-col gap-[15px] relative" >
                {gameCreationSelector.page === 0 && <GameSearchPage />}
                {gameCreationSelector.page === 1 && <GameReviewPage />}
            </div>
        </div>
    )

}