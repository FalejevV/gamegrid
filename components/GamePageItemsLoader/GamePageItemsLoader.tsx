"use client"
import { Game } from "@/interface";
import { pushGames, setCanBeLoaded, setGames } from "@/store/features/games";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { URLQueryObject, generateSortFilterParams } from "@/utils/queryParams";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import GamePreviewItem from "../GamePreviewItem/GamePreviewItem";

export default function GamePageItemsLoader(props: {
    initialGames: Game[]
}) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });
    const [isBusy, setIsBusy] = useState(false);
    const sortFilterSelector = useAppSelector((state: RootState) => state.sortFilter);
    const dispatch = useAppDispatch();
    const gamesSelector = useAppSelector((state: RootState) => state.games);
    const [noMoreGames, setNoMoreGames] = useState(false);
    const [loaded, setLoaded] = useState(false);

    async function fetchGames(searchParams: URLQueryObject) {
        let result = await fetch('/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...searchParams.query,
            }),
        }).then(res => res.json());
        if (result.data.length === 0) {
            setNoMoreGames(true);
            return;
        }
        dispatch(pushGames(result.data));
    }

    useEffect(() => {
        if(!loaded || !gamesSelector.canBeLoaded) return;
        if (inView && !isBusy) {
            setIsBusy(true);
            let queryParams = generateSortFilterParams(sortFilterSelector, "games");
            queryParams.query.amount += gamesSelector.games.length;
            console.log(queryParams);
            fetchGames(queryParams);
        }
    }, [inView, gamesSelector]);

    useEffect(() => {
        setNoMoreGames(false);
        setIsBusy(false);
    },[gamesSelector]);

    useEffect(() => {
        if(!gamesSelector.canBeLoaded){
            setLoaded(false);
        }else{
            setLoaded(true);
        }
    }, [gamesSelector.canBeLoaded]);

   if(gamesSelector.canBeLoaded && loaded) return (
        <>
            <div className=" w-full flex flex-col gap-[60px] items-center">
                {gamesSelector.games.length > 0 && gamesSelector.games.map((game: Game) => <GamePreviewItem key={game.id + game.name} gameData={game} />)}
            </div>
            {!noMoreGames && <Image ref={ref} src={"/Loading-pulse.gif"} alt={"loading animation"} width={60} height={30} />}
        </>
    )
}