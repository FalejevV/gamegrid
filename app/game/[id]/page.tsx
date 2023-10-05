import PageErrorMessage from "@/components/PageErrorMessage/PageErrorMessate"
import ScoreGrid from "@/components/ScoreGrid/ScoreGrid"
import { AverageScoreItem, Game, GameReviewData } from "@/interface"
import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image"



export default async function Game({ params }: {
    params: {
        id: string
    }
}) {

    const gameInfoRequest = await supabaseRootClient().from("AverageReview").select(`
        *,
        game:Game(*)
    `).eq("game_id", params.id).single()

    let gameError = gameInfoRequest.error?.message;
    if (gameError) {
        return (
            <PageErrorMessage text={gameError} />
        )
    }
    interface GameReviewAndInfo extends AverageScoreItem {
        game: Game
    };
    let gameInfo: GameReviewAndInfo = gameInfoRequest.data;

    let gameScore = {
        graphics_score: gameInfo.graphics_avg,
        sound_score: gameInfo.sound_avg,
        gameplay_score: gameInfo.gameplay_avg,
        level_score: gameInfo.level_avg,
        balance_score: gameInfo.balance_avg,
        story_score: gameInfo.story_avg,
        performance_score: gameInfo.performance_avg,
        original_score: gameInfo.original_avg,
        customization_score: gameInfo.customization_avg,
        microtransactions_score: gameInfo.microtransactions_avg,
        support_score: gameInfo.support_avg,
        total_score: gameInfo.total,
    } as GameReviewData


    return (
        <div className="w-full flexgap flex-col mx-auto max-w-[1000px]">
            <div className="w-full flexgap h-[500px]">
                <div className="flexgap flex-col flex-auto h-full max-w-[550px]">
                    <p className="w-full textcol-main text-[25px] font-semibold overflow-x-auto overflow-y-hidden bg-mid px-[10px]">{gameInfo.game.name}</p>

                </div>
                <Image src={gameInfo.game.image} alt={`${gameInfo.game.name} image`} width={400} height={600} className="w-full max-w-[450px] h-full object-cover object-top saturate-50" />
            </div>
            <ScoreGrid onlyNumbers data={gameScore} />
        </div>
    )
}