"use client"

import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import DropdownInput from "@/components/DropdownInput/DropdownInput";
import InlineInputField from "@/components/InlineInputField/InlineInputField";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import { GameCreationRequiredInfo, GameCreationRequiredInfoDataError, GameReviewData, IGDBFullGameInfo, IGDBFullGameInfoDataError } from "@/interface";
import { setGameCreationComment, setGameCreationFetchedGame, setGameCreationFinished, setGameCreationHours, setGameCreationPage, setGameCreationPlatform, setGameCreationScore } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { APICallSupabaseGameInsertByNameDateCompany, APIgetSupabaseGameFromNameAndDate, APIgetUserReviewByGameNameAndDate } from "@/utils/apiFetching";
import supabaseClient from "@/utils/supabaseClient";
import { getTableList } from "@/utils/tableFetching";
import { FormEvent, useEffect, useState } from "react";
import GameReviewPageLoading from "./GameReviewPageLoading";
import TextField from "@/components/TextField/TextField";
import Button from "@/components/Buttons/WideActionButton/Button";
import AlertText from "@/components/AlertText/AlertText";
import Title from "@/components/Title/Title";


export default function GameReviewPage() {
    // DO NOT LOOK HERE
    function fillDatabaseUserReviewScores(review: GameReviewData) {
        dispatch(setGameCreationScore({
            aspect: "graphics_avg",
            value: review.graphics_score / 10
        }))
        dispatch(setGameCreationScore({
            aspect: "sound_avg",
            value: review.sound_score / 10
        }))
        dispatch(setGameCreationScore({
            aspect: "gameplay_avg",
            value: review.gameplay_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "level_avg",
            value: review.level_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "balance_avg",
            value: review.balance_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "story_avg",
            value: review.story_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "performance_avg",
            value: review.performance_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "original_avg",
            value: review.original_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "customization_avg",
            value: review.customization_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "microtransactions_avg",
            value: review.microtransactions_score / 10
        }));

        dispatch(setGameCreationScore({
            aspect: "support_avg",
            value: review.support_score / 10
        }));

    }
    function fillDatabaseUserReviewInfo(review: GameReviewData) {
        dispatch(setGameCreationHours(review.hours_spent.toString()));
        dispatch(setGameCreationFinished(review.finished));
        dispatch(setGameCreationComment(review.user_comment));
        dispatch(setGameCreationPlatform(review.platform_played || ""));
        fillDatabaseUserReviewScores(review);
    }




    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const [gameInfoGathered, setGameInfoGathered] = useState(false);
    const [gameDatabaseId, setGameDatabaseId] = useState(-1);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const [allPlatformsFetch, setAllPlatformsFetch] = useState<string[]>([]);
    const [newGameCreation, setNewGameCreation] = useState(false);
    const [supabaseInsertDebounce, setSupabaseInsertDebounce] = useState(false);
    const [supabaseSearchDebounce, setSupabaseSearchDebounce] = useState(false);
    const userAuthSelector = useAppSelector((state: RootState) => state.userAuth);


    // search for a game in supabase.
    async function supabaseGameSearch() {
        if (!userAuthSelector.userId) {
            setError("User not authenticated");
            return;
        }

        if (supabaseSearchDebounce) return;
        setSupabaseSearchDebounce(true);
        if (gameCreationSelector.gameInfo.gameId === gameCreationSelector.memoGame.gameId) {
            console.log("SAME GAME");
            setSupabaseSearchDebounce(false);
            setGameDatabaseId(gameCreationSelector.gameInfo.gameId);
            setGameInfoGathered(true);
            return;
        } else {
            dispatch(setGameCreationFetchedGame(null));
        }
        const result: GameCreationRequiredInfoDataError = await APIgetSupabaseGameFromNameAndDate(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date);
        if (result.data) {
            let userReview = await APIgetUserReviewByGameNameAndDate(userAuthSelector.userId, result.data.id);
            if (userReview.data?.game_id) {
                fillDatabaseUserReviewInfo(userReview.data);
            }
            setGameDatabaseId(Number(result.data.id) || -1);
            dispatch(setGameCreationFetchedGame(result.data));
        }
        setGameInfoGathered(true);
        setSupabaseSearchDebounce(false);
    }

    // Game is not found in our database. Fetching game from IGDB and inserting it into the supabase.
    async function supabaseGameInsert() {
        console.log("NEW GAME INSERT");
        if (gameDatabaseId === -1 && !gameInfoGathered) return;
        if (supabaseInsertDebounce) return;
        setSupabaseInsertDebounce(true);
        console.log("fetching all IGDB game info...")
        const result: GameCreationRequiredInfoDataError = await APICallSupabaseGameInsertByNameDateCompany(gameCreationSelector.gameInfo.name, gameCreationSelector.gameInfo.date, gameCreationSelector.gameInfo.company);
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

    function formSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");

        if (!Number(gameCreationSelector.questions.hours)) {
            setError("Wrong 'Hours' field data")
            return;
        }

        if (!gameCreationSelector.questions.platform) {
            setError("Please pick platform you played on");
            return;
        }

        if (gameCreationSelector.questions.comment.trim().length < 20) {
            setError("Please write at least 20 characters in comment section ;)");
            return;
        }

        proceedToNextPage();
    }

    function proceedToNextPage() {
        if (gameCreationSelector.gameCreationFetchedGame?.id) {
            dispatch(setGameCreationPage(2));
        }
    }

    function proceedToPrevPage() {
        dispatch(setGameCreationPage(0));
    }

    function reviewWindow() {
        return (
            <form className="flex flex-col gap-[10px]" onSubmit={formSubmit}>
                <div className="flex flex-col gap-[25px]">
                    <SelectedGame gameInfo={gameCreationSelector.gameCreationFetchedGame} />
                    <Title title={"Please describe your experience"} />
                    <InputCheckbox question={"Did you finish the game?"} name={"finished"} onChange={(value: boolean) => dispatch(setGameCreationFinished(value))} value={gameCreationSelector.questions.finished} />
                    <InlineInputField title={"How many hours have you played?"} name={"hours"} onChange={(value: string) => dispatch(setGameCreationHours(value))} value={gameCreationSelector.questions.hours.toString()} placeholder={"Hours"} />
                    <DropdownInput additionalOptions={allPlatformsFetch} options={gameCreationSelector.gameCreationFetchedGame?.platforms || []} value={gameCreationSelector.questions.platform} onChange={(value: string) => dispatch(setGameCreationPlatform(value))} title={"What platform did you play on?"} name={"platform"} />
                    <TextField title={"Please write a short comment about this game. Even 1 sentence is enough :)"} name={"comment"} onChange={(value: string) => dispatch(setGameCreationComment(value))} value={gameCreationSelector.questions.comment} />
                </div>
                <div className="flex w-full items-center justify-between gap-[10px]">
                    <Button title={"BACK"} onClick={proceedToPrevPage} />
                    <WideActionButton submit text={"NEXT"} onClick={() => { }} />
                </div>

            </form>
        )
    }

    function SelectedGame(props: {
        gameInfo: IGDBFullGameInfo | GameCreationRequiredInfo | null
    }) {
        if (!props.gameInfo) return;

        return (
            <div className="flex w-full inputheight bg-dimm items-center justify-between overflow-hidden relative">
                <p className="textcol-main h-full p-[25px] flex items-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-dimm  whitespace-nowrap">{props.gameInfo.name}</p>
            </div>
        )
    }


    function loadingMessage() {
        return (
            <div className="flex flex-col gap-[30px] textcol-main">
                <GameReviewPageLoading newGame={newGameCreation} />
            </div>
        )
    }

    return (
        <div className="flex gap-[25px] w-full flex-col">
            {!gameCreationSelector.gameCreationFetchedGame?.platforms && !error && loadingMessage()}
            {gameCreationSelector.gameCreationFetchedGame?.platforms && reviewWindow()}
            {gameInfoGathered && error && <AlertText alertText={error} />}
        </div>
    )
}