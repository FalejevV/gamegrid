import AuthListener from "@/components/AuthListener/AuthListener";
import ProfileBar from "@/components/ProfileBar/ProfileBar";
import Image from "next/image";



export default function Header(){
    return(
        <header className="w-full max-w-screen h-[70px] bg-[#0D0306] fixed top-0 left-0 z-[999] flex items-center p-[10px] pl-[20px]">
            <AuthListener />
            <Image src={"Logo.svg"} alt={"logo-image"}  width={155} height={29}/>
            
            <span className="flex-auto"/>
            
            <ProfileBar />
        </header>
    )
}