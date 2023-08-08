import { toggleDropdownMenu } from "@/store/features/window";
import { useAppDispatch } from "@/store/store";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';


export default function MenuItem(props:{
    href:string,
    icon:string,
    width?:number,
    mobile?:boolean,
    title?:string,
}){

    const pathname = usePathname();
    const dispatch = useAppDispatch();

    if(props.mobile){
        return(
            <Link href={props.href} className={`w-full flex justify-center items-center text-[25px]
            ${pathname !== props.href ? "textcol-dimm" :"textcol-main"}
            `}
            onClick={() => dispatch(toggleDropdownMenu(false))}
            > 
                {props.title}
            </Link>
        )
    }
    
    return(
        <Link href={props.href} className="w-full flex justify-center items-center"> 
            <Image src={`icons/menu/${props.icon}.svg`} alt={`menu-${props.icon}`} width={props.width || 35} height={35}
            className={`scale-110  ${pathname !== props.href && "brightness-[60%] scale-100"}`}/>
        </Link>
    )
}