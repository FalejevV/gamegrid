import ProfileEditButton from "@/components/EditButtons/ProfileEditButton/ProfileEditButton";
import GameItemDataBlock from "@/components/GameItemDataBlock/GameItemDataBlock";
import { CollectionSummaryInfo, IProfile, UserReviewSample, UserReviewSampleDataError } from "@/interface";
import { dateToText } from "@/utils/formatter";
import { supabaseGetUserReviews } from "@/utils/supabaseFetching";
import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image";
import Link from "next/link";

export const revalidate = 1800;

function ProfileInfoLine(props: {
    text: string | number,
    addClass?: string,
    flexauto?: boolean,
    align?: string
}) {
    return (
        <p className={`h-[34px] flex items-center px-[10px]
            ${props.addClass ? props.addClass : "bg-dimm"}
            ${props.flexauto && "flex-auto"}
            ${props.align && props.align}
        `}>
            {props.text}
        </p>
    )
}

function GamePreviewItem(props: {
    review: UserReviewSample,
    userId:number
}) {
    if(!props?.review?.game.id || !props?.review?.total_score) return;
    return (
        <Link href={`/review/${props.userId}/${props.review.game.id}`} className="w-[333px] min-w-[300px] flexgap flex-col hover:brightness-110 transition-all duration-150">
            <ProfileInfoLine text={props.review.game.name} />
            <Image src={props.review.game.image} alt={`${props.review.game.name} image`} width={326} height={150} className="w-full max-w-[326px] h-[150px] object-cover" />
            <div className="flexgap">
                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] flex-auto">
                    <p className="textcol-dimm">Hours</p>
                    <p className="textcol-main">{props.review.hours_spent}</p>
                </div>

                <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px] flex-auto">
                    <p className="textcol-dimm">Score</p>
                    <p className="textcol-main">{props.review.total_score}/100</p>
                </div>
            </div>
            <div className="bg-dimm h-[34px] flexgap items-center justify-between px-[10px]">
                <p className="textcol-dimm">Completed</p>
                <p className="textcol-main">{props.review.finished ? "Yes" : "No"}</p>
            </div>

        </Link>
    )
}

export default async function Profile({ params }: {
    params: {
        id: number
    }
}) {

    const profileRequest = await supabaseRootClient().from("profile").select(`
    id,
    user_id,
    username,
    avatar,
    created_at,
    gender:Gender(gender),
    country:Country(country)
    `).eq("user_id", params.id).single();

    if (profileRequest.error) {
        return (
            <div className="mx-auto w-full max-w-[1000px] flexgap flex-col">
                <p className="w-full bg-dimm textcol-main">Error acquired</p>
                <p className="w-full textcol-main">{profileRequest.error.message}</p>
            </div>
        )
    }

    let userCollectionSummaryRequest = await supabaseRootClient().from("AverageUserCollectionInfo").select("").eq("user_id", profileRequest.data.id).single();
    let userData: IProfile = profileRequest.data as unknown as IProfile;
    let userCollectionSummary = userCollectionSummaryRequest.data as unknown as CollectionSummaryInfo;
    let userReviewsRequest: UserReviewSampleDataError = await supabaseGetUserReviews(5, 0, userData.user_id);
    let userReviewsData = userReviewsRequest.data as unknown as UserReviewSample[];

    function PCLayout() {
        return (
            <div className="hidden k:flex">
                <div className="w-full max-w-[1000px] flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="flexgap">
                                <ProfileInfoLine text={userData.username} flexauto addClass="bg-dimm saturate-[120%] font-semibold text-[18px]" />
                                <ProfileInfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} addClass="bg-dimm saturate-[70%]" />
                                <ProfileEditButton />
                            </div>
                            <div className="flexgap">
                                <ProfileInfoLine flexauto text={`Country: ${userData.country ? userData.country.country : "unknown"}`} />
                                <ProfileInfoLine flexauto text={`Gender: ${userData.gender ? userData.gender.gender : "unknown"}`} />
                            </div>
                            <div className="flexgap flex-col h-full">
                                <div className="w-full flex-auto">

                                </div>

                                <div className="flexgap h-fit">
                                    <GameItemDataBlock title={"Games Played"} value={userCollectionSummary.total_games || 0} color="bg-dimm saturate-[125%]" />
                                    <GameItemDataBlock title={"Hours Played"} value={userCollectionSummary.total_hours || 0} color="bg-mid saturate-[65%]" />
                                    <GameItemDataBlock title={"Popular Platform"} value={userCollectionSummary.platform || "unknown"} color="bg-dimm saturate-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {userReviewsData.length > 0 &&
                        <div className="w-full flexgap flex-col textcol-main">
                            <ProfileInfoLine text={"Most Loved Games"} addClass="bg-mid" />
                            <div className="flexgap w-full overflow-x-auto">
                                <GamePreviewItem review={userReviewsData[0]} userId={params.id} />
                                <GamePreviewItem review={userReviewsData[1]} userId={params.id}/>
                                <GamePreviewItem review={userReviewsData[2]} userId={params.id}/>
                            </div>
                        </div>
                    }
                </div>

            </div>
        )
    }

    function TabletLayout() {
        return (
            <div className="flex k:hidden max800:hidden">
                <div className="w-full flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="flexgap">
                                <ProfileInfoLine text={userData.username} flexauto addClass="bg-dimm saturate-[120%] font-semibold text-[18px]" />
                                <ProfileInfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} addClass="bg-dimm saturate-[70%]" />
                                <ProfileEditButton />
                            </div>
                            <div className="flexgap">
                                <ProfileInfoLine flexauto text={`Country: ${userData.country ? userData.country.country : "unknown"}`} />
                                <ProfileInfoLine flexauto text={`Gender: ${userData.gender ? userData.gender.gender : "unknown"}`} />
                            </div>
                            <div className="flexgap flex-col h-full">
                                <div className="w-full flex-auto">

                                </div>

                                <div className="flexgap h-fit">
                                    <GameItemDataBlock title={"Games Played"} value={"20"} color="bg-dimm saturate-[125%]" />
                                    <GameItemDataBlock title={"Hours Played"} value={"1920"} color="bg-mid saturate-[65%]" />
                                </div>

                                <div className="max-h-[73px]">
                                    <GameItemDataBlock title={"Popular Platform"} value={"PC"} color="bg-dimm saturate-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {userReviewsData.length > 0 &&
                        <div className="w-full flexgap flex-col textcol-main">
                            <ProfileInfoLine text={"Most Loved Games"} addClass="bg-mid" />
                            <div className="flexgap w-full overflow-x-auto">
                                <GamePreviewItem review={userReviewsData[0]} userId={params.id}/>
                                <GamePreviewItem review={userReviewsData[1]} userId={params.id}/>
                                <GamePreviewItem review={userReviewsData[2]} userId={params.id}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    function MobileLayout() {
        return (
            <div className="flex min800:hidden">
                <div className="w-full flexgap flex-col textcol-main">
                    <div className="flexgap sm:flex-row flex-col w-full">
                        <div className="flex flexgap flex-auto">
                            <ProfileInfoLine flexauto text={userData.username} addClass="bg-mid font-semibold text-[17px]" />
                            <span className="flex sm:hidden w-[34px]">
                                <ProfileEditButton />
                            </span>
                        </div>
                        <ProfileInfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} align="justify-end" />
                        <span className="sm:flex hidden">
                            <ProfileEditButton />
                        </span>
                    </div>
                    <div className="flex w-full h-[150px] justify-center items-center profile-mobile-avatar-gradient">
                        <Image src={userData.avatar} alt={`${userData.username} avatar`} width={150} height={150} className="w-[150px] h-[150px] object-cover" />
                    </div>
                    <GameItemDataBlock title={"Games Played"} value={"20"} color="bg-dimm saturate-[125%]" />
                    <GameItemDataBlock title={"Hours Played"} value={"1920"} color="bg-mid saturate-[65%]" />
                    <GameItemDataBlock title={"Popular Platform"} value={"PC"} color="bg-dimm saturate-[90%]" />
                    {userReviewsData.length > 0 &&
                        <div className="w-full flexgap flex-col textcol-main">
                            <ProfileInfoLine text={"Most Loved Games"} addClass="bg-mid" />
                            <div className="flexgap w-full overflow-x-auto">
                                <GamePreviewItem review={userReviewsData[0]} userId={params.id}/>
                                <GamePreviewItem review={userReviewsData[1]} userId={params.id}/>
                                <GamePreviewItem review={userReviewsData[2]} userId={params.id}/>
                            </div>
                        </div>
                    }
                </div>
            </div >
        )
    }

    return (
        <>
            <TabletLayout />
            <PCLayout />
            <MobileLayout />
        </>
    )
}