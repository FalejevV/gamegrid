import GamePreviewItemLS from "@/components/GamePreviewItem/GamePreviewItemLoadingSkeletont"



export default function Loading(){

    function SkeletonGames(){
        return(
            [1,2,3].map((item:number) => <GamePreviewItemLS key={item} />)
        )
    }

    return(
        <div className="w-full flex flex-col gap-[60px] items-center py-[60px] brightness-[70%] overflow-hidden animate-pulse">
            <div className={`w-full max-w-[950px] h-[80px] bg-gray-400 p-[10px] brightness-[40%] relative`} />
            {SkeletonGames()}
        </div>
    )
}