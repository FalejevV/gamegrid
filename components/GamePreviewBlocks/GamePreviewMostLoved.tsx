import Image from "next/image";

export default function GamePreviewMostLoved(props:{
    discipline:string,
    value:number,
    minimal?:boolean
}){

    if(props.minimal){
        return(
            <div className="flexjustify-between flex-auto min-w-[170px] bg-mid px-[10px] items-center relative overflow-hidden h-[44x] min-h-[44px] max-h-[44px]">
                <div className="h-full flex items-center font-medium textcol-main z-10 justify-between relative gap-[10px]">
                    <p className="md:text-[18px] text-[16px] whitespace-nowrap">{props.discipline}</p>
                    <p className="font-bold text-[18px]">{props.value}%</p>
                </div>

                <Image className="absolute left-[50%] bottom-[-25px] -rotate-12 opacity-40 w-[80px] h-[80px]" src={"/icons/Chart-up.svg"} alt={"down"} width={50} height={50} />
            </div> 
        )
    }

    return(
        <div className="flex flex-col justify-between flex-auto min-w-[170px] max-w-[170px] bg-mid px-[10px] py-[7px] relative overflow-hidden h-[88px]">
            <p className="textcol-main text-[16px] font-semibold z-10">{props.discipline}</p>
            <div className="flex items-end justify-between font-medium textcol-main z-20">
                <p className="textcol-dimm text-[17px] z-10">Most</p>
                <p className="text-[32px] flex leading-[30px]">{props.value}%</p>
            </div>

            <Image className="absolute top-[5px] right-[10px] w-[33px] h-[29px]" src={"/icons/Chart-up.svg"} alt={"down"} width={33} height={29} />

            <Image className="absolute left-[-20px] bottom-[-10px] opacity-40 w-[100px] h-[100px]" src={"/icons/Chart-up.svg"} alt={"down"} width={100} height={100} />
        </div>
    )
}