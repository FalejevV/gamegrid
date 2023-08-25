


export default function Button(props: {
    title: string,
    onClick: Function,
    submit?: boolean
    disabled?: boolean
}) {
    return (
        <button disabled={props.disabled} type={props.submit ? "submit" : "button"}
            className={`inputheight whitespace-nowrap px-[20px] w-min bg-dimm textcol-main flex items-center justify-center hover:brightness-110
                ${props.disabled && "opacity-40"}
            `} onClick={() => props.onClick()}>
            {props.title}
        </button>
    )
}