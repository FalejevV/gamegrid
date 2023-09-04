"use client";

import AlertText from "@/components/AlertText/AlertText";
import FormAuthButton from "@/components/FormButton/FormButton";
import InputField from "@/components/InputField/InputField";
import SocialAuthButton from "@/components/SocialAuthButton/SocialAuthButton";
import { toggleAuthWindow } from "@/store/features/window";
import { useAppDispatch } from "@/store/store";
import supabaseClient from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function AuthPopUp() {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const [formType, setFormType] = useState<"Sign in" | "Sign up" | "Recover">("Sign in");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [alertText, setAlertText] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSignUp = async () => {
        setProcessing(true);
        const result = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `/auth/callback`,
            },
        })

        if (result.error) {
            setAlertText(result.error.message);
        } else {
            setAlertText("Success! Please check your email for confirmation letter");
        }
        setProcessing(false);
    }

    const handleSignIn = async () => {
        setProcessing(true);

        const result = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        })

        if (result.error) {
            setAlertText(result.error.message);
            setProcessing(false);
            return;
        }
        dispatch(toggleAuthWindow(false));
        setProcessing(false);
        router.refresh();
    }

    const handleRecoverPassword = async () => {
        setProcessing(true);

        const result = await supabaseClient.auth.resetPasswordForEmail(email);

        if (result.error) {
            setAlertText(result.error.message);
        } else {
            setAlertText("Success! Please check your email for confirmation letter");
        }
        setProcessing(false);
    }


    function formSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (formType === "Recover") {
            if (email) {
                setAlertText("");
                handleRecoverPassword();
            } else {
                return;
            }
            return;
        }

        if (!email.trim() || !password.trim()) {
            setAlertText("Please fill all inputs");
            return;
        }
        if (formType === "Sign up") {
            if (!repeatPassword.trim()) {
                setAlertText("Please fill all inputs");
                return;
            }
            if (repeatPassword !== password) {
                setAlertText("Passwords do not match");
                return;
            }
        }

        setAlertText("");
        if (formType === "Sign in") {
            handleSignIn();
        } else {
            handleSignUp();
        }

    }

    function clickLocationCheck(e: React.MouseEvent) {
        let target = e.target as HTMLElement;
        if (target.tagName === "SPAN") {
            dispatch(toggleAuthWindow(false));
        }
        e.stopPropagation();
    }

    function HiThereText() {
        return (
            <div className="flex items-center justify-center gap-[20px]">
                <p className="font-bold text-[40px] bg-gray py-[10px] px-[20px] textcol-bghi">Hi</p>
                <p className="font-bold text-[40px] bg-gray py-[10px] px-[20px] textcol-bghi">There!</p>
            </div>
        )
    }

    function SocialsSignIn() {
        return (
            <div className="flex items-center justify-center h-fit gap-[20px]">
                <SocialAuthButton provider="twitch" title={"Twitch"} icon={"twitch-icon"} />
                <SocialAuthButton provider="google" title={"Google"} icon={"google-icon"} />
            </div>
        )
    }

    function ORLine() {
        return (
            <div className="flex items-center justify-center gap-[10px]">
                <div className="flex-auto h-[1px] bg-textcolmain opacity-20" />
                <p className="textcol-dimm text-[13px]">OR</p>
                <div className="flex-auto h-[1px] bg-textcolmain opacity-20" />
            </div>
        )
    }

    function ForgotPasswordButton() {
        return (
            <button type="button" onClick={() => setFormType("Recover")}
                className="textcol-main bg-transparent text-[14px] font-semibold underline underline-offset-2 w-full text-right">
                Forgot password?
            </button>
        )
    }

    function InputSignInForm() {
        return (
            <form className="flex flex-col gap-[15px]" onSubmit={formSubmit}>
                <InputField bgColor="bg-mid" value={email} setValue={setEmail} type="email" label={"E-Mail"} name={"email"} placeholder="Email goes here" />
                <InputField bgColor="bg-mid" value={password} setValue={setPassword} type="password" label={"Password"} name={"password"} placeholder="Password here" />
                {ForgotPasswordButton()}
                <FormAuthButton name={"Sign in"} processing={processing} />
            </form>
        )
    }

    function InputSignUpForm() {
        return (
            <form className="flex flex-col gap-[15px]" onSubmit={formSubmit}>
                <InputField bgColor="bg-mid" value={email} type="email" setValue={setEmail} label={"E-Mail"} name={"email"} placeholder="Email goes here" />
                <InputField bgColor="bg-mid" value={password} setValue={setPassword} type="password" label={"Password"} name={"password"} placeholder="Password here" />
                <InputField bgColor="bg-mid" value={repeatPassword} setValue={setRepeatPassword} type="password" label={"Repeat password"} name={"repassword"} placeholder="Repeat password here" />
                {ForgotPasswordButton()}
                <FormAuthButton name={"Sign up"} processing={processing} />
            </form>
        )
    }

    function RecoverPasswordForm() {
        return (
            <form className="flex flex-col gap-[15px]" onSubmit={formSubmit}>
                <InputField bgColor="bg-mid" value={email} type="email" setValue={setEmail} label={"Registered E-Mail Address"} name={"email"} placeholder="Email goes here" />
                <FormAuthButton name={"Recover password"} processing={processing} />
                <div className="w-full flex items-center justify-center gap-[20px] textcol-dimm">
                    <button onClick={() => setFormType("Sign in")}>Sign In</button>
                    <p>/</p>
                    <button onClick={() => setFormType("Sign up")}>Sign Up</button>
                </div>
            </form>
        )
    }

    function SignUpSwitch() {
        return (
            <div className="w-full items-center justify-center textcol-main flex gap-[10px]">
                <p className="text-[15px]">Don&#x0027;t have an account?</p>
                <button className="text-[15px] font-semibold" onClick={(() => setFormType("Sign up"))}>Sign Up!</button>
            </div>
        )
    }

    function SignInSwitch() {
        return (
            <div className="w-full items-center justify-center textcol-main flex gap-[10px]">
                <p className="text-[15px]">Already registered?</p>
                <button className="text-[15px] font-semibold" onClick={(() => setFormType("Sign in"))}>Sign in!</button>
            </div>
        )
    }




    return (
        <span onClick={(e) => clickLocationCheck(e)} className="fixed w-screen h-screen left-0 top-0 bg-[#000000c0] flex items-center justify-center cursor-pointer md:pl-[90px] sm:pb-[10vh] overflow-scroll
            opacity-0 animate-fade-in
        ">
            <div className="w-full h-fit max-w-[400px] bg-dimm cursor-default flex flex-col p-[20px] gap-[15px]">
                {HiThereText()}

                <p className="textcol-dimm w-full text-center">Please enter your credentials to sign in.</p>

                {SocialsSignIn()}

                {ORLine()}

                {formType === "Sign in" && InputSignInForm()}
                {formType === "Sign in" && SignUpSwitch()}


                {formType === "Sign up" && InputSignUpForm()}
                {formType === "Sign up" && SignInSwitch()}

                {formType === "Recover" && RecoverPasswordForm()}

                {alertText && <AlertText alertText={alertText} />}
            </div>
        </span>
    )
}