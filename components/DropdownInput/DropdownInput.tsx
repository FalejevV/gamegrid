import { useEffect, useRef, useState } from "react";


function DropdownOption(props: {
    onClick: Function,
    title: string,
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
    name: string,
    additionalOptions?: string[]
}) {
    const [toggleDropdown, setToggleDropdown] = useState(false);


    if (props.options.length === 0) return;


    const containerRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!containerRef) return;
            if (!containerRef.current) return;
            let current = containerRef.current as HTMLElement;
            let target = event.target as HTMLElement;
            if (!current.contains(target)) {
                setToggleDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    function dropdownList() {
        return (
            <div className="absolute right-0 top-[45px] w-[230px] h-fit max-h-[300px] overflow-y-scroll bg-dimm z-[20]">
                {props.options.map((option: string) => <DropdownOption key={option} onClick={() => props.onChange(option)} title={option} />)}
                {props.additionalOptions && <div className="w-full">
                    <p className="textcol-main py-[20px] w-full bg-mid text-center"> - - - - Other options  - - - -</p>
                    {props.additionalOptions.map((option: string, index: number) => <DropdownOption key={option + index} onClick={() => props.onChange(option)} title={option} />)}
                </div>}
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full flexgap items-center justify-between h-[45px] relative select-none" onClick={() => setToggleDropdown(prev => !prev)}>
            <p className="textcol-main">{props.title}</p>
            <div className="w-full h-full max-w-[160px] bg-dimm textcol-main flex items-center justify-center cursor-pointer">
                {props.value === "" ? "Platform" : props.value}
            </div>
            {toggleDropdown && dropdownList()}
        </div>
    )
}