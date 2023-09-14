import { toggleDropdownMenu } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';


export default function MenuItem(props:{
    href:string,
    icon:string,
    width?:number,
    mobile?:boolean,
    title:string,
    selectable?:boolean
}){

    const pathname = usePathname();
    const dispatch = useAppDispatch();

    if(props.mobile){
        return(
            <Link href={props.href} tabIndex={props.selectable ? 1 : -1} className={`w-full max-w-[50vw] flex justify-center items-center text-[25px]
            ${pathname !== props.href ? "textcol-dimm" :"textcol-main"}
            `}
            onClick={() => dispatch(toggleDropdownMenu(false))}
            > 
                {props.title}
            </Link>
        )
    }
    
    const windowSidebarSelector = useAppSelector((state:RootState) => state.window.sidebarHovered);

    return(
        <Link href={props.href} tabIndex={props.selectable ? 1 : -1} className={`w-full flex items-center gap-[15px] transition-all duration-150
            hover:scale-105 hover:brightness-125
        `}> 
            <div className="max-w-[35px] min-w-[35px] min-h-[35px] max-h-[35px] flex items-start justify-start">
                <Image src={`/icons/menu/${props.icon}.svg`} alt={`menu-${props.icon}`} width={props.width || 35} height={35}
                className={`scale-110 h-[35px]
                ${pathname !== props.href && "brightness-[60%] scale-100"} 
                `}/>
            </div>
            <p className={`textcol-main whitespace-nowrap transition-all duration-150 pt-[5px]
            ${windowSidebarSelector && "opacity-100 delay-150"}
            ${!windowSidebarSelector && "opacity-0 delay-0"}
            `}>{props.title}</p>
        </Link>
    )
}