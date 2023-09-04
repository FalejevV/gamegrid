import SummaryStatComment from "@/components/SummaryStat/SummaryStatComment"
import SummaryStatLong from "@/components/SummaryStat/SummaryStatLong"
import SummaryStatSmall from "@/components/SummaryStat/SummaryStatSmall"
import SummaryStatWide from "@/components/SummaryStat/SummaryStatWide"



function SummaryLoading() {
    function MobileLayout() {
        return (
            <div className="flex gap-[10px] items-center overflow-x-scroll pb-[10px] visible summary-lg:hidden w-full">
                <div className="summary-grid-mobile">
                    <SummaryStatSmall title={""} about={""} className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                    <SummaryStatComment title={""} comment={""} about={""} className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                    <SummaryStatSmall title={""} about={""} className="bg-loading" />
                </div>
                <div className="summary-grid-mobile">
                    <SummaryStatWide title={""} about={""} titleSize="text-[23px]" className="bg-loading" />
                    <SummaryStatLong firstLine={""} secondLine={""} thirdLine={""} about={""} firstLineSize="text-[30px]" thirdLineSize="text-[30px]" className="bg-loading" />
                    <SummaryStatLong firstLine={""} secondLine={""} thirdLine={""} about={""} firstLineSize="text-[20px]" secondLineSize="text-[20px]" thirdLineSize="text-[20px]" className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                </div>
            </div>
        )
    }


    function MainLayout() {
        return (
            <div className="hidden summary-lg:block w-full">
                <div className="summary-grid">
                    <SummaryStatSmall title={""} about={""} className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                    <SummaryStatComment title={""} comment={""} about={""} className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                    <SummaryStatLong firstLine={""} secondLine={""} thirdLine={""} about={""} className="bg-loading" />
                    <SummaryStatSmall title={""} about={""} className="bg-loading" />
                    <SummaryStatLong firstLine={""} secondLine={""} thirdLine={""} about={""} firstLineSize="text-[30px]" thirdLineSize="text-[30px]" className="bg-loading" />
                    <SummaryStatWide title={""} about={""} titleSize="text-[24px]" className="bg-loading" />
                    <SummaryStatWide title={""} about={""} className="bg-loading" />
                </div>
            </div>
        )
    }

    return (
        <>
            <MobileLayout />
            <MainLayout />
        </>
    )
}



export default function Loading() {
    return (
        <div className="flex flex-col w-full items-center animate-pulse">
            <div className="w-full max-w-[1000px] flex flex-col gap-[10px]">
                <div className="flex w-full inputheight gap-[10px]">
                    <div className="w-[70%] flex-auto inputheight bg-loading" />
                    <div className="w-[30%] flex-auto inputheight bg-loading" />
                </div>
                <SummaryLoading />
                <div className="flex flex-col flex-gap gap-[50px] pt-[85px]">
                    <div className="w-full sm:h-[200px] h-[346px] bg-loading" />
                    <div className="w-full sm:h-[200px] h-[346px] bg-loading" />
                    <div className="w-full sm:h-[200px] h-[346px] bg-loading" />
                </div>
            </div>
        </div>
    )
}