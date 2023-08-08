import AuthListener from "@/components/AuthListener/AuthListener";
import ProfileBar from "@/components/ProfileBar/ProfileBar";
import { RootState, useAppSelector } from "@/store/store";
import Image from "next/image";
import AuthPopUp from "./AuthPopUp";
import Link from "next/link";
import MenuBurger from "@/components/MenuBurger/MenuBurger";
import SidebarMenu from "./SidebarMenu";



export default function Header(){

    const windowSelector = useAppSelector((state:RootState) => state.window);

    return(
        <header className="w-full max-w-screen h-[70px] bg-[#0D0306] fixed top-0 left-0 z-[999] flex items-center p-[10px] pl-[20px]">
            
            <AuthListener />
            {windowSelector.displayAuthWindow && <AuthPopUp />}

            {windowSelector.width < 880 && <>
                <MenuBurger />
                <SidebarMenu />
            </>}

            <Link href={"/"} className="min-w-[120px]">
                <Image src={"Logo.svg"} alt={"logo-image"}  width={155} height={29}/>
            </Link>
            
            <span className="flex-auto"/>
            
            <ProfileBar />
        </header>
    )
}