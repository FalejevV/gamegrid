"use client"

import supabaseClient from "@/utils/supabaseClient";
import { Provider } from "@supabase/supabase-js";
import Image from "next/image";



export default function SocialAuthButton(props:{
    title:string,
    icon:string,
    provider:Provider
}){

    function socialAuth(){
        supabaseClient.auth.signInWithOAuth({
            provider: props.provider,
        })
    }
    
    return(
        <button className="flex flex-1 bg-mid h-[45px] items-center overflow-hidden cursor-pointer hover:brightness-105" onClick={socialAuth}>
            <p className="textcol-main font-font-medium text-[15px] flex-auto text-center">{props.title}</p>
            <div className="bg-[#0000002f] w-[45px] h-[45px] flex items-center justify-center">
                <Image src={`/icons/${props.icon}.svg`} alt={`social ${props.title} icon`} height={22} width={22} 
                className="h-[22px]"
                />
            </div>
        </button>
    )
}