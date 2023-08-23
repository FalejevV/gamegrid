"use client"

import { RootState, useAppSelector } from "@/store/store";
import React from "react";
import GameSearchPage from "./GameCreation/GameSearchPage";
import GameReviewPage from "./GameCreation/GameReviewPage";
import GameRatingPage from "./GameCreation/GameRatingPage";
import GameRatingDisclamer from "./GameCreation/GameRatingDisclamer";




export default function AddGameForm() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);

    return (
        <div className="w-full max-w-[750px]">
            <div role="form" className="w-full h-fit flex flex-col gap-[15px] relative" >
                {gameCreationSelector.page === 0 && <GameSearchPage />}
                {gameCreationSelector.page === 1 && <GameReviewPage />}
                {gameCreationSelector.page === 2 && <GameRatingDisclamer />}
                {gameCreationSelector.page === 3 && <GameRatingPage />}
            </div>
        </div>
    )

}