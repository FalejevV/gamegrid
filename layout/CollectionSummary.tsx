import { GameReviewData } from "@/interface"




export default function CollectionSummary(props: {
    games: GameReviewData[]
}) {

    if (props.games.length === 0) return (
        <section className="w-full h-[400px] flex items-center justify-center bg-dimm">
            <p className=" text-[25px] textcol-main font-medium">
                You have no games added to your collection.
            </p>
        </section>
    )

    return (
        <section className="w-full h-[400px] bg-[#ffffff18] flex items-center justify-center textcol-main text-[30px]">
            <p>GAMES COUNT: {props.games.length}</p>
        </section>
    )
}