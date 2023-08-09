import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import SidebarMenu from "./SidebarMenu";
import { toggleSidebarHover } from "@/store/features/window";

export default function Sidebar(){

    const dispatch = useAppDispatch();
    const windowSitebarSelector = useAppSelector((state:RootState) => state.window.sidebarHovered);

    return(
        <div className={`hidden h-screen max-h-screen bg-[#0D0306] fixed left-0 top-0 md:flex pt-[100px] transition-all duration-300
        ${windowSitebarSelector && "w-[200px]"}
        ${!windowSitebarSelector && "w-[90px]"}
        `}
        onMouseEnter={() => dispatch(toggleSidebarHover(true))}  onMouseLeave={() => dispatch(toggleSidebarHover(false))} 
            
        >
            <SidebarMenu />
        </div>
    )
}