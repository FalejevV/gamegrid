



export default function SummaryStatSmall(props:{
    className?:string
    title:string | number,
    about:string,
}){
    return(
        <div className={"col-span-2 bg-dimm relative py-[20px] flex flex-col justify-between"+ " " +props.className}>
            <p className="textcol-main text-[38px] text-center">{props.title}</p>
            <p className="textcol-dimm text-[16px] text-center font-medium">{props.about}</p>
        </div>
    )
}