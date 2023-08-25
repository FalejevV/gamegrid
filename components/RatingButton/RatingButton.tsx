import { RatingNumber, ScoreList } from "@/interface"
import { ratingAspects, ratingNames, ratingPageAspectNamesArray } from "@/rating";
import { setGameCreationScore } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"



export default function RatingButton(props: {
    value: RatingNumber,
    middle?: boolean,
}) {
    const dispatch = useAppDispatch()
    const gameCreationRatingPageSelector = useAppSelector((state: RootState) => state.gameCreation.currentRatingPage);
    const gameCreationScoreSelector = useAppSelector((state: RootState) => state.gameCreation.scores[ratingPageAspectNamesArray[gameCreationRatingPageSelector]]);
    return (
        <button className={`h-[50px] bg-dimm textcol-main text-[16px] transition-all duration-200 hover:brightness-110 relative
            ${gameCreationScoreSelector === props.value && "bg-mid scale-110"}
            ${gameCreationScoreSelector !== props.value && "bg-dimm scale-100"}
            ${props.middle && "w-[100px]"}
            ${!props.middle && "w-[50px]"}
        `} onClick={() => dispatch(setGameCreationScore({
            aspect: ratingPageAspectNamesArray[gameCreationRatingPageSelector],
            value: props.value
        }))}>
            {ratingNames[props.value]}

            <p className={`absolute lg:left-[50%] top-[75px] textcol-main lg:right-auto text-[18px] translate-y-[-50%] lg:translate-x-[-50%] user-select-none pointer-events-none whitespace-nowrap
            ${props.value < 5 && "left-0 translate-x-0 right-auto"}
            ${props.value > 5 && "right-0 translate-x-0 left-auto"}
            ${props.value === 5 && "left-[50%] translate-x-[-50%] right-auto"}
            ${gameCreationScoreSelector === props.value && "opacity-100"}
            ${gameCreationScoreSelector !== props.value && "opacity-0"}
            `}>{ratingAspects[ratingPageAspectNamesArray[gameCreationRatingPageSelector]].scale[props.value]}</p>
        </button>
    )
}