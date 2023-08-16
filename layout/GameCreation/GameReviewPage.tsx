"use client"

import DropdownInput from "@/components/DropdownInput/DropdownInput";
import InlineInputField from "@/components/InlineInputField/InlineInputField";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import InputField from "@/components/InputField/InputField";
import { StringDataError } from "@/interface";
import { setGameCreationFinished, setGameCreationHours, setGameCreationPlatform } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { APICallSupabaseGameInsertByName, getSupabaseGameByName } from "@/utils/fetching";
import { useEffect, useState } from "react";



export default function GameReviewPage() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gameInfoGathered, setGameInfoGathered] = useState(false);
    const [gameDatabaseId, setGameDatabaseId] = useState(-1);
    const dispatch = useAppDispatch();


    async function supabaseGameSearch() {
        if (gameCreationSelector.gameInfo.gameId === gameCreationSelector.memoGame.gameId) return;

        const result:StringDataError = await getSupabaseGameByName(gameCreationSelector.gameInfo.name);
        if(result.data) setGameDatabaseId(Number(result.data) || -1);
        setGameInfoGathered(true);
    }

    async function supabaseGameInsert() {
        console.log("call");
        if(gameDatabaseId === -1 && gameInfoGathered) return;
        const result:StringDataError = await APICallSupabaseGameInsertByName(gameCreationSelector.gameInfo.name);
        console.log(result);
    }

    useEffect(() => {
        supabaseGameSearch();
    }, []);

    useEffect(() => {
        supabaseGameInsert();
    },[gameInfoGathered, gameDatabaseId]);


    return (
        <div className="flex gap-[20px] w-full flex-col">
          <InputCheckbox question={"Did you finish the game?"} name={"finished"} onChange={(value:boolean) => dispatch(setGameCreationFinished(value))} value={gameCreationSelector.questions.finished} />  
          <InlineInputField title={"How many hours have you played?"} name={"hours"} onChange={(value:string) => dispatch(setGameCreationHours(value))} value={gameCreationSelector.questions.hours.toString()} placeholder={"Hours"} />
          <DropdownInput options={["One", "Two", "Three", "Four", "Five"]} value={gameCreationSelector.questions.platform} onChange={(value:string) => dispatch(setGameCreationPlatform(value))} title={"What platform did you play on?"} name={"platform"} />
        </div>
    )
}