

export default function AlertText(props:{
    alertText: string
}){
    return(
        <div className="flex gap-[20px] items-center justify-center mt-[35px] textcol-dimm animate-[bounce_1s_ease-in-out_forwards]">
            <p>!#</p>
            <p className="text-[18px] textcol-main ">{props.alertText}</p>
            <p>#!</p>
        </div>
    )
}