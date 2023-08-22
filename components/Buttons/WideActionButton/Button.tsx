


export default function Button(props:{
    title:string,
    onClick:Function,
    submit?:boolean
}){
    return(
        <button type={props.submit ? "submit" : "button"} className="inputheight w-[80px] bg-dimm textcol-main flex items-center justify-center hover:brightness-110" onClick={() => props.onClick()}>
            {props.title}
        </button>
    )
}