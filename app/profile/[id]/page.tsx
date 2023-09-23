import ProfileEditButton from "@/components/EditButtons/ProfileEditButton/ProfileEditButton";
import GameItemDataBlock from "@/components/GameItemDataBlock/GameItemDataBlock";
import { IProfile } from "@/interface";
import { dateToText } from "@/utils/formatter";
import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image";


function ProfileInfoLine(props: {
    text: string | number,
    color?: string,
    flexauto?: boolean,
    align?: string
}) {
    return (
        <p className={`h-[34px] flex items-center px-[10px]
            ${props.color ? props.color : "bg-dimm"}
            ${props.flexauto && "flex-auto"}
            ${props.align && props.align}
        `}>
            {props.text}
        </p>
    )
}

export default async function Profile({ params }: {
    params: {
        id: number
    }
}) {

    const profileRequest = await supabaseRootClient().from("profile").select(`
    username,
    avatar,
    created_at,
    gender:Gender(gender),
    country:Country(country)
    `).eq("user_id", params.id);

    if (profileRequest.error) {
        return (
            <div className="mx-auto w-full max-w-[1000px] flexgap flex-col">
                <p className="w-full bg-dimm textcol-main">Error acquired</p>
                <p className="w-full textcol-main">{profileRequest.error.message}</p>
            </div>
        )
    }
    let userData: IProfile = profileRequest.data[0] as unknown as IProfile;

    function PCLayout() {
        return (
            <div className="hidden k:flex">
                <div className="w-full max-w-[1000px] flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="flexgap">
                                <ProfileInfoLine text={userData.username} flexauto color="bg-dimm saturate-[120%]" />
                                <ProfileInfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} color="bg-dimm saturate-[70%]" />
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
                                    <GameItemDataBlock title={"Popular Platform"} value={"PC"} color="bg-dimm saturate-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <ProfileInfoLine text={userData.username} flexauto color="bg-dimm saturate-[120%]" />
                                <ProfileInfoLine text={dateToText(new Date(userData.created_at).valueOf() / 1000)} color="bg-dimm saturate-[70%]" />
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
                            <ProfileInfoLine flexauto text={userData.username} color="bg-mid" />
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