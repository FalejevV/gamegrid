



export default function WideActionButton(props: {
    onClick: Function,
    text: string,
    submit?: boolean
    disabled?: boolean
    disableText?:string
}) {
    return (
        <button disabled={props.disabled} type={props.submit ? "submit" : "button"}
            className={`flex-auto h-[45px] textcol-main text-center bg-hi sm:text-[20px] text-[16px] min-w-[100px] hover:brightness-110
                ${props.disabled && "opacity-25"}
            `}
            onClick={() => props.onClick()}>{props.disabled ? props.disableText : props.text}</button>
    )
}