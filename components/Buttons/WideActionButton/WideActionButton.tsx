



export default function WideActionButton(props:{
    onClick:Function,
    text:string,
}) {
    return (
        <button className="flex-auto h-[45px] textcol-main text-center bg-hi text-[22px] hover:brightness-110" onClick={() => props.onClick()}>{props.text}</button>
    )
}