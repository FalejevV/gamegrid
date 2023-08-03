import { RootState, useAppSelector } from "@/store/store"
import supabaseClient from "@/utils/supabaseClient";
import { useEffect, useState } from "react";




export default function ProfileBar(){

    const userSelector = useAppSelector((state:RootState) => state.supabase);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        setLoaded(true);
    },[]);


    if(!loaded || userSelector.userId === "-1") return;
    
    if(!userSelector.userId){
        return(
            <div className="w-full max-w-[200px] h-full flex items-center gap-[20px]">
                <button className="textcol-main">Login</button>
            </div>
        )
    }

    return(
        <div className="w-full max-w-[200px] h-full flex items-center gap-[20px]">
            <p className="textcol-main text-[20px]">{userSelector.username}</p>
            <button className="textcol-main" onClick={() => supabaseClient.auth.signOut()}>Logout</button>
        </div>
    )
}