export default function InfoLine(props: {
    text: string | number,
    addClass?: string,
    flexauto?: boolean,
    align?: string,
}) {
    return (
        <p className={`h-[34px] items-center px-[10px] min-h-[34px] flexgap flex-auto
            ${props.addClass ? props.addClass : "bg-dimm"}
            ${props.flexauto && "flex-auto"}
            ${props.align && props.align}
        `}>
            {props.text}
        </p>
    )
}

