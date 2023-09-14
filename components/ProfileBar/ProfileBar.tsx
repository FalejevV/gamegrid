"use client"

import { toggleAuthWindow, toggleProfileMenuDropdown } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import supabaseClient from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";



export default function ProfileBar() {

    const userSelector = useAppSelector((state: RootState) => state.userAuth);
    const profileDropdownSelector = useAppSelector(((state: RootState) => state.window.profileMenuDropdown));
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const containerRef = useRef(null);


    useEffect(() => {
        setLoaded(true);
        function handleOutsideClick(event: MouseEvent) {
            if (!containerRef) return;
            if (!containerRef.current) return;
            let current = containerRef.current as HTMLElement;
            let target = event.target as HTMLElement;
            if (!current.contains(target)) {    
                dispatch(toggleProfileMenuDropdown(false));
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    if (!loaded) {
        return (
            <div className="w-[150px] h-[40px] bg-loading animate-pulse"/>
        )
    }


    if (loaded && !userSelector.userId) {
        return (
            <div className="w-full h-full flex items-center gap-[20px] justify-end pr-[10px]">
                <button className="textcol-main" onClick={() => {
                    dispatch(toggleAuthWindow(true));
                }}>Login</button>
            </div>
        )
    }

    function logOut() {
        dispatch(toggleProfileMenuDropdown(false));
        supabaseClient.auth.signOut();
        router.replace("/");
        router.refresh();
    }

    function toggleDropdown() {
        dispatch(toggleProfileMenuDropdown(!profileDropdownSelector));
    }

    function DropDown() {
        return (
            <div className="absolute right-0 top-[45px] bg-dimm w-[205px] h-fit textcol-main flex flex-col p-[10px] gap-[15px]">
                <p className="sm:hidden block textcol-dimm">{userSelector.username}</p>
                <button className="cursor-pointer text-left" onClick={logOut}>Logout</button>
            </div>
        )
    }

    return (
        <div className="relative" ref={containerRef}>
            <div className="h-full flex items-center cursor-pointer group justify-end gap-[10px]" onClick={toggleDropdown}>
                <Image src={userSelector.avatar || "https://kvwtrzxxikuvdjmcwofc.supabase.co/storage/v1/object/public/gamegrid/avatar/avatar.svg"} width={45} height={35} alt={"User avatar"}
                    className="w-[45px] h-[35px] bg-mid min-w-[45px] max-w-[45px] min-h-[35px] max-h-[35px]"
                />

                <p className="hidden sm:block w-full max-w-[120px] textcol-main truncate">{userSelector.username}</p>

                <Image src={"/icons/Chevron-down.svg"} width={20} height={20} alt="user menu down arrow" className="w-[20px] h-[20px] p-[3px] brightness-50 group-hover:brightness-75 transition-all duration-200" />
            </div>
            {profileDropdownSelector && <DropDown />}
        </div>
    )
}