import { ScoreNameList } from "@/interface";

const scoreList:ScoreNameList = {
    graphics: "Graphics",
    sound: "Sound Design",
    gameplay: "Gameplay",
    level: "Level Design",
    balance:"Balance",
    story:"Story/Narrative",
    performance:"Performance",
    original:"Originality",
    customization:"Customization",
    microtransactions:"Microtransactions",
    support:"Support",
}

export function convertToFancyScores(defaultArray:string[]):string[]{
    let resultArray:string[] = [];
    defaultArray.forEach((item) => {
        let loweredKey = item.toLowerCase() as keyof ScoreNameList;
        if(scoreList[loweredKey]){
            resultArray.push(scoreList[loweredKey]);
        }
    })
    return resultArray;
}

export function getDefaultScoreName(fancyAspectName:string){
    // @ts-ignore 
    const key = Object.keys(scoreList).find((key:keyof ScoreNameList) => {
        let objectValue = scoreList[key] || "None";
        return fancyAspectName === objectValue;
    });
    return key;
}

export default scoreList;