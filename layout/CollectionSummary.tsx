"use client"

import SummaryStatComment from "@/components/SummaryStat/SummaryStatComment"
import SummaryStatLong from "@/components/SummaryStat/SummaryStatLong"
import SummaryStatSmall from "@/components/SummaryStat/SummaryStatSmall"
import SummaryStatWide from "@/components/SummaryStat/SummaryStatWide"
import { CollectionSummary, GameReviewData } from "@/interface"


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CollectionSummary(props: {
    summary:CollectionSummary | null
}) {
    if (!props.summary) return (
        <section className="w-full h-[400px] flex items-center justify-center bg-dimm">
            <p className=" text-[25px] textcol-main font-medium">
                You have no games added to your collection.
            </p>
        </section>
    )
    
    let totalGames = props.summary.totalGames || 0;
    let completionRate = props.summary.completionRate || 0;
    let commentGame = props.summary.commentGame || "";
    let commentText = props.summary.commentText || "";
    let totalHours = props.summary.totalHours || 0;
    let averageHours = props.summary.averageHours || 0;
    let popularPlatform = props.summary.platform || "";
    let popularTags = props.summary.tags || ["", "", ""];
    let averageScore = props.summary.averageRating || 0;
    let lastCompletionDate = props.summary.lastCompletionDate || new Date();



    function MobileLayout() {
        return (
            <div className="flex gap-[10px] items-center overflow-x-scroll pb-[10px] visible summary-lg:hidden">
                <div className="summary-grid-mobile">
                    <SummaryStatSmall title={totalGames} about={"Total Games"} className="bg-mid" />
                    <SummaryStatWide title={completionRate+"%"} about={"Completion Rate"} />
                    <SummaryStatComment title={commentGame} comment={commentText} about={"Random Comment"} className="bg-mid saturate-[80%]" />
                    <SummaryStatWide title={totalHours} about={"Total Hours"} />
                    <SummaryStatSmall title={averageHours} about={"Average Hours"} className="bg-hi saturate-50" />
                </div>
                <div className="summary-grid-mobile">
                    <SummaryStatWide title={popularPlatform} about={"Popular Platform"} titleSize="text-[23px]" className="bg-mid saturate-[60%]" />
                    <SummaryStatLong firstLine={lastCompletionDate.getDate()} secondLine={monthNames[lastCompletionDate.getMonth()]} thirdLine={lastCompletionDate.getFullYear()} about={"Last Completion"} firstLineSize="text-[30px]" thirdLineSize="text-[30px]" className="bg-hi saturate-50" />
                    <SummaryStatLong firstLine={popularTags[0]} secondLine={popularTags[1]} thirdLine={popularTags[2]} about={"Popular Tags"} firstLineSize="text-[20px]" secondLineSize="text-[20px]" thirdLineSize="text-[20px]" />
                    <SummaryStatWide title={averageScore+" / 100"} about={"Average Score"} />
                </div>
            </div>
        )
    }

    
    function MainLayout() {
        return (
            <div className="hidden summary-lg:block">
                <section className="summary-grid">
                    <SummaryStatSmall title={totalGames} about={"Total Games"} className="bg-mid" />
                    <SummaryStatWide title={completionRate+"%"} about={"Completion Rate"} />
                    <SummaryStatComment title={commentGame} comment={commentText} about={"Your Random Comment"} className="bg-mid saturate-[75%]" />
                    <SummaryStatWide title={averageHours} about={"Average Hours"} />
                    <SummaryStatLong firstLine={popularTags[0]} secondLine={popularTags[1]} thirdLine={popularTags[2]} about={"Favourite Tags"} />
                    <SummaryStatSmall title={totalHours} about={"Total Hours"} className="bg-dimm saturate-[115%]" />
                    <SummaryStatLong firstLine={lastCompletionDate.getDate()} secondLine={monthNames[lastCompletionDate.getMonth()]} thirdLine={lastCompletionDate.getFullYear()} about={"Last Completion"} firstLineSize="text-[30px]" thirdLineSize="text-[30px]" className="bg-dimm saturate-[120%]" />
                    <SummaryStatWide title={popularPlatform} about={"Popular Platform"} titleSize="text-[24px]" className="bg-hi saturate-[65%]" />
                    <SummaryStatWide title={averageScore+" / 100"} about={"Average Rating"} />
                </section>
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