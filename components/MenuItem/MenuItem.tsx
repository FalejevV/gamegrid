import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation';


export default function MenuItem(props:{
    href:string,
    icon:string,
    width?:number
}){

    const pathname = usePathname();
    
    return(
        <Link href={props.href} className="w-full flex justify-center items-center"> 
            <Image src={`icons/menu/${props.icon}.svg`} alt={`menu-${props.icon}`} width={props.width || 35} height={35}
            className={`scale-110  ${pathname !== props.href && "brightness-[60%] scale-100"}`}/>
        </Link>
    )
}