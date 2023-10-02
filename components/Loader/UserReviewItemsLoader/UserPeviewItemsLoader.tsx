"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { APICallSupabaseUserReviewsSelect } from "@/utils/apiFetching";
import { amountFetch } from "@/utils/config";
import { UserReviewSample, UserReviewSampleDataError } from "@/interface";
import GamePreviewSampleItem from "@/components/UserReviewSampleItem/UserReviewSampleItem";
import UserReviewListItem from "@/components/UserReviewListItem/UserReviewListItem";


async function fetchUserReview(publicId: number, amount: number, offset: number): Promise<UserReviewSampleDataError> {
    let result = await APICallSupabaseUserReviewsSelect(publicId, amount, offset)
    return result;
}

export default function UserReviewItemsLoader(props: {
    publicId: number,
    initialData:UserReviewSample[]
}) {
    const [noMoreGames, setNoMoreGames] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [fetchedGames, setFetchedGames] = useState<UserReviewSample[]>(props.initialData);
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    useEffect(() => {
        if (!inView || !loaded || isBusy || noMoreGames) return;
        setIsBusy(true);
        fetchUserReview(props.publicId, amountFetch, fetchedGames.length || 0).then((result: UserReviewSampleDataError) => {
            if (result.data) {
                if (result.data.length === 0 || !result.data) {
                    setNoMoreGames(true);
                } else {
                    setFetchedGames((prev: UserReviewSample[]) => {
                        let newArray = [...prev];
                        if(result.data && result.data.length > 0){
                            result.data.forEach((item:UserReviewSample) => {
                                if(newArray.filter((existingItem:UserReviewSample) => item.game.id === existingItem.game.id).length === 0){
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
                {fetchedGames.length > 0 && fetchedGames.map((game: UserReviewSample, index:number) => <UserReviewListItem key={game.game.id} game={game} oddColor={index % 2 !== 0} />)}
            </div>
            {!noMoreGames && <Image ref={ref} src={"/Loading-pulse.gif"} alt={"loading animation"} width={60} height={60} className="w-[60px] h-[60px] mx-auto"/>}
        </>
    )
}