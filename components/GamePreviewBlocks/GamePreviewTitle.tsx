


export default function GamePreviewTitle(props:{
    title:string
    stretch?:boolean
    center?:boolean
}){
    return(
        <p className={`flex items-center px-3 bg-mid text-[20px] h-full font-semibold textcol-main whitespace-nowrap 
        ${props.stretch && "w-full h-[34px] min-h-[34px]"} 
        ${props.center && "justify-center"}
        `}>
            {props.title}
        </p>
    )
}