"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { APICallSupabaseGameReviewsSelect} from "@/utils/apiFetching";
import { amountFetch } from "@/utils/config";
import { GameReviewSample, GameReviewSampleDataError} from "@/interface";
import GameReviewSampleItem from "@/components/GameReviewSampleItem/GameReviewSampleItem";


async function fetchGameReviews(gameId: number | string, amount: number, offset: number): Promise<GameReviewSampleDataError> {
    let result:GameReviewSampleDataError = await APICallSupabaseGameReviewsSelect(gameId, amount, offset)
    return result;
}

export default function GameReviewItemsLoader(props: {
    gameId: number | string,
    initialData:GameReviewSample[]
}) {
    const [noMoreGames, setNoMoreGames] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [fetchedGames, setFetchedGames] = useState<GameReviewSample[]>(props.initialData);
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (!inView || !loaded || isBusy || noMoreGames) return;
        setIsBusy(true);
        fetchGameReviews(props.gameId, amountFetch, fetchedGames.length || 0).then((result: GameReviewSampleDataError) => {
            if (result.data) {
                if (result.data.length === 0 || !result.data) {
                    setNoMoreGames(true);
                } else {
                    setFetchedGames((prev: GameReviewSample[]) => {
                        let newArray = [...prev];
                        if(result.data && result.data.length > 0){
                            result.data.forEach((item:GameReviewSample) => {
                                if(newArray.filter((existingItem:GameReviewSample) => item.profile.username === existingItem.profile.username).length === 0){
                                    newArray.push(item);
                                }
                            })
                        }
                        return newArray;
                    });
                    setIsBusy(false);
                }
            }else{
                setNoMoreGames(true);
            }
        })

    }, [inView, loaded, isBusy, noMoreGames]);
    useEffect(() => {
        setLoaded(true);
    }, []);
    return (
        <>
            <div className="w-full flexgap flex-col">
                {fetchedGames.length > 0 && fetchedGames.map((game: GameReviewSample, index:number) => <GameReviewSampleItem key={game.profile.username} game={game} oddColor={index % 2 !== 0} />)}
            </div>
            {!noMoreGames && <Image ref={ref} src={"/Loading-pulse.gif"} alt={"loading animation"} width={60} height={60} className="w-[60px] h-[60px] mx-auto"/>}
        </>
    )
}

