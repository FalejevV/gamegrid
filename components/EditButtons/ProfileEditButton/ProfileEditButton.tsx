"use client"
import { RootState, useAppSelector } from "@/store/store"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileEditButton(props:{
    publicId:number
}) {
    const userSelector = useAppSelector((state: RootState) => state.userAuth);
    const router = useRouter();
    
    function editClick(){
        router.push("/edit-profile")    
    }
    
    if (!userSelector.publicId || userSelector.publicId === "-1" || props.publicId !== Number(userSelector.publicId)) return;
    
    return (
        <div className="w-[34px] h-full bg-hi cursor-pointer flex items-center justify-center hover:brightness-125 group transition-all duration-300" onClick={editClick} >
            <Image src={"/icons/edit.svg"} alt={"edit review"} width={20} height={20} className="w-[20px] h-[20px] group-hover:scale-[120%] transition-all duration-300" />
        </div>
    )
}