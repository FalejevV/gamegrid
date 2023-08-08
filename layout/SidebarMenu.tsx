import MenuItem from "@/components/MenuItem/MenuItem";
import { toggleDropdownMenu } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Link from "next/link";



function SidebarMenuPC(){
    return(
        <nav className="flex flex-col gap-[25px] w-full h-full justify-center pb-[45px]">
            <MenuItem href={"/"} icon={"Home"} />
            <MenuItem href={"/games"} icon={"Games"} />
            <MenuItem href={"/collection"} icon={"Collection"} />
            <div className="flex-auto"/>
            <MenuItem href={"/about"} icon={"Info"} width={13}/>
        </nav>
    )
}


export default function SidebarMenu(){
    
    const windowSelector = useAppSelector((state:RootState) => state.window);
    const dispatch = useAppDispatch();
    
    function clickLocationCheck(e: React.MouseEvent){
        let target = e.target as HTMLElement;
        if(target.tagName === "SPAN"){
            dispatch(toggleDropdownMenu(false));
        }
        e.stopPropagation();
    }

    function SidebarMenuMobile(){
        return(
            <span className={`fixed left-0 top-0 w-full h-screen pointer-events-none transition-all duration-300  overflow-hidden
            ${windowSelector.displayDropdownMenu && "bg-[#00000080] pointer-events-auto"}`} 
            onClick={clickLocationCheck}>
                <nav className={`w-full h-fit bg-dimm absolute left-0 transition-all duration-300 p-[20px] py-[40px] flex flex-col gap-[30px]
                ${windowSelector.displayDropdownMenu && "bottom-0"}
                ${!windowSelector.displayDropdownMenu && "bottom-[-100vh]"}
                `}>
                    
                    <MenuItem href={"/"} icon={""} mobile title="Home" />
                    <MenuItem href={"/games"} icon={""} mobile title="Games" />
                    <MenuItem href={"/collection"} icon={""} mobile title="My Collection" />
                    <MenuItem href={"/about"} icon={""} mobile title="About us" />
                </nav>
            </span>
        )
    }



    if(windowSelector.width !== -1) return(
        <>
            {windowSelector.width >= 880 ? SidebarMenuPC() : SidebarMenuMobile()}
        </>
    )
}