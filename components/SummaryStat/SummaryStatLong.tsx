

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
        <div className={"col-span-3 row-span-2 bg-dimm relative py-[20px] flex flex-col justify-between"+ " " +props.className}>
            <p className={"textcol-main text-center" + " " + (props.firstLineSize ? props.firstLineSize : "text-[24px]")}>{props.firstLine}</p>
            <p className={"textcol-main text-center" + " " + (props.secondLineSize? props.secondLineSize: "text-[24px]")}>{props.secondLine}</p>
            <p className={"textcol-main text-center" + " " + (props.thirdLineSize? props.thirdLineSize: "text-[24px]")}>{props.thirdLine}</p>
            <p className="textcol-dimm text-[16px] text-center font-medium">{props.about}</p>
        </div>
    )
}