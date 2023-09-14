import GamePreviewItemLS from "@/components/GamePreviewItem/GamePreviewItemLoadingSkeletont"



export default function Loading() {

    function SkeletonGames() {
        return (
            [1, 2, 3].map((item: number) => <GamePreviewItemLS key={item} />)
        )
    }

    return (
        <div className="w-full flex flex-col k:gap-[60px] gap-[15px] items-center brightness-[70%] overflow-hidden animate-pulse">
            <div className={`k:block hidden w-full max-w-[1000px] h-[65px] bg-loading p-[10px]  relative`} />
            <div className="k:hidden flex w-full inputheight items-center justify-between">
                <div className="w-[45px] h-[45px] bg-loading"/>
                <div className="w-full max-w-[150px] h-[45px] bg-loading"/> 
            </div>
            <div className="w-full items-center flex flex-col gap-[60px]">
                {SkeletonGames()}
            </div>
        </div>
    )
}