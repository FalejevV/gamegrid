



export default function WideActionButton(props: {
    onClick: Function,
    text: string,
    submit?: boolean
    disabled?: boolean
}) {
    return (
        <button disabled={props.disabled} type={props.submit ? "submit" : "button"}
            className={`flex-auto h-[45px] textcol-main text-center bg-hi text-[22px] hover:brightness-110
                ${props.disabled && "opacity-25"}
            `}
            onClick={() => props.onClick()}>{props.text}</button>
    )
}