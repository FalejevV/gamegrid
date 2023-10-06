import { RatingNumber } from "@/interface";
import { ratingSymbols } from "@/rating";


export default function DataBlock(props: {
    title: string,
    value: number,
    textValue?: string | number
    color?: string,
    filter?: string,
}) {
    let ratingNameKey = props.value / 10 as RatingNumber;
    return (
        <div className={`flexgap items-center justify-between px-[10px] w-full k:h-[50px] h-[40px] ${props.color ? props.color : "bg-dimm"} ${props.filter} hover:textcol-main textcol-dimm cursor-default`}>
            <p className="text-[16px] whitespace-nowrap pr-[15px]">{props.title}</p>
            <p className="textcol-main text-[25px] font-semibold whitespace-nowrap">{(props.textValue || "").toString().trim() === "" ? ratingSymbols[ratingNameKey] : props.textValue}</p>
        </div>
    )
}