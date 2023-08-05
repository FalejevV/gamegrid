


export default function InputField(props:{
    label:string,
    name:string,
    placeholder:string,
    type?:string,
    value:string,
    setValue:Function
}){

    return(
        <div className="w-full h-fit flex-col flexgap">
            <label htmlFor={props.name} className="textcol-main">{props.label}</label>
            <div className="w-full h-[45px] bg-mid relative">
                <input type={props.type || "text"} name={props.name} id={props.name} placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)}
                 className="w-full h-full absolute left-0 top-0 bg-transparent p-[10px] textcol-main focus:outline-none" />
            </div>
        </div>
    )
}