import Button from "@/components/Buttons/WideActionButton/Button";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import Title from "@/components/Title/Title";
import { ScoreList } from "@/interface";
import gameCreation, { setGameCreationPage, setGameCreationScore } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { useEffect } from "react";






export default function GameCreationResultPage() {
    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);
    const dispatch = useAppDispatch();

    function getTotalScore() {
        let sum = 0;
        // @ts-ignore 
        let keys: (keyof ScoreList)[] = Object.keys(gameCreationSelector.scores);
        keys.forEach((key: keyof ScoreList) => {
            if (key === "total") return;
            sum += gameCreationSelector.scores[key];
        })
        console.log(sum, keys.length);
        let total = Math.floor(sum / (keys.length - 1) * 10);
        console.log(total);
        dispatch(setGameCreationScore({
            aspect: "total",
            value: total,
        }))
    }

    useEffect(() => {
        getTotalScore();
    }, []);

    function previousPage(){
        dispatch(setGameCreationPage(gameCreationSelector.page -1));
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
                <WideActionButton onClick={() => {}} text={"Save My Review"} />
            </div>
        </div>
    )
}