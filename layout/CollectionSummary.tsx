import { GameReviewData } from "@/interface"
import games from "@/store/features/games"




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
        <section className="summary-grid textcol-main font-semibold">
            <div className="count">
                <p className="gridtext-main">{games.length}</p>
                <p className="gridtext-title">Total Games</p>
            </div>

            <div className="tags gap-[30px]">
                <p className="text-[25px]">Action</p>
                <p className="text-[25px]">Adventure</p>
                <p className="text-[25px]">RPG</p>
                <p className="gridtext-title">Favourite Tags</p>
            </div>

            <div className="completion">
                <p className="gridtext-main">68%</p>
                <p className="gridtext-title">Completion Rate</p>
            </div>
            <div className="hours">
                <p className="gridtext-main">1320</p>
                <p className="gridtext-title">Total Hours</p>
            </div>
            <div className="comment gap-[15px]">
                <p className="text-[20px] text-left w-full px-[15px]">Red Dead Redemption 2</p>
                <p className="text-[16px] font-normal px-[15px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aspernatur consequuntur, vitae adipisci maxime consequatur, voluptatibus doloremque tempora totam autem ipsum voluptates labore illo, atque veniam.</p>
                <p className="gridtext-title">Random Comment</p>
            </div>
            <div className="platform">
                <p className="text-[30px]">PlayStation 4</p>
                <p className="gridtext-title">Popular Platform</p>
            </div>
            <div className="date gap-[20px]">
                <p className="text-[30px]">20</p>
                <p className="text-[30px]">December</p>
                <p className="text-[30px]">2022</p>

                <p className="gridtext-title">Last Game Completion</p>
            </div>
            <div className="rating">
                <p className="gridtext-main">78/100</p>
                <p className="gridtext-title">Average Rating</p>
            </div>
            <div className="average-time">
                <p className="gridtext-main">120</p>
                <p className="gridtext-title">Game Hours</p>
            </div>
        </section>
    )
}