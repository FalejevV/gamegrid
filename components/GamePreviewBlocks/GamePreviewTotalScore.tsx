import Image from "next/image"



export default function GamePreviewTotalScore(props:{
    value:number,
    minimal?:boolean
}){

    if(props.minimal){
        return(
            <div className="w-full max-w-[130px] min-w-[130px] flex-auto bg-hi flex flex-col justify-between py-[4px] items-center relative overflow-hidden h-[60px] px-[10px]" >
                <p className="font-semibold textcol-main text-[16px] z-10 relative w-full">Rating</p>
                <p className="textcol-main text-[22px] font-bold relative z-10 w-full text-right">{props.value}%</p>

                <Image src={"/icons/Star.svg"} alt={"star icon"}  width={120} height={120} className="absolute right-[-70px] top-[-70px] opacity-20 w-auto h-auto"/>
                <Image src={"/icons/Star.svg"} alt={"star icon"}  width={50} height={50} className="absolute left-[0px] bottom-[-20px] opacity-10 w-[50px] h-[50px] rotate-45"/>
            </div>
        )
    }

    return(
        <div className="w-full max-w-[180px] min-w-[180px] flex-auto bg-hi flex flex-col justify-between py-[8px] pb-1 items-center relative overflow-hidden h-[88px]" >
            <p className="font-semibold textcol-main text-[19px] z-10 relative">Overall rating</p>
            <p className="textcol-main text-[28px] font-bold relative z-10">{props.value}%</p>

            <Image src={"/icons/Star.svg"} alt={"star icon"}  width={120} height={120} className="absolute right-[-50px] top-[-50px] opacity-20 w-[120px] h-[120px]"/>
            <Image src={"/icons/Star.svg"} alt={"star icon"}  width={80} height={80} className="absolute left-[-20px] bottom-[-10px] opacity-10 w-[80px] h-[80px]"/>
        </div>
    )
}