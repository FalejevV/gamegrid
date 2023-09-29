"use client"
import AlertText from "@/components/AlertText/AlertText";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import DropdownInput from "@/components/DropdownInput/DropdownInput";
import InputField from "@/components/InputField/InputField"
import APISupabaseAvailabilityProfileCheck from "@/utils/apiFetching";
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
        console.log(country);
        console.log(gender);

        let countryIdRequest = await supabaseClient.from("Country").select("id").eq("country", country).single();
        let genderRequest = await supabaseClient.from("Gender").select("id").eq("gender", gender).single();
        let countryId = countryIdRequest.data?.id || null;
        let genderId = genderRequest.data?.id || null; 

        let { data, error } = await supabaseClient.from("profile").update({
            username: username,
            gender_id: genderId,
            country_id: countryId
        }).eq("id", userID);


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

    return (
        <form className="flexgap flex-col" onSubmit={formSubmit}>
            <InputField label={"Username"} name={"username"} placeholder={"Username"} value={username} setValue={setUsername} />
            <DropdownInput options={genderList} value={gender} onChange={setGender} title={"Gender"} name={"gender"} />
            <DropdownInput options={countryList} value={country} onChange={setCountry} title={"Country"} name={"country"} />
            {messageText && <AlertText alertText={messageText} />}
            <WideActionButton disabled={debounse} disableText="Loading..." submit onClick={() => { }} text={"Update"} />
        </form>
    )
}