import PageErrorMessage from "@/components/PageErrorMessage/PageErrorMessate";
import { IProfile } from "@/interface";
import EditProfileForm from "@/layout/EditProfileForm";
import supabaseRootClient from "@/utils/supabaseRootClient";
import supabaseServer from "@/utils/supabaseServer";

export default async function EditProfile() {

    const userCheck = await supabaseServer().auth.getUser();

    if (userCheck.error) {
        return (
            <PageErrorMessage text={"User check error: " + userCheck.error.message} />
        )
    }

    if (!userCheck.data) {
        return (
            <PageErrorMessage text={"User not found"} />
        )
    }

    const profileRequest = await supabaseRootClient().from("profile").select(`
    user_id,
    username,
    avatar,
    created_at,
    gender:Gender(gender),
    country:Country(country)
    `).eq("id", userCheck.data.user.id).single();


    const userData: IProfile = profileRequest.data as unknown as IProfile;
    const userError = profileRequest.error;
    if (userError) {
        return (
            <PageErrorMessage text={"Profile fetch error: " + userError.message} />
        )
    }
    return (
        <div className="flexgap flex-col w-full max-w-[500px] mx-auto">
            <EditProfileForm username={userData.username} publicId={Number(userData.user_id || -1)} />
        </div>
    )
}