import Button from "@/components/Buttons/WideActionButton/Button";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import RatingButton from "@/components/RatingButton/RatingButton";
import Title from "@/components/Title/Title";
import { ratingAspects, ratingPageAspectNamesArray } from "@/rating";
import { setGameCreationPage, setGameCreationRatingPage } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";




export default function GameRatingField() {
    const gameCreationRatingPageSelector = useAppSelector((state: RootState) => state.gameCreation.currentRatingPage);
    const gameCreationPageSelector = useAppSelector((state: RootState) => state.gameCreation.page);
    const gameCreationRatingScore = useAppSelector((state: RootState) => state.gameCreation.scores[ratingPageAspectNamesArray[gameCreationRatingPageSelector]]);
    const dispatch = useAppDispatch();

    function nextQuestion() {
        if (gameCreationRatingPageSelector <= 9) {
            dispatch(setGameCreationRatingPage(gameCreationRatingPageSelector + 1));
        }
    }

    function previousQuestion() {
        if (gameCreationRatingPageSelector > 0) {
            dispatch(setGameCreationRatingPage(gameCreationRatingPageSelector - 1));
        }
    }

    function nextPage(){
        if(gameCreationRatingPageSelector === 10){
            dispatch(setGameCreationPage(gameCreationPageSelector + 1))
        }
    }
    return (
        <div className="flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[5px]">
                <Title title={ratingAspects[ratingPageAspectNamesArray[gameCreationRatingPageSelector]].title} />
                <p className="textcol-dimm sm:text-[16px] text-[15px]">{ratingAspects[ratingPageAspectNamesArray[gameCreationRatingPageSelector]].description}</p>
            </div>
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
                {gameCreationRatingPageSelector >= 0 && <Button title={"Previous Question"} onClick={previousQuestion} />}
                {gameCreationRatingScore >= 0 && gameCreationRatingPageSelector < 10 ? <WideActionButton onClick={nextQuestion} text={"Next Question"} /> : <WideActionButton onClick={nextPage} text={"Finish!"} /> }
            </div>
        </div>
    )
}