import Button from "@/components/Buttons/WideActionButton/Button";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import RatingButton from "@/components/RatingButton/RatingButton";
import Title from "@/components/Title/Title";
import { ratingAspects, ratingPageAspectNamesArray } from "@/rating";
import { setGameCreationRatingPage } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";




export default function GameRatingField() {
    const gameCreationPageSelector = useAppSelector((state: RootState) => state.gameCreation.currentRatingPage);
    const gameCreationRatingScore = useAppSelector((state: RootState) => state.gameCreation.scores[ratingPageAspectNamesArray[gameCreationPageSelector]]);
    const dispatch = useAppDispatch();

    function nextQuestion() {
        if (gameCreationPageSelector <= 9) {
            dispatch(setGameCreationRatingPage(gameCreationPageSelector + 1));
        }
    }

    function previousQuestion() {
        if (gameCreationPageSelector > 0) {
            dispatch(setGameCreationRatingPage(gameCreationPageSelector - 1));
        }
    }
    return (
        <div className="flex flex-col gap-[25px]">
            <Title title={ratingAspects[ratingPageAspectNamesArray[gameCreationPageSelector]].title} />
            <div className="flex items-center justify-between">
                <RatingButton value={0} />
                <RatingButton value={1} />
                <RatingButton value={2} />
                <RatingButton value={3} />
                <RatingButton middle value={5} />
                <RatingButton value={7} />
                <RatingButton value={8} />
                <RatingButton value={9} />
                <RatingButton value={10} />
            </div>
            <div className="flex items-center justify-between flexgap pt-[70px]">
                {gameCreationPageSelector >= 0 && <Button title={"Previous Question"} onClick={previousQuestion} />}
                {gameCreationRatingScore >= 0 && <WideActionButton onClick={nextQuestion} text={"Next Question"} />}
            </div>
        </div>
    )
}