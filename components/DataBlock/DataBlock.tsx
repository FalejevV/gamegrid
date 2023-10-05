import { RatingNumber } from "@/interface";
import { ratingSymbols } from "@/rating";


export default function DataBlock(props: {
    title: string,
    value: number,
    textValue?: string | number
    color?: string,
    filter?: string
}) {
    let ratingNameKey = props.value / 10 as RatingNumber;
    return (
        <div className={`flexgap items-center justify-between px-[10px] w-full k:h-[50px] h-[40px] ${props.color ? props.color : "bg-dimm"} ${props.filter}`}>
            <p className="textcol-dimm text-[16px]">{props.title}</p>
            <p className="textcol-main text-[25px] font-semibold">{(props.textValue || "").toString().trim() === "" ? ratingSymbols[ratingNameKey] : props.textValue}</p>
        </div>
    )
}