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
        <Link href="/add-game" className="bg-hi textcol-main py-[5px] text-[16px] sm:text-[20px] inputheight font-medium w-full sm:max-w-[300px] max-w-[200px] flex items-center justify-center hover:brightness-110"
            onClick={resetGameCreationPage}>
            Add Game
        </Link>
    )
}