


export default function FormButton(props:{
    name:string,
    processing:boolean
}){
    return(
        <button type="submit" disabled={props.processing} className={`w-full h-[45px] bg-hi text-[20px] textcol-main font-bold
        ${props.processing && "opacity-20"}
        `}>{props.name}</button>
    )
}