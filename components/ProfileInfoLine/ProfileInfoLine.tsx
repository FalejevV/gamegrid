
export default function ProfileInfoLine(props: {
    text: string | number,
    addClass?: string,
    flexauto?: boolean,
    align?: string
}) {
    return (
        <p className={`h-[34px] flex items-center px-[10px]
            ${props.addClass ? props.addClass : "bg-dimm"}
            ${props.flexauto && "flex-auto"}
            ${props.align && props.align}
        `}>
            {props.text}
        </p>
    )
}

