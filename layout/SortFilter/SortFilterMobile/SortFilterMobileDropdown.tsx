import MobileFilterButton from "@/components/MobileFilterButton/MobileFilterButton";
import { setMobileFilterSelected, toggleMobileFilterDropdown } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import TagsFilterDropdown from "../TagsFilterDropdown";
import PlatformFilterDropdown from "../PlatformFilterDropdown";
import OrderByDropdown from "../OrderByDropdown";
import DeveloperFilterDropdown from "../DeveloperFilterDropdown";
import { clearAllOptions, clearOptions } from "@/store/features/sortFilter";
import PlayersFilterDropdown from "../PlayersFilterDropdown";
import Link from "next/link";
import { generateSortFilterParams } from "@/utils/queryParams";



export default function SortFilterMobileDropdown(props: {
    tagOptions: string[],
    developerOptions: string[],
    playerOptions: string[],
    platformOptions: string[],
    aspectOptions: string[],
}) {
    const mobileDropdownSelector = useAppSelector((state: RootState) => state.window.mobileFilterDropdown);
    const mobileFilterSelectedSelector = useAppSelector((state: RootState) => state.window.mobileFilterSelected);
    const sortFilterSelector = useAppSelector((state: RootState) => state.sortFilter);
    const dispatch = useAppDispatch();

    function clickLocationCheck(e: React.MouseEvent) {
        let target = e.target as HTMLElement;
        if (target.tagName === "SPAN") {
            dispatch(toggleMobileFilterDropdown(false));
            dispatch(setMobileFilterSelected(""));
        }
        e.stopPropagation();
    }

    function DisplaySelectedFilter() {
        if (mobileFilterSelectedSelector === "tags") return <TagsFilterDropdown itemList={props.tagOptions} />
        if (mobileFilterSelectedSelector === "platforms") return <PlatformFilterDropdown itemList={props.platformOptions} />
        if (mobileFilterSelectedSelector === "players") return <PlayersFilterDropdown itemList={props.playerOptions} />
        if (mobileFilterSelectedSelector === "order") return <OrderByDropdown itemList={props.aspectOptions} />
        if (mobileFilterSelectedSelector === "developer") return <DeveloperFilterDropdown itemList={props.developerOptions} />
        return;
    }

    function isAnythingSelected() {
        return sortFilterSelector.dropdowns.developer.selectedItems.length > 0 || sortFilterSelector.dropdowns.tags.selectedItems.length > 0
            || sortFilterSelector.dropdowns.players.selectedItems.length > 0 || sortFilterSelector.dropdowns.platforms.selectedItems.length > 0
            || sortFilterSelector.dropdowns.order.selectedItems.length > 0
    }

    return (
        <span className={`w-screen h-screen fixed left-0 top-0 bg-[#0000008a] z-[1000] transition-all duration-200
            ${mobileDropdownSelector ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `} onClick={clickLocationCheck}>

            <div className={`w-full h-[calc(100vh-130px)] bg-dimm fixed left-0 bottom-0 z-[1001] flex overflow-y-auto overflow-x-hidden transition-all duration-200
                ${mobileDropdownSelector ? "bottom-0 " : "bottom-[-100vh]"}
            `}>

                {/* Main filter page, where user can select required filter type */}
                <div className={`flex flex-col overflow-hidden transition-all duration-200 whitespace-nowrap pb-[15px] h-[calc(100%-105px)] overflow-y-auto
                    ${mobileFilterSelectedSelector !== "" ? "w-[0px] min-w-0" : "w-screen min-w-[100vw]"}
                    `}>

                    <div className="w-full inputheight bg-mid flex items-center p-[10px] justify-between">
                        <button className="textcol-main py-[5px] pr-[20px]" onClick={() => dispatch(toggleMobileFilterDropdown(false))}>{"Close"}</button>
                        {isAnythingSelected() && <button className="textcol-main py-[5px] pl-[20px]" onClick={() => dispatch(clearAllOptions())}>Clear all</button>}
                    </div>
                    <section className="w-full flex flex-col gap-[20px] p-[10px] flex-auto">
                        <MobileFilterButton title={"By Tags"} type={"tags"} />
                        <MobileFilterButton title={"By Platform"} type={"platforms"} />
                        <MobileFilterButton title={"By Players"} type={"players"} />
                        <MobileFilterButton title={"By Company"} type={"developer"} />
                        <MobileFilterButton title={"Order By"} type={"order"} />
                    </section>
                </div>

                {/* Selected filter type page */}
                <div className="w-screen min-w-[100vw]">
                    <div className="w-full inputheight bg-mid flex items-center p-[10px] justify-between">
                        <button className="textcol-main py-[5px] pr-[20px]" onClick={() => dispatch(setMobileFilterSelected(""))}>Back</button>
                        <button className="textcol-main py-[5px] pl-[20px]" onClick={() => dispatch(clearOptions(mobileFilterSelectedSelector || "tags"))}>Clear {mobileFilterSelectedSelector}</button>
                    </div>
                    <div className="w-full h-[calc(100%-105px)] overflow-y-auto brightness-90">
                        <DisplaySelectedFilter />
                    </div>
                </div>
            </div>
            <Link className="absolute mx-auto w-full max-w-[250px] bg-mid textcol-main inputheight text-[18px] font-semibold bottom-[10px] left-[50%] translate-x-[-50%] z-[1002] flex items-center justify-center"
                href={generateSortFilterParams(sortFilterSelector, "games")} onClick={() => {dispatch(toggleMobileFilterDropdown(false)); dispatch(setMobileFilterSelected(""))}}>
                Search!
            </Link>
        </span>

    )
}