



export default function SummaryStatComment(props: {
    className?: string,
    title: string,
    comment: string,
    about: string,
}) {
    return (
        <div className={"col-span-4 row-span-2 bg-dimm relative py-[20px] flex flex-col justify-start gap-[10px]" + " " + props.className}>
            <p className="text-[18px] px-[15px]">{props.title}</p>
            <p className="text-[16px] px-[15px] font-medium max-h-[180px] overflow-hidden tracking-wide leading-5 brightness-75 flex-auto">{props.comment}</p>
            <p className="textcol-dimm text-[16px] text-center font-medium">{props.about}</p>
        </div>
    )
}