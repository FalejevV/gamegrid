



export default function SummaryStatComment(props: {
    className?: string,
    title: string,
    comment: string,
    about: string,
}) {
    return (
        <div className={"col-span-4 row-span-2 bg-dimm relative py-[20px] flex flex-col justify-start gap-[10px]" + " " + props.className}>
            <p className="sm:text-[18px] text-[16px] px-[15px]">{props.title}</p>
            <p className="sm:text-[16px] text-[15px] px-[15px] font-medium sm:max-h-[180px] max-h-[140px] overflow-hidden tracking-wide leading-5 brightness-75 flex-auto">{props.comment}</p>
            <p className="textcol-dimm sm:text-[16px] text-[15px] text-center font-medium">{props.about}</p>
        </div>
    )
}