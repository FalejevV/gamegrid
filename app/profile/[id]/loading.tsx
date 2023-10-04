export default function Profile() {

    function PCLayout() {
        return (
            <div className="hidden k:flex w-full animate-pulse">
                <div className="w-full max-w-[1000px] flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <div className="bg-loading min-w-[270px] w-[270px] full object-cover" />

                        <div className="flexgap flex-col flex-auto textcol-main h-full">
                            <div className="w-full h-[34px] min-h-[34px] bg-loading" />
                            <div className="w-full  h-[34px] min-h-[34px] bg-loading" />
                            <div className="flexgap flex-col h-full">
                                <div className="flexgap h-fit">
                                    <div className="w-full h-[73px] bg-loading" />
                                    <div className="w-full h-[73px] bg-loading" />
                                    <div className="w-full h-[73px] bg-loading" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-loading-fade w-full h-[400px]" />
                </div>

            </div>
        )
    }
    function TabletLayout() {
        return (
            <div className="flex k:hidden max800:hidden w-full animate-pulse">
                <div className="w-full flexgap flex-col mx-auto">
                    <div className="w-full flexgap max-h-[270px] h-[270px]">
                        <div className="bg-loading min-w-[270px] w-[270px] h-[270px]" />

                        <div className="flexgap flex-col flex-auto textcol-main h-f">
                            <div className="bg-loading w-full h-[34px] min-h-[34px]" />
                            <div className="bg-loading w-full h-[34px] min-h-[34px]" />

                            <div className="flexgap w-full">
                                <div className="h-[73px] bg-loading w-full" />
                                <div className="h-[73px] bg-loading w-full" />
                            </div>
                            <div className="h-[73px] bg-loading w-full" />
                        </div>
                    </div>
                    <div className="bg-loading-fade w-full h-[300px]" />

                </div>
            </div>
        )
    }

    function MobileLayout() {
        return (
            <div className="flex min800:hidden w-full animate-pulse">
                <div className="w-full flexgap flex-col textcol-main">
                    <div className="flexgap sm:flex-row flex-col w-full">
                        <div className="w-full flex-auto h-[34px] min-h-[34px] bg-loading" />
                        <div className="w-full sm:max-w-[120px] h-[34px] min-h-[34px] bg-loading" />
                    </div>
                    <div className="w-full h-[150px] bg-loading" />
                    <div className="w-full h-[73px] bg-loading" />
                    <div className="w-full h-[73px] bg-loading" />
                    <div className="w-full h-[73px] bg-loading" />
                    
                    <div className="w-full h-[200px] bg-loading-fade" />
                </div>
            </div >
        )
    }
    return (
        <>
            <PCLayout />
            <TabletLayout />
            <MobileLayout />
        </>
    )
}