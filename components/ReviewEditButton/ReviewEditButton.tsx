"use client"

import { setGameCreationGameData, setGameCreationPage } from "@/store/features/gameCreation";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReviewEditButton(props:{
    gameId:number,
    name:string,
    image:string,
    date:number,
    company:string
}){
    let userSelector = useAppSelector((state:RootState) => state.userAuth);
    if(!userSelector.publicId || userSelector.publicId === "-1") return null;
    const dispatch = useAppDispatch();
    const router = useRouter();

    function editClick(){
        dispatch(setGameCreationPage(1));
        dispatch(setGameCreationGameData({
            gameId: props.gameId,
            name: props.name,
            image: props.image,
            date: props.date / 1000,
            company: props.company
        }));
        router.push("/add-game");
    }
    return(
        <div className="w-[34px] h-full bg-hi cursor-pointer flex items-center justify-center hover:brightness-125 group transition-all duration-300" onClick={editClick}>
            <Image src={"/icons/edit.svg"} alt={"edit review"} width={20} height={20} className="w-[20px] h-[20px] group-hover:scale-[120%] transition-all duration-300"/>
        </div>
    )
}