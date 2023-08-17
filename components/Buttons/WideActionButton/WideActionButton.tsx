



export default function WideActionButton(props:{
    onClick:Function,
    text:string,
}) {
    return (
        <button className="w-full textcol-main text-center bg-hi text-[22px] p-[10px] hover:brightness-110" onClick={() => props.onClick()}>{props.text}</button>
    )
}