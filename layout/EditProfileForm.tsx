"use client"
import AlertText from "@/components/AlertText/AlertText";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import DropdownInput from "@/components/DropdownInput/DropdownInput";
import FileInput from "@/components/FileInput/FileInput";
import InputField from "@/components/InputField/InputField"
import { StringDataError } from "@/interface";
import { APISupabaseAvailabilityProfileCheck, APISupabaseAvatarInsert } from "@/utils/apiFetching";
import supabaseClient from "@/utils/supabaseClient";
import { getTableList } from "@/utils/tableFetching";
import { FormEvent, useEffect, useState } from "react"


export default function EditProfileForm(props: {
    username: string,
    publicId: number,
    gender:string,
    country:string
}) {
    const [username, setUsername] = useState(props.username);
    const [debounse, setDebounse] = useState(false);
    const [genderList, setGenderList] = useState([""]);
    const [countryList, setCountryList] = useState([""]);
    const [country, setCountry] = useState(props.country);
    const [gender, setGender] = useState(props.gender);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [messageText, setMessageText] = useState("");

    async function checkFormValues() {
        if (username.trim().length <= 5) {
            setMessageText("Username must be at least 6 characters");
            return false;
        }

        let usernameCheck = await APISupabaseAvailabilityProfileCheck("username", username, props.publicId);
        if (usernameCheck.error || usernameCheck.data !== "OK") {
            setMessageText(usernameCheck.error ? usernameCheck.error : "Username is taken");
            return false;
        }


        return true;
    }

    async function formSubmit(e: FormEvent) {
        e.preventDefault();

        if (debounse) return;
        setDebounse(true);
        setMessageText("");
        if (!await checkFormValues()) {
            setDebounse(false);
            return;
        }
        let authCheck = await supabaseClient.auth.getUser();
        let userID = authCheck.data.user?.id;
        if (!userID) {
            setMessageText("Auth error. Try to relogin")
            return;
        }

        let countryIdRequest = await supabaseClient.from("Country").select("id").eq("country", country).single();
        let genderRequest = await supabaseClient.from("Gender").select("id").eq("gender", gender).single();
        let countryId = countryIdRequest.data?.id || null;
        let genderId = genderRequest.data?.id || null; 

        let { data, error } = await supabaseClient.from("profile").update({
            username: username,
            gender_id: genderId,
            country_id: countryId
        }).eq("id", userID);

        if(avatarFile){
            let updateAvatarResponse:StringDataError = await APISupabaseAvatarInsert(avatarFile);
            if (updateAvatarResponse.error){
                setMessageText(updateAvatarResponse.error);
                return;
            }
        }

        if (!error) {
            window.location.reload();
        } else {
            setMessageText(error.message);
        }

        setDebounse(false);
    }

    useEffect(() => {
        getTableList(supabaseClient, "Gender").then(res => {
            if (res.data) {
                setGenderList(res.data);
            }else{
                setGenderList(["Could not load data"])
            }
        });
        getTableList(supabaseClient, "Country").then(res => {
            if(res.data){
                setCountryList(["Unset", ...res.data]);
            }else{
                setCountryList(["Could not load data"])
            }
        });
    }, []);

    useEffect(() => {
        if(avatarFile !== null){
            APISupabaseAvatarInsert(avatarFile).then(res => console.log("Response", res));
        }
    },[avatarFile])

    return (
        <form className="flexgap flex-col" onSubmit={formSubmit}>
            <InputField label={"Username"} name={"username"} placeholder={"Username"} value={username} setValue={setUsername} />
            <DropdownInput options={genderList} value={gender} onChange={setGender} title={"Gender"} name={"gender"} />
            <DropdownInput options={countryList} value={country} onChange={setCountry} title={"Country"} name={"country"} />
            <FileInput imagePreview title="Avatar" name="avatar" value={avatarFile} onChange={setAvatarFile} iconPath={"/icons/image-icon.svg"} height="h-[100px]"/>
            {messageText && <AlertText alertText={messageText} />}
            <WideActionButton disabled={debounse} disableText="Loading..." submit onClick={() => { }} text={"Update"} />
        </form>
    )
}