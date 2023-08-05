"use client";

import InputField from "@/components/InputField/InputField";
import SocialAuthButton from "@/components/SocialAuthButton/SocialAuthButton";
import { toggleAuthWindow } from "@/store/features/window";
import { useAppDispatch } from "@/store/store";


export default function AuthPopUp(){

    const dispatch = useAppDispatch();

    function clickLocationCheck(e: React.MouseEvent){
        let target = e.target as HTMLElement;
        if(target.tagName === "SPAN"){
            dispatch(toggleAuthWindow(false));
        }
        e.stopPropagation();
    }

    function HiThereText(){
        return( 
            <div className="flex items-center justify-center gap-[20px]">
                <p className="font-bold text-[40px] bg-gray p-[10px] textcol-bgmid">Hi</p>
                <p className="font-bold text-[40px] bg-gray p-[10px] textcol-bgmid">There!</p>
            </div>
        )
    }

    function SocialsSignIn(){
        return(
            <div className="flex items-center justify-center h-fit gap-[20px]">
                <SocialAuthButton title={"Facebook"} icon={"facebook-icon"} />
                <SocialAuthButton title={"Google"} icon={"google-icon"} />
            </div>
        )
    }

    function ORLine(){
        return(
            <div className="flex items-center justify-center gap-[10px]">
                <div className="flex-auto h-[1px] bg-textcolmain opacity-20"/>
                <p className="textcol-dimm text-[13px]">OR</p>
                <div className="flex-auto h-[1px] bg-textcolmain opacity-20"/>
            </div>
        )
    }

    function ForgotPasswordButton(){
        return(
            <button className="textcol-main bg-transparent text-[14px] font-semibold underline underline-offset-2 w-full text-right">
                Forgot password?
            </button>
        )
    }

    function InputForm(){
        return(
            <form className="flex flex-col gap-[15px]">
                <InputField label={"E-Mail"} name={"email"} placeholder="Email goes here!"/>
                <InputField type="password" label={"Password"} name={"password"} placeholder="Password here!"/>
            </form>
        )
    }

    function SignUpSentence(){
        return(
            <div className="w-full items-center justify-center textcol-main flex gap-[10px]">
                <p className="text-[15px]">Don&#x0027;t have an account?</p>
                <button className="text-[15px] font-semibold">Sign Up!</button>
            </div>
        )
    }



    return(
        <span onClick={(e) => clickLocationCheck(e)} className="fixed w-screen h-screen left-0 top-0 bg-[#000000c0] flex items-center justify-center cursor-pointer pl-[90px] pb-[10vh]">
            <div className="w-full h-fit max-w-[400px] bg-dimm cursor-default flex flex-col p-[20px] gap-[15px]">
                {HiThereText()}

                <p className="textcol-dimm w-full text-center">Please enter your credentials to sign in.</p>

                {SocialsSignIn()}

                {ORLine()}

                {InputForm()}

                {ForgotPasswordButton()}

                <button className="w-full h-[45px] bg-hi text-[20px] textcol-main font-bold">Sign in</button>

                {SignUpSentence()}
            </div>
        </span>
    )
}