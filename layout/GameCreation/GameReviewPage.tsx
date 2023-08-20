"use client"

import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import DropdownInput from "@/components/DropdownInput/DropdownInput";
import InlineInputField from "@/components/InlineInputField/InlineInputField";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import { GameCreationRequiredInfo, GameCreationRequiredInfoDataError, IGDBFullGameInfo, IGDBFullGameInfoDataError } from "@/interface";
import { setGameCreationFinished, setGameCreationHours, setGameCreationPlatform } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { APICallSupabaseGameInsertByNameDateCompany, APIgetSupabaseGameFromNameAndDate} from "@/utils/apiFetching";
import supabaseClient from "@/utils/supabaseClient";
import { getTableList } from "@/utils/tableFetching";
import { useEffect, useState } from "react";
import GameReviewPageLoading from "./GameReviewPageLoading";



export default function GameReviewPage() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gameInfoGathered, setGameInfoGathered] = useState(false);
    const [gameDatabaseId, setGameDatabaseId] = useState(-1);
    const dispatch = useAppDispatch();
    const [gameInfo, setGameInfo] = useState<GameCreationRequiredInfo | null | IGDBFullGameInfo>(null);
    const [error, setError] = useState("");
    const [allPlatformsFetch, setAllPlatformsFetch] = useState<string[]>([]);
    const [newGameCreation, setNewGameCreation] = useState(false);
    const [supabaseInsertDebounce, setSupabaseInsertDebounce] = useState(false);
    const [supabaseSearchDebounce, setSupabaseSearchDebounce] = useState(false);
    // search for a game in supabase.
    async function supabaseGameSearch() {
        if(supabaseSearchDebounce) return;
        setSupabaseSearchDebounce(true);
        if (gameCreationSelector.gameInfo.gameId === gameCreationSelector.memoGame.gameId) {
            setSupabaseSearchDebounce(false);
            return;
        }

        const result: GameCreationRequiredInfoDataError = await APIgetSupabaseGameFromNameAndDate(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date);
        if (result.data) {
            setGameDatabaseId(Number(result.data.id) || -1);
            setGameInfo(result.data);
        }
        setGameInfoGathered(true);
        setSupabaseSearchDebounce(false);
    }

    async function supabaseGameInsert() {
        console.log("NEW GAME INSERT");
        if (gameDatabaseId === -1 && !gameInfoGathered) return;
        if(supabaseInsertDebounce) return;
        setSupabaseInsertDebounce(true);
        console.log("fetching all IGDB game info...")
        const result: IGDBFullGameInfoDataError = await APICallSupabaseGameInsertByNameDateCompany(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date, gameCreationSelector.gameInfo.company);
        if (result.data) {
            setGameInfo(result.data);
            setSupabaseInsertDebounce(false);
            return;
        }
        if (result.error) {
            setError(result.error);
            setSupabaseInsertDebounce(false);
            return;
        }
    }

    useEffect(() => {
        supabaseGameSearch();
        getTableList(supabaseClient, "Platform").then((res) => {
            if(res.error){
                setError(res.error.message);
                return;
            }
            if(res.data){
                setAllPlatformsFetch(res.data);
            }
        });
    }, []);

       useEffect(() => {
        if (gameInfo) return;
        if (gameDatabaseId === -1 && gameInfoGathered) {
            setNewGameCreation(true);
            supabaseGameInsert();
        }
   }, [gameInfo, gameInfoGathered, gameDatabaseId]);

    console.log(gameInfo);

    
    function proceedToNextPage() {

    }


    function inputFields() {
        return (
            <>
                <InputCheckbox question={"Did you finish the game?"} name={"finished"} onChange={(value: boolean) => dispatch(setGameCreationFinished(value))} value={gameCreationSelector.questions.finished} />
                <InlineInputField title={"How many hours have you played?"} name={"hours"} onChange={(value: string) => dispatch(setGameCreationHours(value))} value={gameCreationSelector.questions.hours.toString()} placeholder={"Hours"} />
                <DropdownInput additionalOptions={allPlatformsFetch} options={gameInfo?.platforms || []} value={gameCreationSelector.questions.platform} onChange={(value: string) => dispatch(setGameCreationPlatform(value))} title={"What platform did you play on?"} name={"platform"} />
                <WideActionButton onClick={proceedToNextPage} text={"NEXT"} />
            </>
        )
    }
    
    function errorMessage(){
        return(
            <div className="flex flex-col gap-[30px] textcol-main">
                <p>An error acquired white loading game info from database</p>
                <p>Error: {error}</p>
            </div>
        )
    }

    function loadingMessage(){
        return(
            <div className="flex flex-col gap-[30px] textcol-main">
                <GameReviewPageLoading />
                {newGameCreation && <p>Game was not found in our database. Fetching game data...</p>}
            </div>
        )
    }

    return (
        <div className="flex gap-[25px] w-full flex-col">
            {!gameInfo?.platforms && !error && loadingMessage()}
            {gameInfo?.platforms && inputFields()}
            {gameInfoGathered && error && errorMessage()}
        </div>
    )
}