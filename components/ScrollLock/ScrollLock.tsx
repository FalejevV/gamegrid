"use client"

import { RootState, useAppSelector } from "@/store/store";
import { useEffect } from "react";


export default function ScrollLock() {

    const windowSelector = useAppSelector((state: RootState) => state.window);

    useEffect(() => {
        if (windowSelector.mobileFilterDropdown || windowSelector.displayAuthWindow || windowSelector.displayDropdownMenu) {
            document.body.classList.add("lockScroll");
        } else {
            document.body.classList.remove("lockScroll");
        }

    }, [windowSelector.mobileFilterDropdown, windowSelector.displayDropdownMenu, windowSelector.displayAuthWindow]);

    return <></>;
}