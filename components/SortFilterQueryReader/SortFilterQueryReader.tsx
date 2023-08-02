"use client"

import { SortFilterDropdowns, clearOptions, toggleOption } from "@/store/features/sortFilter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";


export default function SortFilterQueryReader(){
    const dispatch = useAppDispatch();

    function getParams(params:URLSearchParams){
        const keys = Array.from(params.keys()) as (keyof SortFilterDropdowns)[];
        for (const key of keys) {
            if(key.toString() === "amount") continue;
            dispatch(clearOptions(key));
            params.getAll(key).forEach((filterItem:string) => {
                if(filterItem !== ""){
                    dispatch(toggleOption({
                        key,
                        value: filterItem
                    }))
                }
            });
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            getParams(params);
        }
      }, []);

    return null;
}