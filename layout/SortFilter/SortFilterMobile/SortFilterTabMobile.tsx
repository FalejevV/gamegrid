import Image from "next/image"



export default function SortFilterTabMobile() {
    return (
        <div className="w-full h-[50px] flex k:hidden items-center justify-between">
            <div className="w-[45px] h-[45px] bg-dimm flex items-center justify-center">
                <Image width={25} height={25} alt="filter button" src={"/icons/filter.svg"} className="w-[25px] h-[25px]" />
            </div>
            <p className="bg-dimm inputheight flex items-center justify-center px-[15px] text-[16px] font-medium textcol-main">Sort By</p>
        </div>
    )
}