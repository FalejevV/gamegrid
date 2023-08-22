import Title from "@/components/Title/Title";
import GameRatingField from "./GameRatingField";
import Button from "@/components/Buttons/WideActionButton/Button";
import { useAppDispatch } from "@/store/store";
import { setGameCreationPage } from "@/store/features/gameCreation";



export default function GameRatingPage() {
    const dispatch = useAppDispatch();
    return (
        <div className="w-full max-w-[750px] h-fit sm:gap-[100px] gap-[50px] flex flex-col">
            <div className="w-full h-fit gap-[15px] flex flex-col">
                <Title title={"Its time to share your gaming feels!"} />
                <p className="textcol-dimm text-[16px]">
                    This might take some time, but please...
                    Your ratings shape the gaming universe! Let's keep it real, fair, and fun – every score you give adds to the heart of our community.
                </p>
            </div>


            <GameRatingField />
            <Button title={"Back"} onClick={() => dispatch(setGameCreationPage(1))} />
        </div>
    )
}