"use client"

import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import DropdownInput from "@/components/DropdownInput/DropdownInput";
import InlineInputField from "@/components/InlineInputField/InlineInputField";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import { GameCreationRequiredInfo, GameCreationRequiredInfoDataError, IGDBFullGameInfo, IGDBFullGameInfoDataError } from "@/interface";
import { setGameCreationComment, setGameCreationFetchedGame, setGameCreationFinished, setGameCreationHours, setGameCreationPage, setGameCreationPlatform } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { APICallSupabaseGameInsertByNameDateCompany, APIgetSupabaseGameFromNameAndDate } from "@/utils/apiFetching";
import supabaseClient from "@/utils/supabaseClient";
import { getTableList } from "@/utils/tableFetching";
import { useEffect, useState } from "react";
import GameReviewPageLoading from "./GameReviewPageLoading";
import TextField from "@/components/TextField/TextField";
import Button from "@/components/Buttons/WideActionButton/Button";
import Image from "next/image";



export default function GameReviewPage() {

    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gameInfoGathered, setGameInfoGathered] = useState(false);
    const [gameDatabaseId, setGameDatabaseId] = useState(-1);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const [allPlatformsFetch, setAllPlatformsFetch] = useState<string[]>([]);
    const [newGameCreation, setNewGameCreation] = useState(false);
    const [supabaseInsertDebounce, setSupabaseInsertDebounce] = useState(false);
    const [supabaseSearchDebounce, setSupabaseSearchDebounce] = useState(false);
    // search for a game in supabase.
    async function supabaseGameSearch() {
        if (supabaseSearchDebounce) return;
        setSupabaseSearchDebounce(true);
        if (gameCreationSelector.gameInfo.gameId === gameCreationSelector.memoGame.gameId) {
            console.log("SAME GAME");
            setSupabaseSearchDebounce(false);
            setGameDatabaseId(gameCreationSelector.gameInfo.gameId);
            setGameInfoGathered(true);
            return;
        }else{
            dispatch(setGameCreationFetchedGame(null));
        }

        const result: GameCreationRequiredInfoDataError = await APIgetSupabaseGameFromNameAndDate(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date);
        if (result.data) {
            setGameDatabaseId(Number(result.data.id) || -1);
            dispatch(setGameCreationFetchedGame(result.data));
        }
        setGameInfoGathered(true);
        setSupabaseSearchDebounce(false);
    }

    async function supabaseGameInsert() {
        console.log("NEW GAME INSERT");
        if (gameDatabaseId === -1 && !gameInfoGathered) return;
        if (supabaseInsertDebounce) return;
        setSupabaseInsertDebounce(true);
        console.log("fetching all IGDB game info...")
        const result: GameCreationRequiredInfoDataError= await APICallSupabaseGameInsertByNameDateCompany(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date, gameCreationSelector.gameInfo.company);
        if (result.data) {
            dispatch(setGameCreationFetchedGame(result.data));
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
            if (res.error) {
                setError(res.error.message);
                return;
            }
            if (res.data) {
                setAllPlatformsFetch(res.data);
            }
        });
    }, []);

    useEffect(() => {
        if (gameCreationSelector.gameCreationFetchedGame) return;
        if (gameDatabaseId === -1 && gameInfoGathered) {
            setNewGameCreation(true);
            supabaseGameInsert();
        }
    }, [gameCreationSelector.gameCreationFetchedGame, gameInfoGathered, gameDatabaseId]);

    useEffect(() => {
        if (!gameInfoGathered) return;
        console.log("gameFetched", gameCreationSelector.gameCreationFetchedGame);
    }, [gameInfoGathered]);

    function proceedToNextPage() {

    }

    function proceedToPrevPage() {
        dispatch(setGameCreationPage(0));
    }

    function reviewWindow() {
        return (
            <div className="flex flex-col gap-[25px]">
                <SelectedGame image={gameCreationSelector.gameCreationFetchedGame?.image || ""} name={gameCreationSelector.gameCreationFetchedGame?.name || ""} />
                <p className="textcol-main text-[23px]">Please describe your experience</p>
                <InputCheckbox question={"Did you finish the game?"} name={"finished"} onChange={(value: boolean) => dispatch(setGameCreationFinished(value))} value={gameCreationSelector.questions.finished} />
                <InlineInputField title={"How many hours have you played?"} name={"hours"} onChange={(value: string) => dispatch(setGameCreationHours(value))} value={gameCreationSelector.questions.hours.toString()} placeholder={"Hours"} />
                <DropdownInput additionalOptions={allPlatformsFetch} options={gameCreationSelector.gameCreationFetchedGame?.platforms || []} value={gameCreationSelector.questions.platform} onChange={(value: string) => dispatch(setGameCreationPlatform(value))} title={"What platform did you play on?"} name={"platform"} />
                <TextField title={"Please write a short comment about this game. Even 1 sentence is enough :)"} name={"comment"} onChange={(value: string) => dispatch(setGameCreationComment(value))} value={gameCreationSelector.questions.comment} />
                <div className="flex w-full items-center justify-between gap-[25px]">
                    <Button title={"BACK"} onClick={proceedToPrevPage} />
                    <WideActionButton onClick={proceedToNextPage} text={"NEXT"} />
                </div>

            </div>
        )
    }

    function SelectedGame(props:{
        image:string,
        name:string,
    }){
        return(
            <div className="flex w-full inputheight bg-dimm items-center justify-between overflow-hidden relative">
                <Image width={200} height={45} src={props.image} alt={props.name+" title"} className="object-cover flex-auto brightness-50" />
                <p className="textcol-main h-full p-[25px] flex items-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-dimm  whitespace-nowrap">{props.name}</p>
            </div>
        )
    }

    function errorMessage() {
        return (
            <div className="flex flex-col gap-[30px] textcol-main">
                <p>An error acquired white loading game info from database</p>
                <p>Error: {error}</p>
            </div>
        )
    }

    function loadingMessage() {
        return (
            <div className="flex flex-col gap-[30px] textcol-main">
                <GameReviewPageLoading />
                {newGameCreation && <p>Game was not found in our database. Fetching game data...</p>}
            </div>
        )
    }

    return (
        <div className="flex gap-[25px] w-full flex-col">
            {!gameCreationSelector.gameCreationFetchedGame?.platforms && !error && loadingMessage()}
            {gameCreationSelector.gameCreationFetchedGame?.platforms && reviewWindow()}
            {gameInfoGathered && error && errorMessage()}
        </div>
    )
}