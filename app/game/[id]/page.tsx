import GameVideo from "@/components/GameVideo/GameVideo"
import HoverIcon from "@/components/HoverIcon/HoverIcon"
import GameReviewItemsLoader from "@/components/Loader/GameReviewItemsLoader/GameReviewItemsLoader"
import PageErrorMessage from "@/components/PageErrorMessage/PageErrorMessate"
import InfoLine from "@/components/ProfileInfoLine/ProfileInfoLine"
import ScoreGrid from "@/components/ScoreGrid/ScoreGrid"
import { AverageScoreItem, Game, GameReviewData, GameReviewSample, TagItem } from "@/interface"
import { formatHours } from "@/utils/formatter"
import { supabaseGetGameReviews } from "@/utils/supabaseFetching"
import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image"
const usetube = require('usetube')

function UserTotalStat(props: {
    icon: string,
    title: string,
    value: string | number
}) {
    return (
        <div className="flex-auto h-full group flexgap flex-col justify-between w-full overflow-hidden bg-hi relative pten">
            <div className="flexgap justify-end items-center overflow-hidden">
                <Image src={props.icon} alt={`${props.title} icon`} width={85} height={85} className="sm:w-[125px] sm:h-[125px] w-[70px] h-[70px] absolute sm:left-[-50px] sm:top-[-20px] left-[-20px] top-[-10px] opacity-25 group-hover:opacity-30 transition-all duration-200" />
                <p className="textcol-main opacity-75 group-hover:opacity-100 transition-all duration-200 sm:text-[16px] text-[18px] font-medium">{props.title}</p>
            </div>
            <p className={`${props.value.toString().split("").length > 12 ? "sm:text-[23px] pb-[5px] sm:leading-[23px]" : "sm:text-[35px] sm:leading-[35px]"} leading-[22px] text-[22px] textcol-main font-semibold whitespace-nowrap overflow-y-hidden overflow-x-auto text-right`}>{props.value}</p>
        </div>
    )
}

export default async function Game({ params }: {
    params: {
        id: string
    }
}) {

    let promises = await Promise.all([
        supabaseRootClient().from("Game").select(`
        *,
        review:AverageReview(*),
        developers:GameDeveloper(
             Developer(developer)
        ),
        platforms:GamePlatform(
            Platform(platform)
        ),
        tags:GameTag(
             Tag(tag)
        )
    `).eq("id", params.id).single(),
        supabaseGetGameReviews(10, 0, params.id)
    ])

    let gameError = promises[0].error?.message;
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
        platforms: {
            Platform: {
                platform: string
            }
        }[]
    };

    let gameInfo: GameReviewAndInfo = promises[0].data;
    let reviewsData = promises[1].data as unknown as GameReviewSample[];
    const gameDuplicateRequest = await supabaseRootClient().from("Game").select("id").eq("name", gameInfo.name);
    let video = await usetube.searchVideo(`${gameInfo.name}-${new Date(gameInfo.release_date).getFullYear()}-original-game-trailer`);
    let youtubeId: string | undefined = video.videos[0].id || undefined;

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
    } as GameReviewData;

    function PCLayout() {
        return (
            <div className="w-full k:flex hidden gapt flex-col mx-auto max-w-[1000px] relative">
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

                        <div className="flexgap h-[34px]">
                            <InfoLine text={"Platforms"} addClass="textcol-main bg-mid saturate-[70%]" />
                            {gameDuplicateRequest.data && gameDuplicateRequest.data?.length > 1 && <HoverIcon hoverText={"The list of platforms may have inaccuracies due to duplicate game names."} />}
                        </div>
                        <div className="flexgap flex-wrap">
                            {gameInfo.platforms.map((Platform) => <p key={Platform.Platform.platform} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Platform.Platform.platform}</p>)}
                        </div>
                        <InfoLine text={"Involved Companies"} addClass="textcol-main bg-mid saturate-[70%] max-h-[34px]" />
                        <div className="flexgap flex-wrap ">
                            {gameInfo.developers.map((Developer) => <p key={Developer.Developer.developer} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Developer.Developer.developer}</p>)}
                        </div>
                    </div>
                    <Image src={gameInfo.image} alt={`${gameInfo.name} image`} width={400} height={600} className="w-full max-w-[450px] h-full object-cover object-top brightness-[85%] hover:brightness-100 transition-all duration-200" />
                </div>

                <GameVideo videoId={youtubeId} position="top-[445px] right-[-10px]" />
                <p className="flex-auto bg-dimm textcol-dimm p-[10px] overflow-y-auto max-h-[170px] h-full">
                    {gameInfo.description}
                </p>
                <div className="flexgap h-[120px] saturate-[85%]">
                    <UserTotalStat icon={"/icons/clock.svg"} title={"Played for"} value={formatHours(gameInfo.review.total_hours)} />
                    <UserTotalStat icon={"/icons/comments.svg"} title={"Reviews"} value={gameInfo.review.review_count} />
                    <UserTotalStat icon={"/icons/circle-check.svg"} title={"Completion rate"} value={`${gameInfo.review.completion_rate}%`} />
                    <UserTotalStat icon={"/icons/hourglass.svg"} title={"Average Hours"} value={formatHours(gameInfo.review.total_hours / gameInfo.review.review_count)} />
                </div>
            </div>
        )
    }


    function TabletLayout() {
        return (
            <div className="w-full k:hidden max640:hidden flex gapt flex-col mx-auto max-w-[1000px]">
                <div className="w-full flexgap h-fit relative">
                    <div className="flexgap flex-col flex-auto h-full w-full">
                        <p className="absolute k:right-[-10px] right-[-5px] top-[45px] bg-dimm z-10 px-[10px] k:h-[47px] h-[37px] flex items-center justify-center textcol-main font-medium text-[18px] bordercol-gray 
                    k:border-l-[10px] k:border-b-[10px] k:border-r-[10px]
                    border-l-[5px] border-b-[5px] border-r-[5px]
                    ">{gameInfo.release_date.toString()}</p>

                        <p className="w-full textcol-main text-[20px] font-semibold overflow-x-auto overflow-y-hidden bg-hi saturate-[80%] px-[10px] min-h-[40px] flex items-center">{gameInfo.name}</p>
                        <Image src={gameInfo.image} alt={`${gameInfo.name} image`} width={1000} height={200} className="w-full max-w-[1000px] h-[200px] object-center object-cover brightness-[85%] hover:brightness-100 transition-all duration-200" />
                        <GameVideo videoId={youtubeId} position="top-[196px] right-[-5px]" />
                        <div className="flexgap flex-wrap">
                            {gameInfo.tags.map((tag: TagItem) => <p key={tag.Tag.tag} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{tag.Tag.tag}</p>)}
                        </div>

                        <div className="flexgap h-[34px]">
                            <InfoLine text={"Platforms"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                            {gameDuplicateRequest.data && gameDuplicateRequest.data?.length > 1 && <HoverIcon hoverText={"The list of platforms may have inaccuracies due to duplicate game names."} />}
                        </div>
                        <div className="flexgap flex-wrap">
                            {gameInfo.platforms.map((Platform) => <p key={Platform.Platform.platform} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Platform.Platform.platform}</p>)}
                        </div>
                        <InfoLine text={"Involved Companies"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                        <div className="flexgap flex-wrap">
                            {gameInfo.developers.map((Developer) => <p key={Developer.Developer.developer} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Developer.Developer.developer}</p>)}
                        </div>
                        <InfoLine text={"Description"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                        <p className="flex-auto bg-dimm textcol-dimm p-[10px] overflow-y-auto max-h-[200px]">
                            {gameInfo.description}
                        </p>
                    </div>

                </div>

                <div className="flex-col flex gapt h-fit saturate-[85%]">
                    <div className="flexgap">
                        <UserTotalStat icon={"/icons/clock.svg"} title={"Played for"} value={formatHours(gameInfo.review.total_hours)} />
                        <UserTotalStat icon={"/icons/comments.svg"} title={"Reviews"} value={gameInfo.review.review_count} />
                    </div>
                    <div className="flexgap">
                        <UserTotalStat icon={"/icons/circle-check.svg"} title={"Completion rate"} value={`${gameInfo.review.completion_rate}%`} />
                        <UserTotalStat icon={"/icons/hourglass.svg"} title={"Average Hours"} value={formatHours(gameInfo.review.total_hours / gameInfo.review.review_count)} />
                    </div>
                </div>
            </div>
        )
    }


    function MobileLayout() {
        return (
            <div className="w-full sm:hidden flex gapt flex-col mx-auto max-w-[1000px]">
                <div className="w-full flexgap h-fit relative">
                    <div className="flexgap flex-col flex-auto h-full w-full relative">
                        <p className="absolute k:right-[-10px] right-[-5px] top-[45px] bg-dimm z-10 px-[10px] k:h-[47px] h-[37px] flex items-center justify-center textcol-main font-medium text-[18px] bordercol-gray 
                    k:border-l-[10px] k:border-b-[10px] k:border-r-[10px]
                    border-l-[5px] border-b-[5px] border-r-[5px]
                    ">{gameInfo.release_date.toString()}</p>

                        <p className="w-full textcol-main text-[20px] font-semibold overflow-x-auto overflow-y-hidden bg-hi saturate-[80%] px-[10px] min-h-[40px] flex items-center">{gameInfo.name}</p>
                        <Image src={gameInfo.image} alt={`${gameInfo.name} image`} width={1000} height={200} className="w-full max-w-[1000px] h-[200px] object-center object-cover brightness-[85%] hover:brightness-100 transition-all duration-200" />
                        <GameVideo videoId={youtubeId} position="top-[196px] right-[-5px]" />
                        <div className="flexgap flex-wrap">
                            {gameInfo.tags.map((tag: TagItem) => <p key={tag.Tag.tag} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{tag.Tag.tag}</p>)}
                        </div>

                        <div className="flexgap h-[34px]">
                            <InfoLine text={"Platforms"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                            {gameDuplicateRequest.data && gameDuplicateRequest.data?.length > 1 && <HoverIcon hoverText={"The list of platforms may have inaccuracies due to duplicate game names."} />}
                        </div>
                        <div className="flexgap flex-wrap">
                            {gameInfo.platforms.map((Platform) => <p key={Platform.Platform.platform} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Platform.Platform.platform}</p>)}
                        </div>
                        <InfoLine text={"Involved Companies"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                        <div className="flexgap flex-wrap">
                            {gameInfo.developers.map((Developer) => <p key={Developer.Developer.developer} className="textcol-dimm px-[10px] bg-dimm cursor-default flex-auto flex items-center justify-center">{Developer.Developer.developer}</p>)}
                        </div>
                        <InfoLine text={"Description"} addClass="textcol-main bg-mid saturate-[70%]" align="justify-center" />
                        <p className="flex-auto bg-dimm textcol-dimm p-[10px] overflow-y-auto max-h-[200px]">
                            {gameInfo.description}
                        </p>
                    </div>

                </div>

                <div className="flex-col flex gapt h-fit saturate-[85%]">
                    <UserTotalStat icon={"/icons/clock.svg"} title={"Played for"} value={formatHours(gameInfo.review.total_hours)} />
                    <UserTotalStat icon={"/icons/comments.svg"} title={"Reviews"} value={gameInfo.review.review_count} />
                    <UserTotalStat icon={"/icons/circle-check.svg"} title={"Completion rate"} value={`${gameInfo.review.completion_rate}%`} />
                    <UserTotalStat icon={"/icons/hourglass.svg"} title={"Average Hours"} value={formatHours(gameInfo.review.total_hours / gameInfo.review.review_count)} />
                </div>


            </div>
        )
    }

    return (
        <div className="w-full flex gapt flex-col mx-auto max-w-[1000px]">
            <PCLayout />
            <TabletLayout />
            <MobileLayout />

            <ScoreGrid onlyNumbers data={gameScore} />

            <div className="flexgap flex-col">
                <div className="flexgap flex-auto bg-mid items-center justify-center h-[120px] relative overflow-hidden">
                    <p className="textcol-main text-[25px] font-semibold pten">User Reviews</p>
                    <Image src={"/icons/Gamepad.svg"} alt={"gamepad"} className="absolute left-[-40px] top-[-75px] w-[200px] h-[200px] opacity-[7%] select-none pointer-events-none rotate-[-20deg]" width={200} height={200} />
                    <Image src={"/icons/pac.svg"} alt={"pac"} className="absolute right-[0px] top-[-15px] w-[100px] h-[100px] opacity-[7%] select-none pointer-events-none rotate-12" width={100} height={100} />
                    <Image src={"/icons/group.svg"} alt={"group"} className="absolute left-[25%] bottom-[-40px] w-[200px] h-[200px] opacity-[5%] select-none pointer-events-none" width={200} height={200} />
                    <Image src={"/icons/trophy.svg"} alt={"trophy"} className="absolute right-[25%] bottom-[0px] w-[100px] h-[100px] opacity-[5%] select-none pointer-events-none rotate-[24deg]" width={100} height={100} />
                </div>
                <GameReviewItemsLoader gameId={params.id} initialData={reviewsData} />
            </div>
        </div>
    )
}