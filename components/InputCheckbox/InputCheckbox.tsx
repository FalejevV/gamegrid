"use client";

import { GameCreationQuestions } from "@/store/features/gameCreation"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import React from "react";




export default function InputCheckbox(props:{
    question:string,
    name:keyof GameCreationQuestions,
    onChange:Function,
    value:boolean,
}){


    function changeHandler(e:React.ChangeEvent){
        let target = e.target as HTMLInputElement;
        props.onChange(target.checked);
    }

    return (
        <div className="w-full h-fit select-none relative">
           <label htmlFor={props.name} className="textcol-main w-full flexgap items-center justify-between">
                <p className="flex-auto">{props.question}</p>
                <p className={`w-[80px] h-[45px] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-300
                    ${props.value ? "bg-hi textcol-main" : "bg-dimm textcol-dimm"}
                `}>{props.value ? "Yes" : "No"}</p>
            </label> 
           <input onChange={changeHandler} type="checkbox" id={props.name} className="absolute appearance-none pointer-events-none w-0 h-0"  />
        </div>
    )
}