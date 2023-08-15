import { useAppDispatch } from "@/store/store";
import { ChangeEvent } from "react";



export default function InlineInputField(props:{
    title:string,
    name:string,
    onChange:Function,
    value:string,
    placeholder:string
}){
    function changeHandler(e:ChangeEvent){
        const target = e.target as HTMLInputElement; 
        props.onChange(target.value);
    }

    return(
        <div className="flexgap items-center justify-between w-full h-[45px]">
            <label htmlFor={props.name} className="textcol-main">{props.title}</label>
            <input type="text" value={props.value} id={props.name} name={props.name} onChange={changeHandler} placeholder={props.placeholder}
                className="w-[80px] h-full bg-dimm textcol-main text-center focus:outline-none"
            />
        </div>
    )
}