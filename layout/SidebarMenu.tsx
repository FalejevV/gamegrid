import MenuItem from "@/components/MenuItem/MenuItem";



export default function SidebarMenu(){
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