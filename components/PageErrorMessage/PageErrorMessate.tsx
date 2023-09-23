


export default function PageErrorMessage(props:{
    text:string
}){
    return(
        <p className="textcol-main w-full max-w-[1000px] bg-dimm text-center mx-auto p-[10px]">
            {props.text}
        </p>
    )
}