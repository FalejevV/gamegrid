import { ScoreList } from "@/interface"
import { setGameCreationScore } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"



export default function RatingButton(props:{
    aspect:keyof ScoreList,
    value:number,
}){
    const dispatch = useAppDispatch()
    const gameCreationScoreSelector = useAppSelector((state:RootState) => state.gameCreation.scores[props.aspect]);
    return(
        <button className={`w-[50px] h-[50px] bg-dimm textcol-main text-[16px] transition-all duration-200 hover:brightness-110
            ${gameCreationScoreSelector === props.value && "bg-mid scale-110"}
        `} onClick={() => dispatch(setGameCreationScore({
            aspect: props.aspect,
            value: props.value
        }))}>
            {props.value}
        </button>
    )
}