"use client"

import { toggleAuthWindow } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import supabaseClient from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";




export default function ProfileBar(){

    const userSelector = useAppSelector((state:RootState) => state.userAuth);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        setLoaded(true);
    },[]);

    if(!loaded) return;
    
    if(userSelector.userId === "-1") return;
    
    if(loaded && !userSelector.userId){
        return(
            <div className="w-full h-full flex items-center gap-[20px] justify-end pr-[10px]">
                <button className="textcol-main" onClick={() => {
                    dispatch(toggleAuthWindow(true));
                }}>Login</button>
            </div>
        )
    }

    return(
        <div className="w-full h-full flex items-center gap-[20px] justify-end pr-[10px]">
            <p className="textcol-main text-[20px]">{userSelector.username}</p>
            <button className="textcol-main" onClick={() => {
                supabaseClient.auth.signOut();
                router.replace("/");
                router.refresh();
            }}>Logout</button>
        </div>
    )
}