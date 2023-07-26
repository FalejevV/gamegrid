import Image from "next/image";


export default function SortFilterSearch(props:{
    searchValue:string,
    setSearchValue:Function
}){
    return(
        <div className="w-full h-[45px] min-h-[45px] bg-dimm cursor-text flex items-center px-[10px] mb-[5px] relative">
            <input type="text" 
            className="w-full h-full absolute left-0 top-0 focus:outline-none px-[10px] pr-[35px] bg-transparent textcol-main"
            placeholder="Search"
            value={props.searchValue}
            onChange={(e:React.FormEvent<HTMLInputElement>) => props.setSearchValue(e.currentTarget.value)}
            />

            {props.searchValue.trim() !== "" ? 
            <Image src={"/icons/Close.svg"} alt={"search icon"}
            width={15} height={15}
            className="absolute right-[13px] top-[50%] translate-y-[-50%] select-none cursor-pointer w-[15px] h-[15px] opacity-50 hover:scale-[120%] transition-all duration-150"
            draggable="false"
            onClick={() => props.setSearchValue("")}
            />

            :

            <Image src={"/icons/Search.svg"} alt={"search icon"}
            width={20} height={20}
            className="absolute right-[10px] top-[50%] translate-y-[-50%] select-none w-[20px] h-[20px] opacity-50"
            draggable="false"
            />
        }
        </div>
    )
}