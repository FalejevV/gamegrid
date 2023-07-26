
export default function SortFilterOption(props:{
    title:string,
    checked:boolean,
    checkColor?:string
    switchOption:Function
}){

    return(
        <div className="w-full flex items-center justify-between py-[5px]" onClick={() => props.switchOption(props.title)}>
            <p className="textcol-main">{props.title}</p>
            <div className={`w-[26px] h-[26px] relative
            ${props.checkColor ? `${props.checkColor}` : "bg-dimm"}`}>
                {props.checked && <div className="w-[14px] h-[14px] bg-mid absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"/>}
            </div>
        </div>
    )
}