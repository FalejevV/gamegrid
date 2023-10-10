"use client"

import GamePreviewTitle from "../GamePreviewBlocks/GamePreviewTitle";
import GamePreviewLeastLoved from "../GamePreviewBlocks/GamePreviewLeastLoved";
import GamePreviewMostLoved from "../GamePreviewBlocks/GamePreviewMostLoved";
import GamePreviewParagraph from "../GamePreviewBlocks/GamePreviewParagraph";
import GamePreviewTotalScore from "../GamePreviewBlocks/GamePreviewTotalScore";
import GamePreviewImage from "../GamePreviewBlocks/GamePreviewImage";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import GamePreviewTags from "@/layout/GamePreviewTags";
import { AverageScoreItem, Game, ScoreItem, ScoreNameList } from "@/interface";
import { useEffect, useState } from "react";
import scoreName from "@/utils/scoreName";
import AdditionalInfoHover from "../AdditionalInfoHover/AdditionalInfoHover";
import Tag from "../Tag/Tag";
import { useInView } from "react-intersection-observer";
import { setCanBeLoaded } from "@/store/features/games";
import Link from "next/link";

function getDeveloperStringArray(game: Game): string[] {
    return game.developer.map((developer: { Developer: { developer: string } }) => developer.Developer.developer).slice(1);
}

function PCItemLayout(gameData: Game, leastLoved: ScoreItem, mostLoved: ScoreItem, total: ScoreItem, inView: boolean) {
    return (
        <section className="w-full max-w-[1000px] h-[300px] min-h-[300px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
            <div className={`w-full flexgap flex-col`} style={{ display: inView ? 'flex' : 'none' }}>
                <div className="flexgap w-full h-[34px] items-center">
                    <GamePreviewTitle title={gameData.name} />
                    <div className="flex gap-[30px] h-full flex-auto bg-red-400 items-center px-3 bg-dimm">
                        <div className="flex gap-[10px] items-center relative">
                            <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                            <AdditionalInfoHover single items={getDeveloperStringArray(gameData)} type={"developer"} direction="left-[-20px]" />
                        </div>
                        <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {gameData.release_date.toString()} </p>
                        <GamePreviewTags tags={gameData.tags} />
                    </div>
                </div>

                <div className="flexgap w-full h-[256p] relative">
                    <GamePreviewImage src={gameData.image} />
                    <section className="flexgap flex-col flex-auto">

                        <div className="h-[158px] leading-[24px]">
                            <GamePreviewParagraph text={gameData.description} />
                        </div>

                        <div className="flexgap flex-auto">
                            <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value} />
                            <GamePreviewTotalScore value={total.value} />
                            <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value} />
                        </div>

                    </section>
                </div>
            </div>
        </section>
    )
}

function TabletItemLayout(gameData: Game, leastLoved: ScoreItem, mostLoved: ScoreItem, total: ScoreItem, inView: boolean) {
    return (
        <section className="w-full h-[344px] min-h-[344px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
            <div className={`w-full flexgap flex-col`} style={{ display: inView ? 'flex' : 'none' }}>
                <div className="flexgap flex-col w-full h-[78px] items-center">
                    <GamePreviewTitle title={gameData.name} stretch center />
                    <div className="flex gap-[30px] w-full h-full flex-auto bg-red-400 items-center px-3 bg-dimm relative">
                        <div className="flex gap-[10px] items-center">
                            <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                        </div>
                        <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap">{gameData.release_date.toString()}</p>
                        <GamePreviewTags tags={gameData.tags} />
                    </div>
                </div>

                <div className="flexgap w-full h-[256px] relative">
                    <GamePreviewImage src={gameData.image} />
                    <div className="flexgap flex-col flex-auto">

                        <div className="w-full h-[158px] leading-[25px] ">
                            <GamePreviewParagraph text={gameData.description} />
                        </div>

                        <div className="flexgap flex-auto">
                            <div className="flexgap flex-col flex-auto">
                                <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value} minimal />
                                <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value} minimal />
                            </div>
                            <GamePreviewTotalScore value={total.value} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

function MobileItemLayout(gameData: Game, leastLoved: ScoreItem, mostLoved: ScoreItem, total: ScoreItem, inView: boolean) {
    return (
        <section className="w-full max-w-[770px] h-[360px] min-h-[360px] flexgap flex-col overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300">
            <div className={`w-full flexgap flex-col`} style={{ display: inView ? 'block' : 'none' }}>
                <div className="flexgap flex-col w-full h-[34px]">
                    <GamePreviewTitle title={gameData.name} stretch />
                </div>

                <div className="flexgap w-full h-[320px] relative flex-col">
                    <GamePreviewImage wfull src={gameData.image} />
                    <div className="absolute right-[5px] top-[5px] z-30">
                        <GamePreviewTotalScore value={total.value} minimal />
                    </div>

                    <div className="flex gap-[30px] w-full h-[34px] min-h-[34px] flex-auto items-center justify-between px-3 bg-dimm">
                        <div className="flex gap-[10px] items-center">
                            <Tag single tag={gameData.developer[0].Developer.developer} bright type="developer" />
                        </div>
                        <p className="textcol-dimm font-medium text-[14px] whitespace-nowrap"> {gameData.release_date.toString()}</p>
                    </div>

                    <div className="flexgap flex-auto flex-col">
                        <div className="flex flex-auto text-right text-[14px] textcol-dimm whitespace-nowrap bg-dimm h-[34px] items-center justify-end p-[10px]">
                            <GamePreviewTags tags={gameData.tags} />
                        </div>
                        <GamePreviewMostLoved discipline={mostLoved.title} value={mostLoved.value} minimal />
                        <GamePreviewLeastLoved discipline={leastLoved.title} value={leastLoved.value} minimal />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default function GamePreviewItem(props: {
    gameData: Game
}) {

    const windowSelector = useAppSelector((state: RootState) => state.window);
    const canBeLoadedSelector = useAppSelector((state:RootState) => state.games.canBeLoaded);
    const dispatch = useAppDispatch();
    const [leastLoved, setLeastLoved] = useState<ScoreItem>();
    const [mostLoved, setMostLoved] = useState<ScoreItem>();
    const [total, setTotal] = useState<ScoreItem>({
        title: "Overall rating",
        value: props.gameData.score.total
    });
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(() => {
        // @ts-ignore 
        let keys: (keyof AverageScoreItem)[] = Object.keys(props.gameData.score);
        let leastValue = 100;
        let leastName = "";
        let mostName = "";
        let mostValue = 0;
        let sum = 0;
        keys.forEach((key: keyof AverageScoreItem) => {
            if (key.includes("avg") || key === "total") {
                let scoreValue = props.gameData.score[key];
                if (scoreValue < leastValue) {
                    leastValue = scoreValue;
                    leastName = key;
                }
                if (scoreValue > mostValue && leastName !== key && key !== "microtransactions_avg") {
                    mostValue = scoreValue;
                    mostName = key;
                }
                sum += scoreValue;
            }
        })

        // transform database score names to normal names ("graphics_avg" into "graphics")
        let leastNameCut = leastName.slice(0, leastName.length - 4) as keyof ScoreNameList;
        setLeastLoved({
            // replace score name with some preset/full namings
            title: scoreName[leastNameCut],
            value: leastValue
        });

        let mostNameCut = mostName.slice(0, mostName.length - 4) as keyof ScoreNameList;
        setMostLoved({
            title: scoreName[mostNameCut],
            value: mostValue
        })

        if(!canBeLoadedSelector){
            dispatch(setCanBeLoaded(true));
        }
    }, [])

    // check if width is set and values are calculated
    if (windowSelector.width !== -1 && leastLoved && mostLoved && total) return (
        <Link href={`game/${props.gameData.id}`} ref={ref} className="w-full max-w-[1000px]">
            {windowSelector.width > 1000 ? PCItemLayout(props.gameData, leastLoved, mostLoved, total, inView) :
                windowSelector.width < 600 ? MobileItemLayout(props.gameData, leastLoved, mostLoved, total, inView) : TabletItemLayout(props.gameData, leastLoved, mostLoved, total, inView)}
        </Link>
    )
}