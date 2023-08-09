import { convertToFancyScores } from "../scoreName"


test("scoreName converts to fancy name", () => {
    expect(convertToFancyScores(["graphics", "sound", "gameplay", "level", "balance", "story", "performance", "original", "customization", "microtransactions", "support"]))
        .toEqual(["Graphics", "Sound Design", "Gameplay", "Level Design", "Balance", "Story/Narrative", "Performance", "Originality", "Customization", "Microtransactions" , "Support"])
})