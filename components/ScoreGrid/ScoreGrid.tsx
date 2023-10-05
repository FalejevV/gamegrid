import { GameReviewData, IValueFilter } from "@/interface";
import DataBlock from "../DataBlock/DataBlock";

export default function ScoreGrid(props: {
    data: GameReviewData,
    onlyNumbers?: boolean
}) {


    
    let valueFilter: IValueFilter = {
        0: "saturate-[30%]",
        10: "saturate-[45%]",
        20: "saturate-[60%]",
        30: "saturate-[75%]",
        40: "saturate-[90%]",
        50: "",
        60: "brightness-[110%]",
        70: "brightness-[120%]",
        80: "brightness-[135%]",
        90: "brightness-[140%]",
        100: "brightness-[160%]"
    }



    function getFilter(score: number) {
        let scoreValue: keyof IValueFilter = 10;
        if (props.onlyNumbers) {
            scoreValue = Math.floor(score / 10) * 10 as keyof IValueFilter;
        } else {
            scoreValue = score as keyof IValueFilter;
        }
        return valueFilter[scoreValue];
    }
    let data = props.data;

    if (props.onlyNumbers) {
        return (
            <div className="grid k:grid-cols-3 k:grid-rows-[repeat(4,50px)] w-full gap-[5px] k:gap-[10px] 
            grid-cols-[repeat(2,minmax(270px,1fr))] grid-rows-[repeat(6,40px)] overflow-x-auto">
                <DataBlock title={"Graphics"} value={0} textValue={`${data?.graphics_score || 0}/100`} filter={getFilter(data?.sound_score || 50)} />
                <DataBlock title={"Sound Design"} value={0} textValue={`${data?.sound_score || 0}/100`} filter={getFilter(data?.sound_score || 50)} />
                <DataBlock title={"Gameplay"} value={0} textValue={`${data?.gameplay_score || 0}/100`} filter={getFilter(data?.gameplay_score || 50)} />
                <DataBlock title={"Level Design"} value={0} textValue={`${data?.level_score || 0}/100`} filter={getFilter(data?.level_score || 50)} />
                <DataBlock title={"Balance"} value={0} textValue={`${data?.balance_score || 0}/100`} filter={getFilter(data?.balance_score || 50)} />
                <DataBlock title={"Story/Narrative"} value={0} textValue={`${data?.story_score || 0}/100`} filter={getFilter(data?.story_score || 50)} />
                <DataBlock title={"Performance"} value={0} textValue={`${data?.performance_score || 0}/100`} filter={getFilter(data?.performance_score || 50)} />
                <DataBlock title={"Originality"} value={0} textValue={`${data?.original_score || 0}/100`} filter={getFilter(data?.original_score || 50)} />
                <DataBlock title={"Customization"} value={0} textValue={`${data?.customization_score || 0}/100`} filter={getFilter(data?.customization_score || 50)} />
                <DataBlock title={"Microtransactions"} value={0} textValue={`${data?.microtransactions_score || 0}/100`} filter={getFilter(data?.microtransactions_score || 50)} />
                <DataBlock title={"Support"} value={0} textValue={`${data?.support_score || 0}/100`} filter={getFilter(data?.support_score || 50)} />
                <DataBlock title={"Total Score"} value={0} textValue={`${data?.total_score || 0}/100`} color="bg-mid brightness-[115%]" />
            </div>
        )
    }

    return (
        <div className="grid k:grid-cols-3 k:grid-rows-[repeat(4,50px)] w-full gap-[5px] k:gap-[10px] 
            grid-cols-[repeat(2,minmax(270px,1fr))] grid-rows-[repeat(6,40px)] overflow-x-auto">
            <DataBlock title={"Graphics"} value={data?.graphics_score || 0} filter={getFilter(data?.graphics_score || 50)} />
            <DataBlock title={"Sound Design"} value={data?.sound_score || 0} filter={getFilter(data?.sound_score || 50)} />
            <DataBlock title={"Gameplay"} value={data?.gameplay_score || 0} filter={getFilter(data?.gameplay_score || 50)} />
            <DataBlock title={"Level Design"} value={data?.level_score || 0} filter={getFilter(data?.level_score || 50)} />
            <DataBlock title={"Balance"} value={data?.balance_score || 0} filter={getFilter(data?.balance_score || 50)} />
            <DataBlock title={"Story/Narrative"} value={data?.story_score || 0} filter={getFilter(data?.story_score || 50)} />
            <DataBlock title={"Performance"} value={data?.performance_score || 0} filter={getFilter(data?.performance_score || 50)} />
            <DataBlock title={"Originality"} value={data?.original_score || 0} filter={getFilter(data?.original_score || 50)} />
            <DataBlock title={"Customization"} value={data?.customization_score || 0} filter={getFilter(data?.customization_score || 50)} />
            <DataBlock title={"Microtransactions"} value={data?.microtransactions_score || 0} filter={getFilter(data?.microtransactions_score || 50)} />
            <DataBlock title={"Support"} value={data?.support_score || 0} filter={getFilter(data?.support_score || 50)} />
            <DataBlock title={"Total Score"} textValue={`${data?.total_score || 0}/100`} value={0} color="bg-mid brightness-[115%]" />
        </div>
    )
}

