import Title from "@/components/Title/Title";
import GameRatingField from "./GameRatingField";
import Button from "@/components/Buttons/WideActionButton/Button";
import { useAppDispatch } from "@/store/store";
import { setGameCreationPage } from "@/store/features/gameCreation";



export default function GameRatingPage() {
    const dispatch = useAppDispatch();
    return (
        <div className="w-full max-w-[1000px] h-fit sm:gap-[100px] gap-[50px] flex flex-col">
           


            <GameRatingField />
            <Button title={"Go Back"} onClick={() => dispatch(setGameCreationPage(2))} />
        </div>
    )
}