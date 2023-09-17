export default function Loading() {

    function MobileLayout() {
        return (
            <span className="k:hidden flex">
                <div className="w-full max-w-[1000px] mx-auto flexgap flex-col animate-pulse">
                    <div className="w-full flexgap f:flex-row flex-col">
                        <div className="h-[34px] flex-auto bg-loading" />
                        <div className="h-[34px] flex-auto bg-loading" />
                    </div>
                    <div className="h-[34px] w-full bg-loading" />
                    <div className="flexgap flex-col w-full">
                        <div className="w-full h-[200px] bg-loading" />
                        <div className="flex-auto flex flex-col flex-gap">
                            <div className="w-full h-[85px] bg-loading" />
                            <div className="flex-auto h-[133px] bg-loading" />
                        </div>
                    </div>
                    <div className="w-full h-[265px] bg-loading" />
                </div>
            </span>
        )
    }



    function PCLayout() {
        return (
            <span className="k:flex hidden">
                <div className="w-full max-w-[1000px] mx-auto flexgap flex-col animate-pulse">
                    <div className="h-[34px] w-full flexgap">
                        <div className="h-full w-[20%] bg-loading" />
                        <div className="h-full w-[25%] bg-loading" />
                        <div className="h-full w-[55%] bg-loading" />
                    </div>
                    <div className="flexgap w-full h-[250px]">
                        <div className="w-[400px] h-full bg-loading" />
                        <div className="flex-auto flex flex-col flex-gap">
                            <div className="w-full h-[50px] bg-loading" />
                            <div className="flex-auto bg-loading" />
                        </div>
                    </div>
                    <div className="w-full h-[230px] bg-loading" />
                </div>
            </span>
        )
    }


    return (
        <>
            <PCLayout />
            <MobileLayout />
        </>
    )
}   