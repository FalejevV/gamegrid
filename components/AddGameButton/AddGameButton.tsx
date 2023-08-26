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
        <Link href="/add-game" className="bg-hi textcol-main py-[5px] text-[23px] font-medium w-full max-w-[250px] flex items-center justify-center"
            onClick={resetGameCreationPage}>
            Add Game
        </Link>
    )
}