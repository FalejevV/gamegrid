

export default function GameItemDataBlock(props: {
    title: string,
    value: string | number,
    color?: string,
}) {
    return (
        <div className={`flex flex-col flex-auto h-[63px] justify-between sm:h-[73px] sm:p-[5px] sm:pb-[3px] p-[8px]
            ${props.color ? props.color : "bg-dimm"}
        `}>
            <p className="textcol-main sm:text-[24px] text-[20px] w-full text-right font-semibold pr-[5px]">{props.value}</p>
            <p className="textcol-dimm w-full text-[16px]">{props.title}</p>
        </div>
    )
}

