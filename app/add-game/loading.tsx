


export default function Loading(){
    return(
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-full max-w-[750px] flex flex-col gap-[25px]">
                <div className="w-[30%] h-[40px] bg-loading"/>
                <div className="w-[100px] h-[30px] bg-loading"/>
                <div className="inputheight w-full bg-loading"/>
            </div>
        </div>
    )
}