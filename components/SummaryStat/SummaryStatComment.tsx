



export default function SummaryStatComment(props: {
    className?: string,
    title: string,
    comment: string,
    about: string,
}) {
    return (
        <div className={"col-span-4 row-span-2 bg-dimm relative py-[20px] flex flex-col justify-between" + " " + props.className}>
            <p className="text-[18px] px-[15px]">{props.title}</p>
            <p className="text-[16px] px-[15px] font-medium max-h-[180px] overflow-hidden tracking-wide leading-5 brightness-75">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum harum repellendus, animi hic cupiditate totam odit nulla doloribus! Quis, quia quasi? Nesciunt reiciendis ipsam voluptatum ullam, laudantium doloribus tenetur voluptas.</p>
            <p className="textcol-dimm text-[16px] text-center font-medium">{props.about}</p>
        </div>
    )
}