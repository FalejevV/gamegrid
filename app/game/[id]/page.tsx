import DataBlock from "@/components/DataBlock/DataBlock"
import PageErrorMessage from "@/components/PageErrorMessage/PageErrorMessate"
import InfoLine from "@/components/ProfileInfoLine/ProfileInfoLine"
import ScoreGrid from "@/components/ScoreGrid/ScoreGrid"
import { AverageScoreItem, Game, GameReviewData, TagItem } from "@/interface"
import { formatHours } from "@/utils/formatter"
import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image"



export default async function Game({ params }: {
    params: {
        id: string
    }
}) {

    const gameInfoRequest = await supabaseRootClient().from("Game").select(`
        *,
        review:AverageReview(*),
        developers:GameDeveloper(
             Developer(developer)
        ),
        tags:GameTag(
             Tag(tag)
        )
    `).eq("id", params.id).single()

    let gameError = gameInfoRequest.error?.message;
    if (gameError) {
        return (
            <PageErrorMessage text={gameError} />
        )
    }
    interface GameReviewAndInfo extends Game {
        review: AverageScoreItem,
        tags: TagItem[],
        developers: {
            Developer: {
                developer: string
            }
        }[],
    };
    let gameInfo: GameReviewAndInfo = gameInfoRequest.data;

    let gameScore = {
        graphics_score: gameInfo.review.graphics_avg,
        sound_score: gameInfo.review.sound_avg,
        gameplay_score: gameInfo.review.gameplay_avg,
        level_score: gameInfo.review.level_avg,
        balance_score: gameInfo.review.balance_avg,
        story_score: gameInfo.review.story_avg,
        performance_score: gameInfo.review.performance_avg,
        original_score: gameInfo.review.original_avg,
        customization_score: gameInfo.review.customization_avg,
        microtransactions_score: gameInfo.review.microtransactions_avg,
        support_score: gameInfo.review.support_avg,
        total_score: gameInfo.review.total,
    } as GameReviewData


    return (
        <div className="w-full flexgap flex-col mx-auto max-w-[1000px]">
            <div className="w-full flexgap h-[500px] relative">
                <div className="flexgap flex-col flex-auto h-full max-w-[550px]">
                    <p className="absolute k:right-[-10px] right-[-5px] top-0 bg-dimm z-10 px-[10px] k:h-[47px] h-[37px] flex items-center justify-center textcol-main font-medium text-[18px] bordercol-gray 
                    k:border-l-[10px] k:border-b-[10px] k:border-r-[10px]
                    border-l-[5px] border-b-[5px] border-r-[5px]
                    ">{gameInfo.release_date.toString()}</p>

                    <p className="w-full textcol-main text-[25px] font-semibold overflow-x-auto overflow-y-hidden bg-hi saturate-[80%] px-[10px] min-h-[40px] flex items-center">{gameInfo.name}</p>
                    <div className="flexgap flex-wrap">
                        {gameInfo.tags.map((tag: TagItem) => <p key={tag.Tag.tag} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{tag.Tag.tag}</p>)}
                    </div>

                    <InfoLine text={"Related Companies"} addClass="textcol-main bg-mid saturate-[70%]" />
                    <div className="flexgap flex-wrap">
                        {gameInfo.developers.map((Developer) => <p key={Developer.Developer.developer} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Developer.Developer.developer}</p>)}
                    </div>
                    <InfoLine text={"Description"} addClass="textcol-main bg-mid saturate-[70%]" />
                    <p className="flex-auto bg-dimm textcol-dimm p-[10px] overflow-y-auto">
                        {gameInfo.description}
                    </p>
                </div>
                <Image src={gameInfo.image} alt={`${gameInfo.name} image`} width={400} height={600} className="w-full max-w-[450px] h-full object-cover object-top brightness-75 hover:brightness-100 transition-all duration-200" />
            </div>

            <div className="flexgap">
                <DataBlock title={"Played for"} value={0} textValue={formatHours(gameInfo.review.total_hours)}/>
                <DataBlock title={"Reviewed"} value={0} textValue={`${gameInfo.review.review_count}`} />
                <DataBlock title={"Completion rate"} value={0} textValue={`${gameInfo.review.completion_rate}%`} />
                <DataBlock title={"Average hours"} value={0} textValue={`${gameInfo.review.total_hours / gameInfo.review.review_count}h`} />
            </div>
            <ScoreGrid onlyNumbers data={gameScore} />
        </div>
    )
}