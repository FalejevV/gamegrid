"use client"
import AlertText from "@/components/AlertText/AlertText";
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import InputField from "@/components/InputField/InputField"
import APISupabaseAvailabilityProfileCheck from "@/utils/apiFetching";
import supabaseClient from "@/utils/supabaseClient";
import { FormEvent, useState } from "react"


export default function EditProfileForm(props: {
    username: string,
    publicId: number,
}) {
    const [username, setUsername] = useState(props.username);
    const [debounse, setDebounse] = useState(false);
    const [messageText, setMessageText] = useState("");

    async function checkFormValues() {
        if(username.trim().length <= 5) {
            setMessageText("Username must be at least 6 characters");
            return false;
        }

        let usernameCheck = await APISupabaseAvailabilityProfileCheck("username", username, props.publicId);
        if(usernameCheck.error || usernameCheck.data !== "OK"){
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
        if(!await checkFormValues()){
            setDebounse(false);
           return; 
        }
        let authCheck = await supabaseClient.auth.getUser();
        let userID = authCheck.data.user?.id;
        if(!userID){
            setMessageText("Auth error. Try to relogin")
            return;
        }
        let {data, error} = await supabaseClient.from("profile").update({
            username:username
        }).eq("id", userID);

        if(!error){
            setMessageText("Profile updated!")
        }else{
            setMessageText(error.message);
        }
        
        setTimeout(() => setDebounse(false), 1000);
    }

    return (
        <form className="flexgap flex-col" onSubmit={formSubmit}>
            <InputField label={"Username"} name={"username"} placeholder={"Username"} value={username} setValue={setUsername} />
            {messageText && <AlertText alertText={messageText} />}
            <WideActionButton disabled={debounse} disableText="Loading..." submit onClick={() => { }} text={"Update"} />
        </form>
    )
}