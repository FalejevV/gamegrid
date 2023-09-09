"use client"
import GamePreviewTitle from "../GamePreviewBlocks/GamePreviewTitle";
import GamePreviewLeastLoved from "../GamePreviewBlocks/GamePreviewLeastLoved";
import GamePreviewMostLoved from "../GamePreviewBlocks/GamePreviewMostLoved";
import GamePreviewParagraph from "../GamePreviewBlocks/GamePreviewParagraph";
import GamePreviewTotalScore from "../GamePreviewBlocks/GamePreviewTotalScore";
import GamePreviewImage from "../GamePreviewBlocks/GamePreviewImage";
import { RootState, useAppSelector } from "@/store/store";
import GamePreviewTags from "@/layout/GamePreviewTags";
import { AverageScoreItem, Game, ScoreItem, ScoreNameList } from "@/interface";
import { useEffect, useState } from "react";
import scoreName from "@/utils/scoreName";
import AdditionalInfoHover from "../AdditionalInfoHover/AdditionalInfoHover";
import Tag from "../Tag/Tag";

function getDeveloperStringArray(game:Game):string[]{
    return game.developer.map((developer:{Developer: {developer:string}}) => developer.Developer.developer).slice(1);
}

function PCItemLayout(gameData:Game, leastLoved:ScoreItem, mostLoved:ScoreItem, total:ScoreItem){
    return(
        <section className="w-full max-w-[1000px] h-[300px] min-h-[300px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <div className="flexgap w-full h-[34px] items-center">
            <GamePreviewTitle title={gameData.name} />
            <div className="flex gap-[30px] h-full flex-auto bg-red-400 items-center px-3 bg-dimm">
                <div className="flex gap-[10px] items-center">
                    <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                    <AdditionalInfoHover single items={getDeveloperStringArray(gameData)} type={"developer"} />
                </div>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {gameData.release_date.toString()} </p>
                <GamePreviewTags tags={gameData.tags} />
            </div>
        </div>

        <div className="flexgap w-full h-[256p] relative">
            <GamePreviewImage src={gameData.image}/>
            <section className="flexgap flex-col flex-auto">

                <div className="h-[158px] leading-[24px]">
                    <GamePreviewParagraph text={gameData.description} />
                </div>

                <div className="flexgap flex-auto">
                        <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value}/>
                        <GamePreviewTotalScore value={total.value} />
                        <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value}/>
                </div>

            </section>
        </div>
    </section>
    )
}

function TabletItemLayout(gameData:Game,leastLoved:ScoreItem, mostLoved:ScoreItem, total:ScoreItem){
    return(
        <section className="w-full h-[344px] min-h-[344px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <div className="flexgap flex-col w-full h-[78px] items-center">
            <GamePreviewTitle title={gameData.name} stretch center/>
            <div className="flex gap-[30px] w-full h-full flex-auto bg-red-400 items-center px-3 bg-dimm">
                <div className="flex gap-[10px] items-center">
                    <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                    <AdditionalInfoHover single items={getDeveloperStringArray(gameData)} type={"developer"} />
                </div>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap">{gameData.release_date.toString()}</p>
                <GamePreviewTags tags={gameData.tags} />
            </div>
        </div>

        <div className="flexgap w-full h-[256px] relative">
            <GamePreviewImage src={gameData.image}/>
            <div className="flexgap flex-col flex-auto">

                <div className="w-full h-[158px] leading-[25px] ">
                    <GamePreviewParagraph text={gameData.description} />
                </div>

                <div className="flexgap flex-auto">
                    <div className="flexgap flex-col flex-auto">
                        <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value} minimal/>
                        <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value} minimal/>
                    </div>
                        <GamePreviewTotalScore value={total.value} />
                </div>

            </div>
        </div>
    </section>
    )
}

function MobileItemLayout(gameData:Game,leastLoved:ScoreItem, mostLoved:ScoreItem, total:ScoreItem){
    return(
        <section className="w-full max-w-[770px] h-[360px] min-h-[360px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
        <div className="flexgap flex-col w-full h-[34px]">
            <GamePreviewTitle title={gameData.name} stretch/>
        </div>

        <div className="flexgap w-full h-[320px] relative flex-col">
            <GamePreviewImage wfull src={gameData.image}/>
            <div className="absolute right-[5px] top-[5px] z-30">
                <GamePreviewTotalScore value={total.value} minimal/>
            </div>

            <div className="flex gap-[30px] w-[calc(100%-10px)] h-[34px] flex-auto items-center justify-between px-3 bg-dimm absolute z-30 top-[153px] left-[5px]">
                <div className="flex gap-[10px] items-center">
                    <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                    <AdditionalInfoHover single direction="left-[-30px]" items={getDeveloperStringArray(gameData)} type={"developer"} />
                </div>
                <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {gameData.release_date.toString()}</p>
            </div>

            <div className="flexgap flex-auto flex-col">
                    <div className="flex flex-auto text-right text-[14px] textcol-dimm whitespace-nowrap bg-dimm h-[34px] items-center justify-end p-[10px]">
                        <GamePreviewTags tags={gameData.tags} />
                    </div>
                    <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value} minimal/>
                    <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value} minimal/>
            </div>
        </div>
    </section>
    )
}


export default function GamePreviewItem(props:{
    gameData:Game
}){

    const windowSelector = useAppSelector((state:RootState) => state.window)
    const [leastLoved,setLeastLoved] = useState<ScoreItem>();
    const [mostLoved,setMostLoved] = useState<ScoreItem>();
    const [total,setTotal] = useState<ScoreItem>({
        title:"Overall rating",
        value:props.gameData.score.total
    });
    useEffect(() => {
        // @ts-ignore 
        let keys:(keyof AverageScoreItem)[] = Object.keys(props.gameData.score);
        let leastValue = 100;
        let leastName = "";
        let mostName = "";
        let mostValue = 0;
        let sum = 0;
        keys.forEach((key: keyof AverageScoreItem) => {
            if(key !== "game_id"){
                let scoreValue = props.gameData.score[key];
                if(scoreValue < leastValue){
                    leastValue = scoreValue;
                    leastName = key;
                }
                if(scoreValue > mostValue){
                    mostValue = scoreValue;
                    mostName = key;
                }
                sum += scoreValue;
            }
        })

        // transform database score names to normal names ("graphics_avg" into "graphics")
        let leastNameCut = leastName.slice(0,leastName.length-4) as keyof ScoreNameList;
        setLeastLoved({
            // replace score name with some preset/full namings
            title:scoreName[leastNameCut],
            value:leastValue
        });

        let mostNameCut = mostName.slice(0,mostName.length-4) as keyof ScoreNameList;
        setMostLoved({
            title:scoreName[mostNameCut],
            value:mostValue
        })

        let totalScore = sum / (keys.length-2);
    },[])

    // check if width is set and values are calculated
    if(windowSelector.width !== -1 && leastLoved && mostLoved && total) return(
        <>
            {windowSelector.width > 1000 ? PCItemLayout(props.gameData,leastLoved,mostLoved,total) : 
            windowSelector.width < 600 ? MobileItemLayout(props.gameData,leastLoved,mostLoved,total) : TabletItemLayout(props.gameData,leastLoved,mostLoved,total)}
        </>
    )
}