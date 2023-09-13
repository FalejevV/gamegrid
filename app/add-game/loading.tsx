


export default function Loading() {
    return (
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-full max-w-[1000px] flex flex-col gap-[25px]">
                <div className="w-[100px] h-[30px] bg-loading" />
                <div className="flex flex-col gap-[10px]">
                    <div className="w-full max-w-[120px] bg-loading h-[15px]" />
                    <div className="w-full max-w-[230px] bg-loading h-[15px]" />
                    <div className="w-full max-w-[250px] bg-loading h-[15px]" />
                    <div className="w-full max-w-[220px] bg-loading h-[15px]" />
                    <div className="w-full max-w-[235px] bg-loading h-[15px]" />
                </div>
                <div className="w-full max-w-[100px] h-[30px] bg-loading" />
                <div className="inputheight w-full bg-loading" />
            </div>
        </div>
    )
}