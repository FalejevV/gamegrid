"use client"

import SummaryStatComment from "@/components/SummaryStat/SummaryStatComment"
import SummaryStatLong from "@/components/SummaryStat/SummaryStatLong"
import SummaryStatSmall from "@/components/SummaryStat/SummaryStatSmall"
import SummaryStatWide from "@/components/SummaryStat/SummaryStatWide"
import { GameReviewData } from "@/interface"
import games from "@/store/features/games"
import { RootState, useAppSelector } from "@/store/store"




export default function CollectionSummary(props: {
    games: GameReviewData[]
}) {

    const windowSelector = useAppSelector((state: RootState) => state.window);
    if (props.games.length === 0) return (
        <section className="w-full h-[400px] flex items-center justify-center bg-dimm">
            <p className=" text-[25px] textcol-main font-medium">
                You have no games added to your collection.
            </p>
        </section>
    )


    function MobileLayout() {
        return (
            <div className="flex gap-[10px] items-center overflow-x-scroll pb-[10px]">
                <div className="summary-grid-mobile">
                    <SummaryStatSmall title={games.length} about={"Total Games"} className="bg-mid"/>
                    <SummaryStatWide title={"67%"} about={"Completion Rate"} />
                    <SummaryStatComment title={"Red Read Redemption 2"} comment={""} about={"Random Comment"} className="bg-mid saturate-[80%]"/>
                    <SummaryStatWide title={"1320"} about={"Total Hours"} />
                    <SummaryStatSmall title={"75"} about={"Average Hours"} className="bg-hi saturate-50"/>
                </div>
                <div className="summary-grid-mobile">
                    <SummaryStatWide title={"PlayStation 5"} about={"Popular Platform"} titleSize="text-[23px]"  className="bg-mid saturate-[60%]"/>
                    <SummaryStatLong firstLine={"20"} secondLine={"December"} thirdLine={"2023"} about={"Last Completion"} firstLineSize="text-[38px]" thirdLineSize="text-[38px]" className="bg-hi saturate-50"/>
                    <SummaryStatLong firstLine={"Action"} secondLine={"Adventure"} thirdLine={"RPG"} about={"Popular Tags"} />
                    <SummaryStatWide title={"78/100"} about={"Average Score"} />
                </div>
            </div>
        )
    }

    function MainLayout() {
        return (
            <section className="summary-grid">
                <SummaryStatSmall title={games.length} about={"Total Games"} className="bg-mid" />
                <SummaryStatWide title={"68%"} about={"Completion Rate"} />
                <SummaryStatComment title={"Red Dead Redemption 2"} comment={"lorem ipsum dolor sit amet"} about={"Your Random Comment"} className="bg-mid saturate-[75%]" />
                <SummaryStatWide title={"120"} about={"Average Hours"} />
                <SummaryStatLong firstLine={"Action"} secondLine={"Adventure"} thirdLine={"RPG"} about={"Favourite Tags"} />
                <SummaryStatSmall title={"1320"} about={"Total Hours"} className="bg-dimm saturate-[115%]" />
                <SummaryStatLong firstLine={"20"} secondLine={"December"} thirdLine={"2022"} about={"Last Completion"} firstLineSize="text-[37px]" thirdLineSize="text-[35px]" className="bg-dimm saturate-[120%]" />
                <SummaryStatWide title={"PlayStation 5"} about={"Popular Platform"} titleSize="text-[24px]" className="bg-hi saturate-[65%]" />
                <SummaryStatWide title={"78%"} about={"Average Rating"} />
            </section>
        )
    }

    if (windowSelector.width < 1070) {
        return <MobileLayout />
    } else {
        return <MainLayout />
    }
}