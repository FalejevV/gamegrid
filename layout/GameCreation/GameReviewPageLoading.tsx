


export default function GameReviewPageLoading(props: {
    newGame?: boolean
}) {
    return (
        <div className="relative">
            {props.newGame &&
                <p className="absolute left-[50%] w-full max-w-[500px] top-[80px] translate-x-[-50%] py-[15px] px-[10px] bg-dimm z-10">
                    Game info was not found in our database. Fetching info... <br/>
                    You are the first one reviewing this game ;)
                </p>
            }
            <div className="flex gap-[25px] w-full flex-col animate-pulse relative">
                <div className="w-full h-[45px] bg-loading" />
                <div className="w-[70%] h-[20px] bg-loading" />
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
                <div className="w-full h-[20px] bg-loading" />
                <div className="w-full h-[200px] bg-loading" />
            </div>
        </div>
    )
}