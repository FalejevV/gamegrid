"use client"

import AlertText from "@/components/AlertText/AlertText";
import FormButton from "@/components/FormButton/FormButton";
import InputField from "@/components/InputField/InputField";
import { RootState, useAppSelector } from "@/store/store"
import supabaseClient from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";


export default function ChangePassword(){
    

    const useAuthSelector = useAppSelector((state:RootState) => state.userAuth);
    const [loaded, setLoaded] = useState(false);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [processing, setProcessing] = useState(false);
    const [alertText, setAlertText] = useState("");
    const router = useRouter();

    async function changePassword(){
        setProcessing(true);
        const result = await supabaseClient.auth.updateUser({ password: password });

        if(result.error){
            setAlertText(result.error.message);
            setProcessing(false);
            return;
        }else{
            setAlertText("Password has been changed! Redirecting to main page...");
            setTimeout(() => {
                router.push("/");
            },5000)
        }

    }

    function formSubmit(e:React.FormEvent){
        e.preventDefault();

        if(!password.trim() || !rePassword.trim()){
            setAlertText("Please fill password inputs");
            return;
        }
        if(password !== rePassword){
            setAlertText("Passwords do not match");
            return;
        }

        changePassword();
    }

    useEffect(() => {
        setLoaded(true);
    })

    if(!loaded || useAuthSelector.userId === "-1") return;

    if(!useAuthSelector.userId && loaded){
        return(
            <p className="w-full text-center text-[25px] textcol-main">You need to be signed in to change password</p>
        )
    }
    return(
        <div className="w-full flex justify-center pt-[30px]">
            <form className="flex flex-col gap-[15px] w-full max-w-[400px] h-fit bg-dimm p-[15px] textcol-main" onSubmit={formSubmit}>
                <h1 className="w-full text-center text-[20px] pb-[20px]">Password Change Form</h1>
                <InputField bgColor="bg-mid" type="password" label={"New Password"} name={"password"} placeholder={"Enter new password"} value={password} setValue={setPassword}  />
                <InputField bgColor="bg-mid" type="password" label={"Repeat New Password"} name={"repassword"} placeholder={"Repeat password"} value={rePassword} setValue={setRePassword}  />
                <div className="h-[20px]"/>
                <FormButton name={"Change password"} processing={processing} />
                {alertText && <AlertText alertText={alertText} />}
            </form>
        </div>
    )
}