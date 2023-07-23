import Image from "next/image"


export default function GamePreviewParagraph(props:{
    text:string
}){
    return(
        <div className="w-full h-full relative bg-dimm textcol-main px-[10px] text-[15px] max-w-[540px] py-[7px] overflow-hidden">
            <p className="relative z-10"> {props.text} </p>

            <Image src={"/icons/Info.svg"} alt={"info-icon"} width={45} height={125} className="absolute right-1 bottom-1 z-0 opacity-10 w-[45px] h-[125px]" />
        </div>
    )
}