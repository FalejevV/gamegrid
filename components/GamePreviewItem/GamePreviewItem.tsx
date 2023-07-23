"use client"
import GamePreviewTitle from "../GamePreviewBlocks/GamePreviewTitle";
import GamePreviewLeastLoved from "../GamePreviewBlocks/GamePreviewLeastLoved";
import GamePreviewMostLoved from "../GamePreviewBlocks/GamePreviewMostLoved";
import GamePreviewParagraph from "../GamePreviewBlocks/GamePreviewParagraph";
import GamePreviewTotalScore from "../GamePreviewBlocks/GamePreviewTotalScore";
import GamePreviewImage from "../GamePreviewBlocks/GamePreviewImage";
import { RootState, useAppSelector } from "@/store/store";
import { dateToText } from "@/utils/formatter";
import GamePreviewTags from "@/layout/GamePreviewTags";
import { Game } from "@/interface";



function PCItemLayout(gameData:Game){
    return(
        <div className="w-full max-w-[950px] h-[300px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <header className="flexgap w-full h-[34px] items-center">
            <GamePreviewTitle title={gameData.name} />
            <div className="flex gap-[30px] h-full flex-auto bg-red-400 items-center px-3 bg-dimm">
                <p className="textcol-main font-medium text-[15px] whitespace-nowrap">{gameData.developer}</p>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {dateToText(gameData.release_date)} </p>
                <GamePreviewTags tags={gameData.tags} />
            </div>
        </header>

        <main className="flexgap w-full h-[256p] relative">
            <GamePreviewImage src={gameData.image}/>
            <section className="flexgap flex-col flex-auto">

                <div className="h-[158px] leading-[24px]">
                    <GamePreviewParagraph text={gameData.description} />
                </div>

                <div className="flexgap flex-auto">
                        <GamePreviewLeastLoved discipline={"Game speed"} value={67}/>
                        <GamePreviewTotalScore value={88} />
                        <GamePreviewMostLoved discipline={"Atmosphere"} value={91}/>
                </div>

            </section>
        </main>
    </div>
    )
}

function TabletItemLayout(gameData:Game){
    return(
        <div className="w-full max-w-[770px] h-[344px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <header className="flexgap flex-col w-full h-[78px] items-center">
            <GamePreviewTitle title={gameData.name} stretch center/>
            <div className="flex gap-[30px] w-full h-full flex-auto bg-red-400 items-center px-3 bg-dimm">
                <p className="textcol-main font-medium text-[15px] whitespace-nowrap">{gameData.developer}</p>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap">{dateToText(gameData.release_date)}</p>
                <GamePreviewTags tags={gameData.tags} />
            </div>
        </header>

        <main className="flexgap w-full h-[256px] relative">
            <GamePreviewImage src={gameData.image}/>
            <section className="flexgap flex-col flex-auto">

                <div className="max-w-[360px] w-full h-[158px] leading-[25px] ">
                <GamePreviewParagraph text={gameData.description} />
                </div>

                <div className="flexgap flex-auto">
                    <div className="flexgap flex-col">
                        <GamePreviewMostLoved discipline={"Atmosphere"} value={91} minimal/>
                        <GamePreviewLeastLoved discipline={"Game speed"} value={67} minimal/>
                    </div>
                        <GamePreviewTotalScore value={88} />
                </div>

            </section>
        </main>
    </div>
    )
}

function MobileItemLayout(gameData:Game){
    return(
        <div className="w-full max-w-[770px] h-[360px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <header className="flexgap flex-col w-full h-[34px]">
            <GamePreviewTitle title={gameData.name} stretch/>
        </header>

        <main className="flexgap w-full h-[320px] relative flex-col">
            <GamePreviewImage wfull src={gameData.image}/>
            <div className="absolute right-[5px] top-[5px] z-30">
                <GamePreviewTotalScore value={88} minimal/>
            </div>

            <div className="flex gap-[30px] w-[calc(100%-10px)] h-[34px] flex-auto items-center justify-between px-3 bg-dimm absolute z-30 top-[153px] left-[5px]">
                <p className="textcol-main font-medium text-[15px] whitespace-nowrap">{gameData.developer}</p>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {dateToText(gameData.release_date)}</p>
            </div>

            <section className="flexgap flex-auto flex-col">
                    <div className="flex flex-auto text-right text-[14px] textcol-dimm whitespace-nowrap bg-dimm h-[34px] items-center justify-end p-[10px]">
                        <GamePreviewTags tags={gameData.tags} />
                    </div>
                    <GamePreviewMostLoved discipline={"Atmosphere"} value={91} minimal/>
                    <GamePreviewLeastLoved discipline={"Game speed"} value={67} minimal/>
            </section>
        </main>
    </div>
    )
}


export default function GamePreviewItem(props:{
    gameData:Game
}){

    const windowSelector = useAppSelector((state:RootState) => state.window)

    if(windowSelector.width !== -1) return(
        <>
            {windowSelector.width > 880 ? PCItemLayout(props.gameData) : windowSelector.width < 600 ? MobileItemLayout(props.gameData) : TabletItemLayout(props.gameData)}
        </>
    )
}