import MenuItem from "@/components/MenuItem/MenuItem";
import { toggleDropdownMenu } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";




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
            <span className={`fixed left-0 top-0 w-full h-full pointer-events-none transition-all duration-300 overflow-hidden z-[1000]
            ${windowSelector.displayDropdownMenu && "bg-[#00000080] pointer-events-auto"}`}
            onClick={clickLocationCheck}>
                <nav className={`w-full h-fit bg-dimm absolute left-0 transition-all duration-300 p-[20px] py-[40px] flex flex-col gap-[30px] overflow-y-scroll
                ${windowSelector.displayDropdownMenu && "bottom-0 flex"}
                ${!windowSelector.displayDropdownMenu && "bottom-[-100vh]"}
                `}>
                    
                    <MenuItem selectable={windowSelector.displayDropdownMenu} href={"/"} icon={""} mobile title="Home" />
                    <MenuItem selectable={windowSelector.displayDropdownMenu} href={"/games"} icon={""} mobile title="Game list" />
                    <MenuItem selectable={windowSelector.displayDropdownMenu} href={"/collection"} icon={""} mobile title="My Collection" />
                    <MenuItem selectable={windowSelector.displayDropdownMenu} href={"/about"} icon={""} mobile title="About Us" />
                </nav>
            </span>
        )
    }

    
    function SidebarMenuPC(){
        return(
            <nav className={`flex flex-col gap-[25px] w-full h-full justify-center items-center pb-[45px] relative transition-all duration-300
            ${!windowSelector.sidebarHovered && "left-[28px]"}
            ${windowSelector.sidebarHovered && "left-[20px]"}
            `}>
                <MenuItem href={"/"} icon={"Home"} title={"Home"} />
                <MenuItem href={"/games"} icon={"Games"} title={"Game list"}/>
                <MenuItem href={"/collection"} icon={"Collection"} title={"My Collection"}/>
                <div className="flex-auto"/>
                <MenuItem href={"/about"} icon={"Info"} width={35} title={"About Us"}/>
            </nav>
        )
    }




    if(windowSelector.width !== -1) return(
        <>
            {windowSelector.width >= 880 ? SidebarMenuPC() : SidebarMenuMobile()}
        </>
    )
}