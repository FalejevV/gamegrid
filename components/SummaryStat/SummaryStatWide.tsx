


export default function SummaryStatWide(props:{
    className?:string,
    title:string | number,
    about:string,
    titleSize?:string
}) {
    return (
        <div className={"col-span-3 bg-dimm relative py-[20px] flex flex-col justify-between px-[10px]" + " " + props.className}>
            <p className={"textcol-main w-full text-center overflow-x-scroll whitespace-nowrap pb-[10px]" + " " + (props.titleSize ? props.titleSize : "text-[34px]")}>{props.title}</p>
            <p className="textcol-dimm text-[16px] text-center font-medium">{props.about}</p>
        </div>
    )
}