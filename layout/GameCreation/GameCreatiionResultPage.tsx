import Button from "@/components/Buttons/WideActionButton/Button";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import Title from "@/components/Title/Title";
import { GameReviewData, ScoreList, StringDataError } from "@/interface";
import { setGameCreationPage, setGameCreationScore } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { APIputGameReview } from "@/utils/apiFetching";
import { useEffect, useState } from "react";





export default function GameCreationResultPage() {
    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const dispatch = useAppDispatch();
    const [isFetching, setIsFetching] = useState(false);


    function getTotalScore() {
        let sum = 0;
        // @ts-ignore 
        let keys: (keyof ScoreList)[] = Object.keys(gameCreationSelector.scores);
        keys.forEach((key: keyof ScoreList) => {
            if (key === "total") return;
            sum += gameCreationSelector.scores[key];
        })
        let total = Math.floor(sum / (keys.length - 1) * 10);
        dispatch(setGameCreationScore({
            aspect: "total",
            value: total,
        }))
    }

    useEffect(() => {
        getTotalScore();
    }, []);

    function previousPage() {
        dispatch(setGameCreationPage(gameCreationSelector.page - 1));
    }

    async function saveReview() {
        if (isFetching) return;
        setIsFetching(true);
        let game: GameReviewData = {
            user_id: "-1",
            game_id: gameCreationSelector.gameCreationFetchedGame?.id || 0,
            user_comment: gameCreationSelector.questions.comment,
            graphics_score: gameCreationSelector.scores.graphics_avg * 10,
            sound_score: gameCreationSelector.scores.sound_avg * 10,
            gameplay_score: gameCreationSelector.scores.gameplay_avg * 10,
            level_score: gameCreationSelector.scores.level_avg * 10,
            balance_score: gameCreationSelector.scores.balance_avg * 10,
            story_score: gameCreationSelector.scores.story_avg * 10,
            performance_score: gameCreationSelector.scores.performance_avg * 10,
            original_score: gameCreationSelector.scores.original_avg * 10,
            customization_score: gameCreationSelector.scores.customization_avg * 10,
            microtransactions_score: gameCreationSelector.scores.microtransactions_avg * 10,
            support_score: gameCreationSelector.scores.support_avg * 10,
            state_id: 5,
            hours_spent: Number(gameCreationSelector.questions.hours) || 0,
            platform_played: gameCreationSelector.questions.platform,
            total_score: gameCreationSelector.scores.total,
            platform_id: 0,
            finished: gameCreationSelector.questions.finished
        }
        let result: StringDataError = await APIputGameReview(game);

        if (result.data === "OK") {
            setTimeout(() => {
                window.location.href = "/collection";
            }, 1000);
            return;
        } else if (result.error) {
            alert(result.error);
        }
        setIsFetching(false);
    }


    return (
        <div className="flexgap flex-col w-full textcol-main overflow-hidden">
            <p className="inputheight w-full bg-dimm flex items-center justify-center">{gameCreationSelector.gameInfo.name}</p>
            <Title title={"Game Creation Results"} />

            <div />

            <p>Game Completed?: {gameCreationSelector.questions.finished ? "Yes" : "No"} </p>
            <p>Hours played: {gameCreationSelector.questions.hours}</p>
            <p>Platform: {gameCreationSelector.questions.platform}</p>
            <p className="whitespace-normal">Comment: {gameCreationSelector.questions.comment}</p>

            <div />
            <div />
            <div />

            <p>Total score: {gameCreationSelector.scores.total} / 100</p>

            <div className="flexgap items-center justify-between">
                <Button title={"Go Back"} onClick={previousPage} />
                <WideActionButton disabled={isFetching} onClick={saveReview} text={"Save My Review"} disableText="Saving..." />
            </div>
        </div>
    )
}