import supabaseRootClient from "@/utils/supabaseRootClient"
import Image from "next/image";



export default async function Profile({ params }: {
    params: {
        id: number
    }
}) {

    const profileRequest = await supabaseRootClient().from("profile").select("username,avatar,created_at").eq("user_id", params.id);
    if (profileRequest.error) {
        return (
            <div className="mx-auto w-full max-w-[1000px] flexgap flex-col">
                <p className="w-full bg-dimm textcol-main">Error acquired</p>
                <p className="w-full textcol-main">{profileRequest.error.message}</p>
            </div>
        )
    }
    let userData = profileRequest.data[0];

    return (
        <div className="w-full max-w-[1000px] flexgap flex-col mx-auto">
            <div className="w-full flexgap">
                <div className="flexgap flex-col flex-auto textcol-main">
                    <p className="w-full flex-auto bg-dimm">USERNAME: {userData.username}</p>
                    <p className="w-full flex-auto bg-dimm">JOIN DATE: {userData.created_at}</p>
                    <p className="w-full flex-auto bg-dimm"></p>
                    <p className="w-full flex-auto bg-dimm"></p>
                </div>
                <Image src={userData.avatar} alt={`${userData.username} profile image`} width={270} height={270} className="bg-mid min-w-[270px] w-[270px] h-[270px] object-cover" />
            </div>
        </div>
    )
}