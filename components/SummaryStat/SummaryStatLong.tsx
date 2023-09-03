

export default function SummaryStatLong(props:{
    className?: string,
    firstLine:string | number,
    secondLine:string | number,
    thirdLine:string | number
    about:string,
    firstLineSize?:string,
    secondLineSize?:string,
    thirdLineSize?:string,
}){
    return(
        <div className={"col-span-3 row-span-2 bg-dimm relative py-[15px] flex flex-col justify-between"+ " " +props.className}>
            <p className={"textcol-main text-center overflow-x-auto overflow-y-hidden whitespace-nowrap" + " " + (props.firstLineSize ? props.firstLineSize : "text-[24px]")}>{props.firstLine}</p>
            <p className={"textcol-main text-center overflow-x-auto overflow-y-hidden whitespace-nowrap" + " " + (props.secondLineSize? props.secondLineSize: "text-[24px]")}>{props.secondLine}</p>
            <p className={"textcol-main text-center overflow-x-auto overflow-y-hidden whitespace-nowrap" + " " + (props.thirdLineSize? props.thirdLineSize: "text-[24px]")}>{props.thirdLine}</p>
            <p className="textcol-dimm sm:text-[16px] text-[15px] text-center font-medium">{props.about}</p>
        </div>
    )
}