import ScoreGridLoading from "@/components/ScoreGrid/ScoreGridLoading"


function PCLayout() {
    return (
        <div className="w-full k:flex hidden gapt flex-col mx-auto max-w-[1000px] relative">
            <div className="w-full flexgap h-[500px] relative">
                <div className="flexgap flex-col flex-auto h-full max-w-[550px]">
                    <div className="w-full bg-loading h-[40px] min-h-[40px]" />
                    <div className="flex-auto bg-loading" />
                </div>
                <div className="w-full max-w-[440px] h-full bg-loading" />
            </div>

            <div className="flexgap h-[120px] saturate-[85%]">
                <div className="flex-auto bg-loading" />
                <div className="flex-auto bg-loading" />
                <div className="flex-auto bg-loading" />
                <div className="flex-auto bg-loading" />
            </div>
        </div>
    )
}

function TabletLayout() {
    return (
        <div className="w-full k:hidden flex gapt flex-col mx-auto max-w-[1000px]">
            <div className="w-full flexgap h-fit relative">
                <div className="flexgap flex-col flex-auto h-full">
                    <div className="w-full bg-loading h-[40px] min-h-[40px]" />
                    <div className="w-full h-[200px] bg-loading" />
                </div>
            </div>
        </div>
    )
}


export default function Loading() {
    return (
        <div className="w-full flexgap flex-col mx-auto max-w-[1000px] relative">
            <PCLayout />
            <TabletLayout />
            <div className="hidden k:flex">
                <ScoreGridLoading />
            </div>
            <div className="w-full h-[400px] bg-loading-fade" />
        </div>
    )
}