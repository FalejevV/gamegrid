import Image from "next/image"
import { ChangeEvent } from "react"

export default function FileInput(props: {
    value: File | null,
    onChange: Function,
    title: string,
    name: string,
    iconPath:string,
    imagePreview?:boolean,
    height?:string,
}) {

    function onChange(e:ChangeEvent){
        let target = e.target as HTMLInputElement;
        let files = target.files as FileList;
        let file = files[0];
        if(file){
            props.onChange(file);
        }
    }

    function clearFiles(e:React.MouseEvent){
        e.stopPropagation();
        e.preventDefault();
        props.onChange(null);
    }

    return (
        <div className={`flexgap justify-between items-center w-full textcol-main cursor-pointer ${props.height ? props.height : "inputheight"}`}>
            <label htmlFor={props.name}>{props.title}</label>
            <label htmlFor={props.name} className="w-full sm:max-w-[240px] max-w-[140px] h-full bg-dimm cursor-pointer flex items-center justify-center hover:brightness-110 transition-all duration-200 relative">
                {!props.value && <Image src={props.iconPath} alt={`${props.title} file input`} width={50} height={30} className="w-[50px] h-[30px]"/>}

                {props.imagePreview && props.value !== null && <>
                    <img src={URL.createObjectURL(props.value)} alt={`${props.title} preview image`} className="w-full h-full object-cover absolute left-0 top-0"/>
                    <Image src={"/icons/Close.svg"} alt={"clear file"} width={30} height={30} className="w-[30px] h-[30px] absolute z-[1] right-0 top-0 bg-dimm" onClick={clearFiles}/>
                </>}
            </label>
            <input onChange={onChange} className="hidden" type="file" name={props.name} id={props.name} />
        </div>
    )
}