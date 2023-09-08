import MobileFilterButton from "@/components/MobileFilterButton/MobileFilterButton";
import { setMobileFilterSelected, toggleMobileFilterDropdown } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import TagsFilterDropdown from "../TagsFilterDropdown";
import PlatformFilterDropdown from "../PlatformFilterDropdown";
import OrderByDropdown from "../OrderByDropdown";



export default function SortFilterMobileDropdown(props: {
    tagOptions: string[],
    developerOptions: string[],
    playerOptions: string[],
    platformOptions: string[],
    aspectOptions: string[],
}) {
    const mobileDropdownSelector = useAppSelector((state: RootState) => state.window.mobileFilterDropdown);
    const mobileFilterSelectedSelector = useAppSelector((state: RootState) => state.window.mobileFilterSelected);
    const dispatch = useAppDispatch();

    function clickLocationCheck(e: React.MouseEvent) {
        let target = e.target as HTMLElement;
        if (target.tagName === "SPAN") {
            dispatch(toggleMobileFilterDropdown(false));
        }
        e.stopPropagation();
    }

    function DisplaySelectedFilter() {
        console.log(mobileFilterSelectedSelector);
        if (mobileFilterSelectedSelector === "tags") return <TagsFilterDropdown itemList={props.tagOptions} />
        if (mobileFilterSelectedSelector === "platforms") return <PlatformFilterDropdown itemList={props.platformOptions} />
        if (mobileFilterSelectedSelector === "players") return <PlatformFilterDropdown itemList={props.playerOptions} />
        if (mobileFilterSelectedSelector === "order") return <OrderByDropdown itemList={props.aspectOptions} />

        return;
    }


    return (
        <span className={`w-screen h-screen fixed left-0 top-0 bg-[#0000008a] z-[1000] transition-all duration-200
            ${mobileDropdownSelector ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `} onClick={clickLocationCheck}>

            <div className={`w-full h-[calc(100vh-130px)] bg-dimm fixed left-0 bottom-0 z-[1001] flex overflow-y-auto overflow-x-hidden transition-all duration-200
                ${mobileDropdownSelector ? "bottom-0 " : "bottom-[-100vh]"}
            `}>

                <div className={`flex flex-col w-screen min-w-[100vw] overflow-hidden transition-all duration-200 whitespace-nowrap
                    ${mobileFilterSelectedSelector !== "" && "w-[0px] min-w-0"}
                    `}>

                    <div className="w-full inputheight bg-mid"></div>
                    <section className="w-full flex flex-col gap-[20px] p-[10px]">
                        <MobileFilterButton title={"By Tags"} type={"tags"} />
                        <MobileFilterButton title={"By Platform"} type={"platforms"} />
                        <MobileFilterButton title={"By Players"} type={"players"} />
                        <MobileFilterButton title={"By Company"} type={"developer"} />
                        <MobileFilterButton title={"Order By"} type={"order"} />
                    </section>
                </div>

                <div className="w-screen h-full min-w-[100vw]">
                    <div className="w-full inputheight bg-mid flex items-center p-[10px]">
                        <button className="textcol-main" onClick={() => dispatch(setMobileFilterSelected(""))}>{"Back"}</button>
                    </div>
                    <DisplaySelectedFilter />
                </div>
            </div>
        </span>

    )
}