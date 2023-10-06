import ProfileEditButton from "@/components/EditButtons/ProfileEditButton/ProfileEditButton";
import GameItemDataBlock from "@/components/GameItemDataBlock/GameItemDataBlock";
import UserReviewItemsLoader from "@/components/Loader/UserReviewItemsLoader/UserPeviewItemsLoader";
import InfoLine from "@/components/ProfileInfoLine/ProfileInfoLine";
import GamePreviewSampleItem from "@/components/UserReviewSampleItem/UserReviewSampleItem";
import { CollectionSummaryInfo, IProfile, UserReviewSample, UserReviewSampleDataError } from "@/interface";
import { amountFetch } from "@/utils/config";
import { dateToText } from "@/utils/formatter";
import { supabaseGetUserReviews, supabaseGetUserTopReviews, supabaseGetUserWorstReviews } from "@/utils/supabaseFetching";
import supabaseRootClient from "@/utils/supabaseRootClient"
import supabaseServer from "@/utils/supabaseServer";
import Image from "next/image";

export const revalidate = 1800;

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


    let authRequest = await supabaseServer().auth.getUser();
    let authData = authRequest.data;
    let userCollectionSummaryRequest = await supabaseRootClient().from("AverageUserCollectionInfo").select("").eq("user_id", profileRequest.data.id).single();
    let userData: IProfile = profileRequest.data as unknown as IProfile;
    let userCollectionSummary = userCollectionSummaryRequest.data as unknown as CollectionSummaryInfo;
    let promises = await Promise.all([
        supabaseGetUserReviews(amountFetch, 0, userData.user_id),
        supabaseGetUserTopReviews(userData.user_id, 3),
        supabaseGetUserWorstReviews(userData.user_id, 3)
    ])
    let userReviewsData: UserReviewSample[] = [];
    let userReviewsTopData: UserReviewSample[] = [];
    let userReviewsWorstData: UserReviewSample[] = [];

    let promiseError = "";
    promises.forEach((response: UserReviewSampleDataError, index: number) => {
        if (promiseError.trim() !== "") return;
        if (response.error) {
            promiseError = response.error;
            return;
        }
        switch (index) {
            case 0: userReviewsData = response.data || []
            case 1: userReviewsTopData = response.data || []
            case 2: userReviewsWorstData = response.data || []
        }
    })
    if (userReviewsWorstData.length > 0 && userReviewsTopData.length > 0) {
        let resultWorstReviews: UserReviewSample[] = [];
        userReviewsWorstData.forEach((worstReview: UserReviewSample) => {
            if (userReviewsTopData.filter((topReview: UserReviewSample) => topReview.game.id === worstReview.game.id).length === 0) {
                resultWorstReviews.push(worstReview);
            }
        })
        userReviewsWorstData = resultWorstReviews;
    }

    function TopWorstReviews() {
        if (userReviewsData.length < 7) return;
        return (
            <>
                {userReviewsTopData.length > 0 &&
                    <div className="w-full flexgap flex-col textcol-main">
                        <InfoLine text={"Most Loved Games"} addClass="bg-mid inputheight font-semibold text-[22px]" align="justify-center" />
                        <div className="flexgap w-full overflow-x-auto">
                            <GamePreviewSampleItem review={userReviewsTopData[0]} userId={params.id} />
                            <GamePreviewSampleItem review={userReviewsTopData[1]} userId={params.id} />
                            <GamePreviewSampleItem review={userReviewsTopData[2]} userId={params.id} />
                        </div>
                    </div>
                }
                {userReviewsWorstData.length > 0 &&
                    <div className="w-full flexgap flex-col textcol-main">
                        <InfoLine text={"Least Loved Games"} addClass="bg-mid inputheight font-semibold text-[22px]" align="justify-center" />
                        <div className="flexgap w-full overflow-x-auto">
                            <GamePreviewSampleItem review={userReviewsWorstData[0]} userId={params.id} />
                            <GamePreviewSampleItem review={userReviewsWorstData[1]} userId={params.id} />
                            <GamePreviewSampleItem review={userReviewsWorstData[2]} userId={params.id} />
                        </div>
                    </div>
                }
            </>
        )
    }


    function PCLayout() {
        return (
            <div className="hidden k:flex w-full">
                <div className="w-full max-w-[1000px] flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="flexgap">
                                <InfoLine text={userData.username} flexauto addClass="bg-dimm saturate-[120%] font-semibold text-[18px]" />
                                <InfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} addClass="bg-dimm saturate-[70%]" />
                                {authData.user?.id === userData.id &&
                                    <ProfileEditButton />
                                }
                            </div>
                            <div className="flexgap">
                                <InfoLine flexauto text={`Country: ${userData.country ? userData.country.country : "unknown"}`} />
                                <InfoLine flexauto text={`Gender: ${userData.gender ? userData.gender.gender : "unknown"}`} />
                            </div>
                            <div className="flexgap flex-col h-full">
                                <div className="flexgap h-fit">
                                    <GameItemDataBlock title={"Games Played"} value={userCollectionSummary?.total_games || 0} color="bg-dimm saturate-[125%]" />
                                    <GameItemDataBlock title={"Hours Played"} value={userCollectionSummary?.total_hours || 0} color="bg-mid saturate-[65%]" />
                                    <GameItemDataBlock title={"Popular Platform"} value={userCollectionSummary?.platform || "unknown"} color="bg-dimm saturate-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopWorstReviews />
                </div>

            </div>
        )
    }

    function TabletLayout() {
        return (
            <div className="flex k:hidden max800:hidden w-full">
                <div className="w-full flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="flexgap">
                                <InfoLine text={userData.username} flexauto addClass="bg-dimm saturate-[120%] font-semibold text-[18px]" />
                                <InfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} addClass="bg-dimm saturate-[70%]" />
                                {authData.user?.id === userData.id &&
                                    <ProfileEditButton />
                                }
                            </div>
                            <div className="flexgap">
                                <InfoLine flexauto text={`Country: ${userData.country ? userData.country.country : "unknown"}`} />
                                <InfoLine flexauto text={`Gender: ${userData.gender ? userData.gender.gender : "unknown"}`} />
                            </div>
                            <div className="flexgap flex-col h-full">
                                <div className="flexgap h-fit">
                                    <GameItemDataBlock title={"Games Played"} value={userCollectionSummary?.total_games || 0} color="bg-dimm saturate-[125%]" />
                                    <GameItemDataBlock title={"Hours Played"} value={userCollectionSummary?.total_hours || 0} color="bg-mid saturate-[65%]" />
                                </div>

                                <div className="max-h-[73px]">
                                    <GameItemDataBlock title={"Popular Platform"} value={userCollectionSummary?.platform || "unknown"} color="bg-dimm saturate-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopWorstReviews />
                </div>
            </div>
        )
    }

    function MobileLayout() {
        return (
            <div className="flex min800:hidden w-full">
                <div className="w-full flexgap flex-col textcol-main">
                    <div className="flexgap sm:flex-row flex-col w-full">
                        <div className="flex flexgap flex-auto">
                            <InfoLine flexauto text={userData.username} addClass="bg-mid font-semibold text-[17px]" />
                            {authData.user?.id === userData.id &&
                                <span className="flex sm:hidden w-[34px]">
                                    <ProfileEditButton />
                                </span>
                            }
                        </div>
                        <InfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} align="justify-end" />
                        {authData.user?.id === userData.id &&
                            <span className="sm:flex hidden ">
                                <ProfileEditButton />
                            </span>
                        }
                    </div>
                    <div className="flex w-full h-[150px] justify-center items-center profile-mobile-avatar-gradient">
                        <Image src={userData.avatar} alt={`${userData.username} avatar`} width={150} height={150} className="w-[150px] h-[150px] object-cover" />
                    </div>
                    <GameItemDataBlock title={"Games Played"} value={userCollectionSummary?.total_games || 0} color="bg-dimm saturate-[125%]" />
                    <GameItemDataBlock title={"Hours Played"} value={userCollectionSummary?.total_hours || 0} color="bg-mid saturate-[65%]" />
                    <GameItemDataBlock title={"Popular Platform"} value={userCollectionSummary?.platform || "unknown"} color="bg-dimm saturate-[90%]" />
                    <TopWorstReviews />
                </div>
            </div >
        )
    }

    return (
        <div className="mx-auto flex flex-col flexgap w-full max-w-[1000px] items-center">
            <TabletLayout />
            <PCLayout />
            <MobileLayout />
            {userReviewsData.length ?
                <div className="flexgap flex-col w-full textcol-main">
                    <InfoLine flexauto text={"Recent Reviews"} addClass="bg-hi inputheight font-semibold text-[22px]" align="justify-center" />
                    <UserReviewItemsLoader publicId={userData.user_id} initialData={userReviewsData} />
                </div>
                : <></>
            }
        </div>
    )
}