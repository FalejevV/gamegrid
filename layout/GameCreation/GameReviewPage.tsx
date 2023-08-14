"use client"

import { StringDataError } from "@/interface";
import { RootState, useAppSelector } from "@/store/store"
import { useEffect, useState } from "react";



export default function GameReviewPage() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gameInfoGathered, setGameInfoGathered] = useState(false);
    const [gameDatabaseId, setGameDatabaseId] = useState(-1);

    useEffect(() => {
        if (gameCreationSelector.gameInfo.gameId === gameCreationSelector.memoGame.gameId) return;


        fetch('/api/game-by-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:gameCreationSelector.gameInfo.name
            }),
        }).then(res => res.json()).then((data:StringDataError) => {
            if(data.data){
                setGameInfoGathered(true);
                setGameDatabaseId(Number(data.data))
            }else{
                setGameInfoGathered(true);
            }
        });

        
    }, []);

return (
    <div className="flex w-full">
        <p className="textcol-main text-[20px]">{!gameInfoGathered ? "Loading..." : 
            gameDatabaseId > 0 ? "Game exists in database" : "Game does not exist in database"
        }</p>
    </div>
)
}