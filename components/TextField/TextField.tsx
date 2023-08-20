import { ChangeEvent } from "react";



export default function TextField(props:{
    title:string,
    name:string,
    onChange:Function,
    value:string,
}){

    function changeHandler(e:ChangeEvent){
        let target = e.target as HTMLTextAreaElement;
        props.onChange(target.value);
    }

    return (
        <div className="flex gap-[15px] flex-col w-full textcol-main">
            <label htmlFor={props.name}>{props.title}</label>
            <textarea id={props.name} name={props.name} onChange={changeHandler} value={props.value} rows={8} placeholder="How was your gaming experience? Anything memorable?"
            className="bg-dimm textcol-main focus:outline-none p-[10px]"
            />
        </div>
    )    
}