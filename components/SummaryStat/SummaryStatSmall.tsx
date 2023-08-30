



export default function SummaryStatSmall(props:{
    className?:string
    title:string | number,
    about:string,
}){
    return(
        <div className={"col-span-2 bg-dimm relative py-[20px] flex flex-col justify-between"+ " " +props.className}>
            <p className="textcol-main sm:text-[38px] px-[10px] text-[30px] overflow-x-auto overflow-y-hidden whitespace-nowrap text-center">{props.title}</p>
            <p className="textcol-dimm sm:text-[16px] text-[15px] text-center font-medium">{props.about}</p>
        </div>
    )
}