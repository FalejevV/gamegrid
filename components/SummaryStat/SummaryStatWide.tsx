


export default function SummaryStatWide(props:{
    className?:string,
    title:string | number,
    about:string,
    titleSize?:string
}) {
    return (
        <div className={"col-span-3 bg-dimm relative py-[15px] flex flex-col justify-between px-[10px]" + " " + props.className}>
            <p className={"textcol-main w-full text-center overflow-x-auto overflow-y-hidden whitespace-nowrap pb-[10px] px-[10px] text-[30px]" + " " + (props.titleSize ? props.titleSize : "sm:text-[34px]")}>{props.title}</p>
            <p className="textcol-dimm sm:text-[16px] text-[15px] text-center font-medium">{props.about}</p>
        </div>
    )
}