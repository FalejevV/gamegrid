


export default function GameReviewPageLoading() {
    return (
        <div className="flex gap-[25px] w-full flex-col animate-pulse">
            <div className="flex items-center justify-between">
                <div className="w-full max-w-[280px] h-[20px] bg-loading" />
                <div className="w-[80px] h-[45px] bg-loading" />
            </div>
            <div className="flex items-center justify-between">
                <div className="w-full max-w-[220px] h-[20px] bg-loading" />
                <div className="w-[80px] h-[45px] bg-loading" />
            </div>
            <div className="flex items-center justify-between">
                <div className="w-full max-w-[250px] h-[20px] bg-loading" />
                <div className="w-[160px] h-[45px] bg-loading" />
            </div>
            <div className="w-full h-[45px] bg-loading" />
        </div>
    )
}