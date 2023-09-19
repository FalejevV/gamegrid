


export default function GamePreviewTitle(props:{
    title:string
    stretch?:boolean
    center?:boolean
}){
    return(
        <p className={`flex items-center px-3 bg-mid sm:text-[20px] text-[16px] h-full font-semibold textcol-main whitespace-nowrap overflow-x-auto
        ${props.stretch && "w-full h-[34px] min-h-[34px]"} 
        ${props.center && "justify-center"}
        `}>
            {props.title}
        </p>
    )
}