import Button from "@/components/Buttons/WideActionButton/Button";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import Title from "@/components/Title/Title";
import { setGameCreationPage, setGameCreationRatingPage } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";



export default function GameRagingDisclamer() {
    const dispatch = useAppDispatch();
    const gameCreationSelector = useAppSelector((state: RootState) => state.gameCreation);

    function nextQuestion() {
        if (gameCreationSelector.page <= 5) {
            dispatch(setGameCreationPage(gameCreationSelector.page + 1));
        }
    }

    function previousQuestion() {
        if (gameCreationSelector.page > 0) {
            dispatch(setGameCreationPage(gameCreationSelector.page - 1));
        }
    }
    return (
        <div className="flex flex-col sm:gap-[100px] gap-[30px]">
            <div className="w-full h-fit gap-[15px] flex flex-col">
                <Title title={"Its time to share your gaming feels!"} />
                <p className="textcol-dimm text-[16px]">
                    This might take some time, but please...
                    Your ratings shape the gaming universe! Let's keep it real, fair, and fun – every score you give adds to the heart of our community.
                </p>
            </div>

            <div className="flexgap flex-col items-center">
                <div className="flex flex-col itemx-center w-full">
                    <div className="flex justify-center gap-[20px]">
                        <Image src={"/Rating Dog.webp"} alt={"Rating dog"} width={200} height={240} className="sm:w-[200px] sm:h-[240px] w-[150px] h-[180px]" />
                        <p className="h-full textcol-main sm:text-[30px] text-[23px]">It's Rating Time!</p>
                    </div>
                    <div className="w-full h-[30px] bg-dimm flex items-center pt-[2px] justify-start gap-[5px] px-[15px] overflow-hidden textcol-dimm">
                        Doggy Image by <a href="https://www.freepik.com/free-photo/cute-dog-wearing-hat_12650621.htm" target="_blank">Freepik</a>
                    </div>
                </div>
                <div className="flexgap w-full items-center justify-between">
                    <Button title={"Go Back"} onClick={previousQuestion} />
                    <WideActionButton onClick={nextQuestion} text={"Start Rating!"} />
                </div>
            </div>
        </div>
    )
}