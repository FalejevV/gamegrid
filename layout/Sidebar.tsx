import SidebarMenu from "./SidebarMenu";

export default function Sidebar(){
    return(
        <div className="hidden w-[90px] h-screen max-h-screen bg-[#0D0306] fixed left-0 top-0 md:flex pt-[100px]">
            <SidebarMenu />
        </div>
    )
}