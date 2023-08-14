"use client";

import { clearGameCreationAll } from "@/store/features/gameCreation";
import { useAppDispatch } from "@/store/store";
import Link from "next/link";



export default function AddGameButton() {
    const dispatch = useAppDispatch();

    function resetGameCreationPage() {
        dispatch(clearGameCreationAll());
        
    }

    return (
        <div className="w-full flex flex-col gap-[40px] items-center justify-center pt-[50px]">
            <Link href="/add-game" className="bg-hi textcol-main py-[5px] px-[10px] text-[23px] font-medium"
                onClick={resetGameCreationPage}>
                Add Game
            </Link>
        </div>
    )
}