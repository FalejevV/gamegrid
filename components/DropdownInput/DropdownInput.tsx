import { useState } from "react";


function DropdownOption(props:{
    onClick:Function,
    title:string,
}) {
    return (
        <p className="w-full h-[45px] cursor-pointer flex items-center justify-center bg-dimm hover:brightness-110 textcol-main" onClick={() => props.onClick()}>
            {props.title}
        </p>
    )
}

export default function DropdownInput(props: {
    options: string[],
    value: string,
    onChange: Function,
    title: string,
    name: string
}) {
    const [toggleDropdown, setToggleDropdown] = useState(false);



    function dropdownList() {
        return (
            <div className="absolute right-0 top-[45px] w-[160px] h-fit max-h-[200px] overflow-y-scroll bg-dimm">
                {props.options.map((option: string) => <DropdownOption onClick={() => props.onChange(option)} title={option} />)}
            </div>
        )
    }

    return (
        <div className="w-full flexgap items-center justify-between h-[45px] relative" onClick={() => setToggleDropdown(prev => !prev)}>
            <p className="textcol-main">{props.title}</p>
            <div className="w-full h-full max-w-[160px] bg-dimm textcol-main flex items-center justify-center cursor-pointer">
                {props.value === "" ? "Platform" : props.value}
            </div>
            {toggleDropdown && dropdownList()}
        </div>
    )
}