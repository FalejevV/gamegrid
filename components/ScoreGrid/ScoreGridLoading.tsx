

export default function ScoreGridLoading() {
    return (
        <div className="grid k:grid-cols-3 k:grid-rows-[repeat(4,50px)] w-full gap-[5px] k:gap-[10px] 
            grid-cols-[repeat(2,minmax(270px,1fr))] grid-rows-[repeat(6,40px)] overflow-x-auto">
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
            <div className="w-full h-full bg-loading" />
        </div>
    )
}